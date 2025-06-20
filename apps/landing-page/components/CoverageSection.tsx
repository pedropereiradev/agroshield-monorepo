import React from 'react';
import { Leaf, CheckCircle } from 'lucide-react';

export default function CoverageSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cobertura sob medida para sua lavoura
          </h2>
          <p className="text-xl text-gray-600">
            Proteção simplificada contra os riscos climáticos que mais afetam a produção de soja e arroz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Soja */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-6">
              <Leaf className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Soja</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <strong>Estiagem:</strong> Cobertura para longos períodos sem chuva que comprometem o ciclo da cultura
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <strong>Excesso de chuva:</strong> Proteção em fases críticas como floração e enchimento de grãos
                </div>
              </div>
            </div>
          </div>

          {/* Arroz */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-6">
              <Leaf className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Arroz</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <strong>Excesso de chuva:</strong> Cobertura nos períodos sensíveis da colheita, evitando perdas por alagamento
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <strong>Calor extremo:</strong> Proteção contra temperaturas elevadas durante a floração
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
