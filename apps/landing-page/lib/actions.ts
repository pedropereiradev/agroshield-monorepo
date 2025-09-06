'use server';

import { neon } from '@neondatabase/serverless';
import { headers } from 'next/headers';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  },
  60 * 60 * 1000
);

function rateLimit(
  identifier: string,
  maxRequests = 3,
  windowMs = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

function validateInput(data: {
  name: string;
  email: string;
  area: number;
  crop: string;
  location: string;
}) {
  const { name, email, area, crop, location } = data;

  if (!name || !email || !area || !crop || !location) {
    throw new Error('Todos os campos são obrigatórios');
  }

  if (name.length > 100) throw new Error('Nome muito longo');
  if (email.length > 255) throw new Error('Email muito longo');
  if (location.length > 100) throw new Error('Localização muito longa');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email inválido');
  }

  if (area <= 0 || area > 1000000) {
    throw new Error('Área deve ser entre 1 e 1.000.000 hectares');
  }

  const validCrops = ['soja', 'arroz', 'ambos'];
  if (!validCrops.includes(crop)) {
    throw new Error('Cultura inválida');
  }

  const suspiciousPatterns = [
    /(.)\1{4,}/i, // Repeated characters (aaaaa)
    /^test|demo|fake|spam/i, // Common spam words
    /<script|javascript:|data:/i, // XSS attempts
    /[^\w\s@.-]/g, // Unusual characters (allow only word chars, spaces, @, ., -)
  ];

  const textFields = [name, email, location];
  for (const field of textFields) {
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(field)) {
        throw new Error('Dados inválidos detectados');
      }
    }
  }

  return true;
}

export async function createLead(formData: FormData) {
  try {
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    if (!rateLimit(ip)) {
      throw new Error('Muitas tentativas. Tente novamente em 15 minutos.');
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    // Honeypot field to prevent spam
    const honeypot = formData.get('website') as string;
    if (honeypot) {
      throw new Error('Submissão inválida detectada.');
    }

    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const area = Number.parseInt(formData.get('area') as string);
    const crop = formData.get('crop') as string;
    const location = (formData.get('location') as string)?.trim();

    validateInput({ name, email, area, crop, location });

    const existingLead = await sql`
      SELECT id FROM leads
      WHERE email = ${email}
      AND created_at > NOW() - INTERVAL '24 hours'
    `;

    if (existingLead.length > 0) {
      throw new Error('Este email já foi cadastrado recentemente.');
    }

    const suspiciousCheck = await sql`
      SELECT COUNT(*) as count FROM leads
      WHERE (name = ${name} OR location = ${location})
      AND created_at > NOW() - INTERVAL '1 hour'
    `;

    if (suspiciousCheck[0]?.count > 2) {
      throw new Error(
        'Muitas submissões similares detectadas. Tente mais tarde.'
      );
    }

    await sql`
      INSERT INTO leads (name, email, area, crop, location)
      VALUES (${name}, ${email}, ${area}, ${crop}, ${location})
    `;

    console.log('Lead created successfully:', {
      name,
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'),
      area,
      crop,
      location,
    });

    return { success: true };
  } catch (error) {
    console.error('Erro ao criar lead:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Falha ao salvar os dados. Tente novamente em alguns minutos.';
    throw new Error(message);
  }
}
