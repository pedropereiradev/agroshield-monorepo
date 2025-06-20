import React from 'react';
import { Zap, Shield, Globe, TrendingUp } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: "Indenização Automática",
      description: "Processos automatizados com base em dados climáticos — sem necessidade de vistoria ou análise manual.",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Segurança Blockchain",
      description: "Contratos inteligentes garantem total transparência e proteção contra fraudes.",
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-500" />,
      title: "Interface Simples",
      description: "Tecnologia Web3 com usabilidade pensada para quem está acostumado a apps convencionais.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
      title: "Sem Burocracia",
      description: "Esqueça os intermediários e processos lentos das seguradoras tradicionais. Aqui, tudo é direto e digital.",
    }
  ];

  return (
    <section id="beneficios" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Por que escolher o AgroShield?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <strong>Experiência de Web3 com usabilidade da Web2:</strong> toda a segurança do blockchain com a simplicidade que você já conhece
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 