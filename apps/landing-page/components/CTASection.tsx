"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your backend API
    console.log('Form submitted:', { name, email, area, crop });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setName('');
      setArea('');
      setCrop('');
    }, 3000);
  };

  return (
    <section id="cadastro" className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Seja um dos primeiros a usar o AgroShield
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Cadastre-se na nossa lista de espera e garanta acesso prioritário quando lançarmos oficialmente
          </p>
          
          {!isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="number"
                    placeholder="Área (hectares)"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  >
                    <option value="" className="text-gray-900">Selecione a cultura</option>
                    <option value="soja" className="text-gray-900">Soja</option>
                    <option value="arroz" className="text-gray-900">Arroz</option>
                    <option value="ambos" className="text-gray-900">Soja e Arroz</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Garantir Meu Lugar na Lista
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Cadastro realizado com sucesso!</h3>
              <p className="text-lg opacity-90">
                Obrigado por se juntar à nossa lista de espera. Em breve entraremos em contato com mais informações.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 