import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Dúvidas Frequentes</h2>
        <p className="text-slate-500">Tudo que você precisa saber sobre nossos produtos e entrega.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div 
            key={index} 
            className={`border rounded-xl transition-all duration-300 overflow-hidden ${
              openIndex === index ? 'border-emerald-500 bg-white shadow-md' : 'border-slate-200 bg-slate-50 hover:bg-white'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className={`font-semibold text-lg ${openIndex === index ? 'text-emerald-700' : 'text-slate-700'}`}>
                {faq.question}
              </span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              ) : (
                <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/50 mt-2">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
