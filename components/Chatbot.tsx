import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageCircle, X, Send, Loader2, Sparkles, Minus } from 'lucide-react';
import { PRODUCTS } from '../constants';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Olá! Sabia que o Melão de São Caetano é o segredo da longevidade em Okinawa? Posso te contar mais ou ajudar com seu pedido?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize Gemini Chat Session
  useEffect(() => {
    try {
      if (!process.env.API_KEY) {
        console.warn("API_KEY not found in environment.");
        return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Build context from products
      const productContext = PRODUCTS.map(p => 
        `- ${p.name} (R$ ${p.price.toFixed(2)}): ${p.tagline}. Benefícios: ${p.benefits.join(', ')}. Descrição: ${p.description}`
      ).join('\n');

      const systemInstruction = `
        Você é a VitaBot, a especialista apaixonada da VitaLife. Sua personalidade é vibrante, otimista e focada em saúde natural.
        
        SEU ÚNICO OBJETIVO:
        Vender o Melão de São Caetano através do encantamento. Você deve falar APENAS sobre coisas boas, benefícios incríveis, curiosidades históricas e responder dúvidas de envio/compra.

        REGRAS DE OURO (SIGA ESTRITAMENTE):
        1. CURIOSIDADES & BENEFÍCIOS: Sempre que perguntarem sobre o produto, responda com entusiasmo citando fatos fascinantes (ex: "Em Okinawa, onde as pessoas vivem mais de 100 anos, eles consomem isso diariamente!", "É conhecido como a insulina natural da planta!", "Limpa o organismo como nenhum outro!").
        2. ESTIMULE A COMPRA: Ao final de cada explicação sobre benefícios, faça uma chamada para ação (ex: "Imagina sentir essa energia? O nosso kit de 3 potes é perfeito para começar.").
        3. POSITIVIDADE TOTAL: Se o usuário perguntar algo negativo ou técnico chato, desvie suavemente voltando para os benefícios maravilhosos e a pureza do extrato da VitaLife. Não fale de efeitos colaterais, foque na saúde e bem-estar.
        4. SUPORTE LOGÍSTICO: Responda perguntas sobre frete, prazos e pagamento de forma clara e prestativa para facilitar a venda.

        DADOS PARA CONSULTA:
        - Frete: Prioridade expressa para Arujá (1-2 dias). Capitais (3-5 dias).
        - Frete Grátis: Compras acima de R$ 250 (Kits de 3 ou 5 potes).
        - Pagamento: Pix (Desconto extra), Cartão até 12x.
        - Segurança: Compra garantida e site seguro.

        PRODUTOS VITALIFE:
        ${productContext}

        Responda sempre em Português do Brasil, seja curto, persuasivo e use emojis para parecer amigável.
      `;

      chatSessionRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction,
          temperature: 0.8, // Slightly higher for more enthusiastic/creative responses
        },
      });
    } catch (error) {
      console.error("Failed to initialize AI", error);
    }
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || !chatSessionRef.current) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result: GenerateContentResponse = await chatSessionRef.current.sendMessage({ 
        message: userMsg 
      });
      
      const responseText = result.text || "Estou aqui para te contar as maravilhas do Melão de São Caetano! O que gostaria de saber?";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Minha conexão oscilou, mas minha vontade de te ver saudável continua! Pode repetir?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // Toggle button only
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-slate-900 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group animate-fadeIn"
        aria-label="Abrir chat"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        <MessageCircle className="w-7 h-7" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-full max-w-[360px] flex flex-col transition-all duration-300 ${isMinimized ? 'h-auto' : 'h-[500px]'}`}>
      
      {/* Chat Container */}
      <div className="flex flex-col h-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Especialista VitaLife</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs text-slate-300">Online Agora</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
             <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
               <Minus className="w-4 h-4" />
             </button>
             <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-red-500/80 rounded-lg transition-colors">
               <X className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Body - Hide if minimized */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scroll-smooth">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                      <span className="text-xs text-slate-400">Digitando...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pergunte sobre os benefícios..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-slate-700 placeholder-slate-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl transition-all shadow-md active:scale-95 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                IA treinada para te ajudar a viver melhor.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;