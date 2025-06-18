import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Silva",
      location: "Sorriso, MT",
      text: "Finalmente um seguro que funciona! Recebi minha indenização em 2 dias após a seca.",
      crop: "Soja - 450ha"
    },
    {
      name: "Maria Santos", 
      location: "Pelotas, RS",
      text: "Transparente e confiável. Posso ver tudo na blockchain, sem pegadinhas.",
      crop: "Arroz - 120ha"
    },
    {
      name: "João Oliveira",
      location: "Barreiras, BA", 
      text: "O preço é muito melhor que os seguros tradicionais. Recomendo!",
      crop: "Soja - 280ha"
    }
  ];

  return (
    <section id="depoimentos" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            O que os produtores estão dizendo
          </h2>
          <p className="text-xl text-gray-600">
            Depoimentos reais de quem já usa o AgroShield
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
                <div className="text-sm text-green-600 font-medium">{testimonial.crop}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 