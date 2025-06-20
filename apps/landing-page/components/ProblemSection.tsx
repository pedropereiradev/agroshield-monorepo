import { AlertTriangle, Clock, DollarSign, FileText } from 'lucide-react';

export default function ProblemSection() {
  const statistics = [
    {
      number: '84%',
      description: 'da área agrícola nacional não está segurada',
      source: 'CNA',
    },
    {
      number: 'R$ 8 bi',
      description: 'em perdas por eventos climáticos em 2021/2022',
      source: 'SUSEP',
    },
    {
      number: '~6 meses',
      description: 'tempo médio para receber indenização tradicional',
      source: 'Pesquisa setorial',
    },
  ];

  const painPoints = [
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      title: 'Burocracia Excessiva',
      description:
        'Documentação complexa e processos que demoram meses para serem aprovados',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      title: 'Custos Elevados',
      description:
        'Prêmios altos e taxas administrativas excessivas que tornam o seguro inacessível',
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      title: 'Processos Lentos',
      description:
        'Vistorias demoradas e análises manuais que atrasam pagamentos cruciais',
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: 'Falta de Transparência',
      description:
        'Critérios de avaliação pouco claros e comunicação deficiente',
    },
  ];

  const comparison = [
    {
      aspect: 'Tempo de contratação',
      traditional: '30-60 dias',
      agroshield: '5 minutos',
    },
    {
      aspect: 'Documentação necessária',
      traditional: '15+ documentos',
      agroshield: 'Dados básicos online',
    },
    {
      aspect: 'Processo de indenização',
      traditional: 'Vistoria presencial',
      agroshield: 'Automático por dados climáticos',
    },
    {
      aspect: 'Tempo para pagamento',
      traditional: '3-6 meses',
      agroshield: '24-48 horas',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Por que tantos produtores ainda estão sem seguro agrícola?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O seguro agrícola tradicional no Brasil enfrenta desafios
              estruturais que impedem sua adoção em massa. Veja os números que
              comprovam essa realidade:
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center border-l-4 border-red-500"
              >
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-700 font-medium mb-2">
                  {stat.description}
                </p>
                <p className="text-sm text-gray-500">{stat.source}</p>
              </div>
            ))}
          </div>

          {/* Pain Points */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">
              Os principais problemas do seguro tradicional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="mb-4">{point.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {point.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{point.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-green-500 p-6">
              <h3 className="text-2xl font-bold text-white text-center">
                Seguro Tradicional vs. AgroShield
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Aspecto
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-red-600">
                      Seguro Tradicional
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                      AgroShield
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparison.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.aspect}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-red-600 bg-red-50">
                        {item.traditional}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-green-600 bg-green-50 font-semibold">
                        {item.agroshield}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Testimonial Preview */}
          {/* <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl border border-blue-200">
            <div className="flex items-start space-x-4">
              <TrendingDown className="w-8 h-8 text-blue-600 mt-1" />
              <div>
                <blockquote className="text-lg italic text-gray-800 mb-3">
                  "Já tentei contratar seguro três vezes. Sempre desisti no meio do processo. 
                  É muita burocracia, muito papel, e no final das contas, quando você precisa, 
                  demora uma eternidade para receber."
                </blockquote>
                <cite className="text-sm font-semibold text-gray-600">
                  — Carlos Silva, Produtor de Soja em Mato Grosso (450 hectares)
                </cite>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
