'use client';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      category: 'Básico',
      questions: [
        {
          question: 'O que é o AgroShield e como funciona?',
          answer:
            'O AgroShield é o primeiro seguro agrícola descentralizado do Brasil. Utilizamos contratos inteligentes na blockchain para automatizar todo o processo, desde a contratação até o pagamento das indenizações. Monitoramos condições climáticas em tempo real e, quando detectados eventos cobertos pela apólice, o pagamento é processado automaticamente.',
        },
        {
          question: 'Quais culturas são cobertas?',
          answer:
            'Atualmente cobrimos soja e arroz, as duas principais culturas do agronegócio brasileiro. Cada cultura tem cobertura específica para os riscos mais relevantes: estiagem, excesso de chuva e ondas de calor.',
        },
        {
          question: 'Como é calculado o preço da apólice?',
          answer:
            'O preço é calculado com base no risco específico da sua região usando dados climáticos históricos, tipo de cultura, área plantada e período de plantio. Nosso sistema analisa mais de 30 anos de dados meteorológicos para determinar o risco real da sua propriedade, resultando em preços até mais baixos que seguros tradicionais.',
        },
        {
          question: 'Preciso entender blockchain para usar o AgroShield?',
          answer:
            'Não! Nossa interface foi desenvolvida pensando na facilidade de uso. Você interage com o sistema como qualquer aplicativo normal. Toda a complexidade da blockchain fica transparente para você, garantindo apenas os benefícios: segurança, transparência e pagamentos automáticos.',
        },
      ],
    },
    {
      category: 'Cobertura',
      questions: [
        {
          question: 'Quais eventos climáticos são cobertos?',
          answer:
            'Para SOJA: estiagem prolongada, excesso de chuva e ondas de calor. Para ARROZ: excesso de chuva na colheita, calor extremo e estiagem crítica. Todos os gatilhos são objetivos e baseados em dados meteorológicos.',
        },
        {
          question: 'Como funciona o monitoramento climático?',
          answer:
            'Utilizamos uma rede de estações meteorológicas automáticas, dados de satélites e APIs de múltiplas fontes meteorológicas para monitorar sua propriedade 24/7. Os dados são verificados por pelo menos fontes independentes antes de acionar qualquer pagamento.',
        },
        {
          question: 'O que NÃO é coberto pela apólice?',
          answer:
            'Não cobrimos: pragas e doenças, problemas de solo, falhas de manejo, eventos anteriores à contratação, guerras ou atos terroristas. Nossa cobertura é específica para riscos climáticos paramétricos bem definidos.',
        },
        {
          question: 'Posso contratar para propriedades em qualquer região?',
          answer:
            'Atualmente atendemos as principais regiões produtoras de soja e arroz no Brasil: MT, MS, GO, RS, SC, PR, BA, TO, MA, PI. Verificamos a disponibilidade de dados meteorológicos confiáveis para cada localização antes da contratação.',
        },
      ],
    },
    {
      category: 'Processo',
      questions: [
        {
          question: 'Quanto tempo demora para contratar?',
          answer:
            'Todo o processo leva aproximadamente 5 minutos. A apólice é ativada imediatamente após a confirmação do pagamento.',
        },
        // {
        //   question: 'Como recebo o pagamento da indenização?',
        //   answer:
        //     'Quando detectado um evento coberto, você recebe uma notificação por SMS/email. O pagamento é processado automaticamente via PIX em 24-48 horas. Todo o processo é transparente e auditável na blockchain.',
        // },
        // {
        //   question: 'Posso cancelar minha apólice?',
        //   answer:
        //     'Sim, você pode cancelar até 7 dias após a contratação sem custos. Após esse período, o cancelamento segue as regras da SUSEP com devolução proporcional do prêmio.',
        // },
        // {
        //   question: 'E se eu discordar de uma decisão?',
        //   answer:
        //     'Nosso sistema é baseado em dados objetivos, mas você pode contestar através do nosso suporte. Temos um painel de especialistas independentes para casos de disputa. Todos os dados climáticos usados são auditáveis na blockchain.',
        // },
      ],
    },
    {
      category: 'Técnico',
      questions: [
        {
          question: 'Por que usar blockchain? Quais as vantagens?',
          answer:
            'A blockchain garante: 1) Contratos imutáveis que não podem ser alterados unilateralmente, 2) Transparência total - você pode auditar todos os dados, 3) Pagamentos automáticos sem interferência humana, 4) Redução de custos ao eliminar intermediários, 5) Histórico permanente de todas as transações.',
        },
        // {
        //   question: 'O AgroShield é regulamentado?',
        //   answer:
        //     'Sim, seguimos todas as regulamentações da SUSEP (Superintendência de Seguros Privados). Estamos registrados como segurador paramétrico e nossos contratos atendem à legislação brasileira de seguros.',
        // },
        // {
        //   question: 'Como garantem a precisão dos dados climáticos?',
        //   answer:
        //     'Utilizamos múltiplas fontes: INMET, OpenWeather, dados satelitais da NASA e estações privadas. Cada evento é validado por pelo menos 3 fontes independentes. Temos parceria com o CPTEC/INPE para dados oficiais do governo.',
        // },
        // {
        //   question: 'E se houver problemas técnicos na blockchain?',
        //   answer:
        //     'Utilizamos a blockchain Fuel, uma das mais robustas e rápidas disponíveis. Em caso de indisponibilidade técnica, temos sistemas de backup que garantem que nenhum pagamento seja perdido. Todos os contratos têm mecanismos de fallback automático.',
        // },
      ],
    },
  ];

  return (
    <section className="py-20 px-4 bg-white" id="faq">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Perguntas Frequentes
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Esclarecemos as principais dúvidas sobre o AgroShield. Não encontrou
            sua pergunta? Entre em contato conosco.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-200">
                {category.category}
              </h3>

              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <div
                      key={questionIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-300 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200 max-w-2xl mx-auto">
            <HelpCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe está pronta para esclarecer qualquer questão sobre o
              AgroShield. Fale conosco sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#cadastro"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Falar com Especialista
              </a>
              <a
                href="mailto:contato@agroshield.co"
                className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Enviar E-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
