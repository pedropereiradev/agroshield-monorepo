import React from 'react';

export default function ProblemSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Por que 80% dos produtores brasileiros ainda não têm seguro rural?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A maioria das soluções existentes são complexas ou não atendem às necessidades reais dos produtores
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-3">Seguros Tradicionais</h3>
              <ul className="text-red-700 space-y-2">
                <li>• Pagamentos em 6-9 meses</li>
                <li>• Vistorias burocráticas</li>
                <li>• Prêmios caros e opacos</li>
                <li>• Cobertura limitada</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Soluções Web3 Complexas</h3>
              <ul className="text-yellow-700 space-y-2">
                <li>• Interface confusa</li>
                <li>• Necessita conhecimento técnico</li>
                <li>• Carteiras complicadas</li>
                <li>• Experiência frustrante</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3">AgroShield</h3>
              <ul className="text-green-700 space-y-2">
                <li>• Pagamentos em até 72h</li>
                <li>• Interface simples e intuitiva</li>
                <li>• Blockchain transparente</li>
                <li>• Fácil como usar WhatsApp</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl text-white">
            <h3 className="text-xl font-bold mb-2">O Melhor dos Dois Mundos</h3>
            <p className="text-lg">
              <strong>Web3:</strong> Segurança, transparência e contratos inteligentes automáticos<br />
              <strong>Web2:</strong> Interface familiar, suporte ao cliente e experiência sem fricção
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 