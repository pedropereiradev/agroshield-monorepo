"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { leadService, LeadData } from '../lib/leadService';
import { toast } from "sonner";

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const leadData: LeadData = {
        name,
        email,
        area,
        crop,
        city
      };

      await leadService.createLead(leadData);
      setIsSubmitted(true);
      toast.success("Cadastro realizado. Agradecemos pelo seu interesse!");

      setEmail('');
      setName('');
      setArea('');
      setCrop('');
      setCity('');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setError('Erro ao enviar formulário. Tente novamente.');
      toast.error("Erro ao enviar o formulário. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
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
                    disabled={isLoading}
                  />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="number"
                    placeholder="Área (hectares)"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                    disabled={isLoading}
                  />
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                    disabled={isLoading}
                  >
                    <option value="" className="text-gray-900">Selecione a cultura</option>
                    <option value="soja" className="text-gray-900">Soja</option>
                    <option value="arroz" className="text-gray-900">Arroz</option>
                    <option value="ambos" className="text-gray-900">Soja e Arroz</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Sua cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-300 rounded-lg text-red-200">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mr-2"></div>
                      Enviando...
                    </span>
                  ) : (
                    <>
                      Garantir Meu Lugar na Lista
                      <ArrowRight className="w-5 h-5 ml-2 inline" />
                    </>
                  )}
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
