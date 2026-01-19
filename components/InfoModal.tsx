import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { INSTITUTIONAL_CONTENT } from '../constants';

interface InfoModalProps {
  pageKey: keyof typeof INSTITUTIONAL_CONTENT | null;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ pageKey, onClose }) => {
  if (!pageKey) return null;

  const content = INSTITUTIONAL_CONTENT[pageKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-3 mb-6">
           <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
              <ShieldCheck className="w-8 h-8" />
           </div>
           <h2 className="text-2xl font-bold text-slate-900">{content.title}</h2>
        </div>
        
        <div className="overflow-y-auto text-slate-600 leading-relaxed whitespace-pre-line text-lg pr-2">
          {content.content}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
