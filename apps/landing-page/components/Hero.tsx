'use client';
import { ArrowDown, Shield, Zap } from 'lucide-react';
import { useStats } from '../lib/hooks/useStats';

export default function Hero() {
  const { displayCount, loading, error } = useStats();
  return (
    <section className="relative px-4 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 min-h-[93vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-green-300/20 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-md animate-pulse delay-500" />

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-6 border border-white/30">
            <Zap className="w-4 h-4 mr-2" />
            Primeira plataforma descentralizada do Brasil
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            O Futuro do Seguro Rural
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300">
              Chegou ao Brasil
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-4 max-w-4xl mx-auto font-medium">
            Chega de esperar meses por indenização!
          </p>

          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-3xl mx-auto">
            Mais Rápido • Mais Barato • Mais Transparente
            <br />A tecnologia protegendo sua soja e arroz sem burocracia
          </p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {loading ? (
                  <div className="animate-pulse bg-white/20 rounded h-8 w-16 mx-auto" />
                ) : (
                  displayCount
                )}
              </div>
              <div className="text-xs sm:text-sm text-white/70">
                Produtores interessados
              </div>
              {error && !loading && (
                <div className="text-xs text-white/50 mt-1">
                  Dados aproximados
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                Principais
              </div>
              <div className="text-xs sm:text-sm text-white/70">
                Culturas cobertas
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                100%
              </div>
              <div className="text-xs sm:text-sm text-white/70">
                Digital e transparente
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              className="group bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[280px] sm:min-w-[240px]"
            >
              <Shield className="w-5 h-5" />
              Quero Garantir Minha Vaga
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>

            {/*<button
              type="button"
              className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/30 transition-all border border-white/30 flex items-center gap-2 min-w-[280px] sm:min-w-[200px]"
            >
              <Play className="w-5 h-5" />
              Ver Como Funciona
            </button>*/}
          </div>

          <div className="mt-16">
            <p className="text-white/60 text-sm mb-4">
              Descubra os problemas que resolvemos
            </p>
            <ArrowDown className="w-6 h-6 text-white/60 mx-auto animate-bounce" />
          </div>
        </div>
      </div>

      {/* Indicadores de características principais */}
      <div className="absolute bottom-8 left-8 right-8 hidden lg:flex justify-between text-white/70 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span>Soja & Arroz</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full" />
          <span>Blockchain Seguro</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full" />
          <span>Pagamentos Rápidos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
          <span>100% Digital</span>
        </div>
      </div>
    </section>
  );
}
