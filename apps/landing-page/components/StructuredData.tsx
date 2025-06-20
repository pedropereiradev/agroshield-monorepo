export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AgroShield',
    url: 'https://agroshield.co',
    logo: 'https://agroshield.co/logo.png',
    description: 'O primeiro seguro rural descentralizado do Brasil',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contato@agroshield.co',
      availableLanguage: 'Portuguese',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pelotas',
      addressRegion: 'RS',
      addressCountry: 'BR',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Seguro Agrícola Descentralizado',
    provider: {
      '@type': 'Organization',
      name: 'AgroShield',
    },
    description:
      'Seguro agrícola baseado em blockchain para proteção de culturas de soja e arroz',
    serviceType: 'Agricultural Insurance',
    areaServed: {
      '@type': 'Country',
      name: 'Brazil',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Coberturas de Seguro',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seguro para Soja',
            description:
              'Cobertura para estiagem, excesso de chuva e ondas de calor',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seguro para Arroz',
            description:
              'Cobertura para excesso de chuva, calor extremo e estiagem crítica',
          },
        },
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AgroShield',
    url: 'https://agroshield.co',
    description: 'O primeiro seguro rural descentralizado do Brasil',
    publisher: {
      '@type': 'Organization',
      name: 'AgroShield',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://agroshield.co/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que é o AgroShield e como funciona?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O AgroShield é o primeiro seguro agrícola descentralizado do Brasil. Utilizamos contratos inteligentes na blockchain para automatizar todo o processo, desde a contratação até o pagamento das indenizações.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quais culturas são cobertas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Atualmente cobrimos soja e arroz, as duas principais culturas do agronegócio brasileiro. Cada cultura tem cobertura específica para os riscos mais relevantes: estiagem, excesso de chuva e ondas de calor.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo demora para contratar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Todo o processo leva aproximadamente 5 minutos. A apólice é ativada imediatamente após a confirmação do pagamento.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
