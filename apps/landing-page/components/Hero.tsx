import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            O Primeiro Seguro Rural
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              {' '}
              Descentralizado
            </span>
            <br />
            do Brasil
          </h1>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              "Experiência de Web3 com usabilidade da Web2"
            </p>
            <p className="text-gray-600">
              Toda a segurança e transparência do blockchain, com a simplicidade
              de um app tradicional
            </p>
          </div>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Sua produção protegida contra os impactos do clima: estiagem, chuvas
            intensas e ondas de calor. Com AgroShield, você conta com uma
            solução justa, moderna e transparente.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#cadastro"
              className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Cadastre-se na Lista de Espera
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </a>
            <a
              href="#como-funciona"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Saiba Como Funciona
            </a>
          </div>

          {/* Indicadores atualizados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                Digital
              </div>
              <div className="text-gray-600">
                Contratação 100% online e sem burocracia
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                Flexível
              </div>
              <div className="text-gray-600">
                Seguro adaptado ao seu cultivo e região
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">
                Monitoramento climático em tempo real
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
