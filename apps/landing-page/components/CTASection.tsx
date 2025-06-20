'use client';

import { ArrowRight } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { toast } from 'sonner';
import { createLead } from '../lib/actions';

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
      className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4"
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Seja um dos primeiros a usar o AgroShield
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Cadastre-se na nossa lista de espera e garanta acesso prioritário
            quando lançarmos oficialmente
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
            <form ref={formRef} action={handleSubmit}>
              <input
                type="text"
                name="website"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                  disabled={isPending}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                  disabled={isPending}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="number"
                  name="area"
                  placeholder="Área (hectares)"
                  min="1"
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                  disabled={isPending}
                />
                <select
                  name="crop"
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                  disabled={isPending}
                >
                  <option value="" className="text-gray-900">
                    Selecione a cultura
                  </option>
                  <option value="soja" className="text-gray-900">
                    Soja
                  </option>
                  <option value="arroz" className="text-gray-900">
                    Arroz
                  </option>
                  <option value="ambos" className="text-gray-900">
                    Soja e Arroz
                  </option>
                </select>
                <input
                  type="text"
                  name="location"
                  placeholder="Sua cidade, Estado"
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                  disabled={isPending}
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mr-2" />
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
        </div>
      </div>
    </section>
  );
}
