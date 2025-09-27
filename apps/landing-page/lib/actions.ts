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
  phone?: string;
  location?: string;
  profile: string;
  area?: string;
  crops?: string[];
}) {
  const { name, email, phone, location, profile, area, crops } = data;

  if (!name || !email || !profile) {
    throw new Error('Nome, email e perfil são obrigatórios');
  }

  if (name.length > 100) throw new Error('Nome muito longo');
  if (email.length > 255) throw new Error('Email muito longo');
  if (location && location.length > 100)
    throw new Error('Localização muito longa');
  if (phone && phone.length > 20) throw new Error('Telefone muito longo');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email inválido');
  }

  if (phone?.trim()) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,20}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      throw new Error('Telefone inválido');
    }
  }

  const validProfiles = [
    'produtor-pequeno',
    'produtor-medio',
    'produtor-grande',
    'cooperativa',
    'consultor',
    'outro',
  ];
  if (!validProfiles.includes(profile)) {
    throw new Error('Perfil inválido');
  }

  if (area?.trim()) {
    const areaNumber = Number.parseFloat(area);
    if (Number.isNaN(areaNumber) || areaNumber <= 0 || areaNumber > 1_000_000) {
      throw new Error('Área deve ser um número entre 1 e 1.000.000 hectares');
    }
  }

  if (crops && crops.length > 0) {
    const validCrops = ['soja', 'arroz', 'outros'];
    const invalidCrops = crops.filter((crop) => !validCrops.includes(crop));
    if (invalidCrops.length > 0) {
      throw new Error('Cultura inválida detectada');
    }
  }

  const suspiciousPatterns = [
    /(.)\1{4,}/i,
    /^test|demo|fake|spam/i,
    /<script|javascript:|data:/i,
    /[^\w\s@.\-\(\)\+]/g,
  ];

  const textFields = [name, email, location, phone].filter(Boolean);
  for (const field of textFields) {
    if (field) {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(field)) {
          throw new Error('Dados inválidos detectados');
        }
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

    const honeypot = formData.get('website') as string;
    if (honeypot) {
      throw new Error('Submissão inválida detectada.');
    }

    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const phone = (formData.get('phone') as string)?.trim() || undefined;
    const location = (formData.get('location') as string)?.trim() || undefined;
    const profile = formData.get('profile') as string;
    const area = (formData.get('area') as string)?.trim() || undefined;

    const cropsData = formData.getAll('crops') as string[];
    const crops = cropsData.length > 0 ? cropsData : undefined;

    validateInput({ name, email, phone, location, profile, area, crops });

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
      WHERE (name = ${name} ${location ? sql`OR location = ${location}` : sql``})
      AND created_at > NOW() - INTERVAL '1 hour'
    `;

    if (suspiciousCheck[0]?.count > 2) {
      throw new Error(
        'Muitas submissões similares detectadas. Tente mais tarde.'
      );
    }

    const areaNumber = area ? Number.parseFloat(area) : null;

    const cropsValue =
      crops && crops.length > 0
        ? `{${crops.map((c) => `"${c}"`).join(',')}}`
        : null;

    await sql`
      INSERT INTO leads (name, email, phone, location, profile, area, crops, created_at)
      VALUES (${name}, ${email}, ${phone}, ${location}, ${profile}, ${areaNumber}, ${cropsValue}::text[], NOW())
    `;

    console.log('Lead created successfully:', {
      name,
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'),
      phone: phone ? phone.replace(/(.{2}).*(.{2})/, '$1***$2') : null,
      location,
      profile,
      area: areaNumber,
      crops,
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
