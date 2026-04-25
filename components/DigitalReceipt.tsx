
import React, { useEffect, useState } from 'react';
import { ReceiptData, Store } from '../types';
import { X, Sparkles, ArrowLeft } from 'lucide-react';

interface DigitalReceiptProps {
  data: ReceiptData;
  store: Store;
  onClose: () => void;
}

const DigitalReceipt: React.FC<DigitalReceiptProps> = ({ data, store, onClose }) => {
  const [scanning, setScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [cashbackFound, setCashbackFound] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const duration = 2000; 
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setScanProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setScanning(false);
        const cashbackTotal = data.items.reduce((acc, item) => acc + (item.price * 0.1), 0);
        setCashbackFound(cashbackTotal);
        setTimeout(() => setShowNotification(true), 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [data]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      {showNotification && (
        <div className="absolute top-10 left-0 right-0 flex justify-center z-[60] pointer-events-none">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 flex items-center space-x-4 max-w-xs border-l-4" style={{ borderLeftColor: store.color }}>
             <div className="bg-brand-500/10 p-2 rounded-full">
                <Sparkles className="w-6 h-6 text-brand-500 animate-pulse" />
             </div>
             <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Auto-Cashback Found!</h4>
                <p className="text-xs text-gray-500 dark:text-slate-300">R {cashbackFound?.toFixed(2)} added to wallet.</p>
             </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-md bg-white p-1 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 z-50">
            <button onClick={onClose} className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 py-2">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-wider">Back</span>
            </button>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X className="w-5 h-5 text-gray-600" /></button>
        </div>

        <div className="overflow-y-auto relative flex-1 font-mono text-xs text-gray-800 leading-tight pb-10 bg-white">
            {scanning && (
              <div className="absolute left-0 right-0 h-1 bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20 pointer-events-none transition-all ease-linear" style={{ top: `${scanProgress}%` }} />
            )}

            <div className="p-6 pt-10 flex flex-col items-center text-center relative z-10">
                <div className="mb-2 flex flex-col items-center">
                   <div className="text-4xl mb-2">{store.logo}</div>
                   <div className="font-bold text-xl uppercase tracking-tighter">{store.name}</div>
                </div>

                <div className="w-full space-y-4 mb-4 text-left">
                    {data.items.map((item, idx) => (
                        <div key={idx} className="relative p-2 rounded-xl">
                            <div className="flex justify-between font-bold text-gray-700">
                                <span className="uppercase text-[10px]">{item.name}</span>
                                <span className="flex-shrink-0">R {item.price.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full border-t border-dashed border-gray-400 pt-3 space-y-1 mb-4">
                    <div className="flex justify-between text-lg font-black mt-2 pt-2 border-t border-gray-100">
                        <span>TOTAL</span>
                        <span>R {data.total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="w-full h-10 bg-gray-900 my-6 items-center justify-center flex text-white text-[8px] tracking-[0.4em]">
                    ||| || |||| || | || |||| || |
                </div>
                <div className="text-[10px] text-gray-500 uppercase">{data.date}</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalReceipt;
