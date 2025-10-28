'use client';
import { ArrowRight, CheckCircle, MapPin, Shield, User } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { toast } from 'sonner';
import { createLead } from '../lib/actions';
import { EmailIcon, WhatsAppIcon } from './icons';

export default function CTASection() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await createLead(formData);
        toast.success(
          'Cadastro realizado com sucesso! Em breve entraremos em contato.'
        );

        if (formRef.current) {
          formRef.current.reset();
        }
      } catch (err) {
        toast.error('Erro ao enviar o formulário. Por favor, tente novamente.');
        console.error('Form submission error:', err);
      }
    });
  }

  return (
    <section
      id="cadastro"
      className="relative py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-green-300/20 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-md animate-pulse delay-500" />
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-4 border border-white/30">
              <Shield className="w-4 h-4 mr-2" />
              Primeiros 100 cadastrados ganham condições especiais
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proteja Sua Lavoura com Tecnologia de Ponta
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Seja um dos primeiros produtores a ter acesso ao futuro do seguro
              rural.
              <br className="hidden sm:block" />
              Cadastre-se agora e garante sua prioridade no lançamento.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">
                O que você ganha se cadastrando agora:
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      Acesso Prioritário
                    </h4>
                    <p className="text-white/80">
                      Seja dos primeiros a contratar quando lançarmos
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      Atualizações em Primeira Mão
                    </h4>
                    <p className="text-white/80">
                      Receba novidades direto no seu WhatsApp
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      Suporte Personalizado
                    </h4>
                    <p className="text-white/80">
                      Ajuda direta para configurar sua proteção
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">
                  Cadastre-se Gratuitamente
                </h3>
                <p className="text-white/80 text-sm">
                  Preencha os dados abaixo e garanta sua vaga. Leva menos de 1
                  minuto.
                </p>
              </div>

              <form ref={formRef} action={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Seu nome completo"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-colors"
                      required
                      disabled={isPending}
                      maxLength={100}
                    />
                  </div>
                  <div className="relative">
                    <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Seu melhor e-mail"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-colors"
                      required
                      disabled={isPending}
                      maxLength={255}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <WhatsAppIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="WhatsApp (opcional)"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-colors"
                      disabled={isPending}
                      maxLength={20}
                      pattern="[\d\s\-\(\)\+]{10,20}"
                      title="Telefone deve conter 10-20 dígitos, espaços, hífens, parênteses ou +"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      name="location"
                      placeholder="Cidade/Estado"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-colors"
                      disabled={isPending}
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    name="profile"
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-colors"
                    required
                    disabled={isPending}
                  >
                    <option value="" className="text-gray-900">
                      Qual seu perfil?
                    </option>
                    <option value="produtor-pequeno" className="text-gray-900">
                      Pequeno Produtor (até 100 ha)
                    </option>
                    <option value="produtor-medio" className="text-gray-900">
                      Médio Produtor (100-500 ha)
                    </option>
                    <option value="produtor-grande" className="text-gray-900">
                      Grande Produtor (500+ ha)
                    </option>
                    <option value="cooperativa" className="text-gray-900">
                      Cooperativa
                    </option>
                    <option value="consultor" className="text-gray-900">
                      Consultor/Técnico Agrícola
                    </option>
                    <option value="outro" className="text-gray-900">
                      Outro
                    </option>
                  </select>
                  <input
                    type="number"
                    name="area"
                    placeholder="Área plantada (ha) - opcional"
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-colors"
                    disabled={isPending}
                    min="1"
                    max="1000000"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">
                    Quais culturas você produz? (opcional)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="crops"
                        value="soja"
                        className="mr-2 rounded"
                      />
                      <span className="text-sm">Soja</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="crops"
                        value="arroz"
                        className="mr-2 rounded"
                      />
                      <span className="text-sm">Arroz</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="crops"
                        value="outros"
                        className="mr-2 rounded"
                      />
                      <span className="text-sm">Outros</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mr-2" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Garantir Minha Prioridade
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </span>
                  )}
                </button>

                <p className="text-xs text-white/60 text-center mt-4">
                  Seus dados estão seguros. Não compartilhamos com terceiros.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
