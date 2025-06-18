import React from 'react';
import { Leaf, CheckCircle } from 'lucide-react';

export default function CoverageSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cobertura Especializada
          </h2>
          <p className="text-xl text-gray-600">
            Proteção completa para soja e arroz contra os principais riscos climáticos
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
                  <strong>Seca:</strong> ≥18 dias com menos de 5mm de chuva
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <strong>Chuva excessiva:</strong> ≥130mm em 5 dias durante floração
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <strong>Calor extremo:</strong> ≥42°C por 3 dias durante floração
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
                  <strong>Chuva excessiva:</strong> ≥120mm em 72h na colheita
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <strong>Calor extremo:</strong> ≥37°C por 2 dias na floração
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <strong>Frio extremo:</strong> ≤15°C por 4 dias na germinação
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 