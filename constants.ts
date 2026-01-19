import { Product } from './types';

// Helper to generate placeholder images
const getImg = (id: number, width: number, height: number) => 
  `https://picsum.photos/id/${id}/${width}/${height}`;

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Melão de São Caetano Premium',
    category: 'Imunidade', // Mantendo tipo compatível
    tagline: 'O Poder Amargo que Cura: Controle da Glicose e Desinflamação.',
    price: 149.90,
    description: 'A joia da medicina natural agora em alta concentração. O Melão de São Caetano (Bitter Melon) é reconhecido mundialmente por auxiliar no equilíbrio dos níveis de açúcar no sangue, fortalecer a imunidade e atuar como um poderoso anti-inflamatório natural. Nossa fórmula exclusiva garante absorção máxima dos compostos bioativos.',
    benefits: ['Regula a Glicose Naturalmente', 'Poderoso Anti-inflamatório', 'Fortalece o Sistema Imune', 'Ação Antioxidante Potente'],
    images: [
      'https://i.imgur.com/lQUZYX2.jpeg', // Imagem Principal (Hero)
      getImg(102, 800, 800), // Imagem 2 (Placeholder Fruta/Ingrediente)
      getImg(103, 800, 800), // Imagem 3 (Placeholder Processo/Cápsula)
    ],
    videoThumbnail: getImg(104, 800, 450), // Thumbnail do Vídeo
    rating: 5.0,
    reviews: 2840
  }
];

export const FAQS = [
  {
    question: "O Melão de São Caetano serve para diabéticos?",
    answer: "Sim! Ele é mundialmente estudado por suas propriedades que auxiliam no controle glicêmico natural. Porém, nunca suspenda sua medicação sem orientação médica."
  },
  {
    question: "Quanto tempo demora a entrega em Arujá?",
    answer: "Para Arujá e região, temos prioridade logística com entrega expressa de 1 a 2 dias úteis."
  },
  {
    question: "Como devo tomar?",
    answer: "Recomendamos 2 cápsulas por dia, preferencialmente antes das principais refeições (almoço e jantar)."
  },
  {
    question: "Tem garantia?",
    answer: "Sim! Garantia incondicional de 7 dias ou seu dinheiro de volta."
  },
  {
    question: "Quais as formas de pagamento?",
    answer: "Aceitamos Cartão de Crédito em até 12x, Boleto Bancário e PIX com desconto especial nos kits."
  }
];

export const INSTITUTIONAL_CONTENT = {
  about: {
    title: "Sobre a VitaLife",
    content: "A VitaLife é pioneira em trazer o Melão de São Caetano com tecnologia de extração avançada para o Brasil. Focamos em um único propósito: entregar o mais puro extrato para transformar sua saúde metabólica."
  },
  science: {
    title: "Nossa Ciência",
    content: "Utilizamos o fruto e as sementes selecionadas do Melão de São Caetano, onde se concentra a maior parte da Charantina e Polipeptídeo-p (insulina vegetal). Processo livre de solventes químicos."
  },
  shipping: {
    title: "Envios e Devoluções",
    content: "Envio imediato após confirmação do pagamento. Rastreio enviado via WhatsApp e E-mail."
  },
  contact: {
    title: "Fale Conosco",
    content: "Estamos disponíveis de Seg à Sex das 09:00 às 18:00.\n\nEmail: suporte@vitalife.com.br\nWhatsApp: (11) 99999-9999"
  }
};

export const WHATSAPP_NUMBER = "5511999999999";