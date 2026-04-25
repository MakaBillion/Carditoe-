
import React, { useState } from 'react';
import { User } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, Smartphone, RefreshCw, ShieldCheck } from 'lucide-react';

interface WalletCardProps {
  user: User;
}

const WalletCard: React.FC<WalletCardProps> = ({ user }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeModal, setActiveModal] = useState<'QR' | 'BARCODE' | null>(null);

  return (
    <div className="w-full perspective-1000">
      <motion.div
        className="relative w-full h-[220px] md:h-[260px] preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between border border-white/10 group">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10 flex justify-between items-start">
                  <div className="flex flex-col">
                      <div className="flex items-center space-x-2 mb-1">
                          <ShieldCheck className="w-4 h-4 text-brand-400" />
                          <span className="text-[10px] font-black tracking-[0.25em] text-white/50 uppercase">Secured by Cardit<span className="text-[#22c55e]">Oe'</span></span>
                      </div>
                      <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Universal</h2>
                  </div>
                  <div className="flex flex-col items-end">
                      <Smartphone className="w-6 h-6 text-white/30" />
                  </div>
              </div>

              <div className="relative z-10">
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mb-2">Member Identity</p>
                  <p className="text-xl font-mono text-white tracking-[0.2em] font-bold">{user.memberId}</p>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                  <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => setIsFlipped(true)}
                        className="bg-brand-500 hover:bg-brand-400 text-white p-4 rounded-2xl shadow-lg shadow-brand-500/20 transition-all flex items-center space-x-2 group/btn"
                      >
                          <QrCode className="w-6 h-6" />
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 pr-0">Reveal Key</span>
                          <RefreshCw className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      </button>
                      <div className="flex flex-col">
                          <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.1em]">Joined 2024</span>
                          <span className="text-[9px] font-black text-brand-400 uppercase tracking-widest">{user.name}</span>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-4 md:p-6 flex flex-col justify-between border-4 border-slate-900 dark:border-brand-500 relative overflow-hidden group">
            <div className="flex-1 flex flex-col items-center justify-center space-y-2 md:space-y-4">
                <div className="relative group/qr p-1 md:p-2 bg-white rounded-xl md:rounded-2xl">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.memberId}`}
                        alt="Unique QR"
                        className="w-24 h-24 md:w-32 md:h-32 grayscale brightness-90 group-hover/qr:grayscale-0 transition-all cursor-pointer"
                        onClick={() => setActiveModal('QR')}
                    />
                </div>
                
                <div className="w-full space-y-1 flex flex-col items-center group/barcode">
                    <div 
                        className="w-full h-10 md:h-12 bg-black flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform rounded-lg"
                        onClick={() => setActiveModal('BARCODE')}
                    >
                        <div className="w-[90%] h-full flex justify-between space-x-1 p-2 bg-white">
                            {[...Array(30)].map((_, i) => (
                                <div key={i} className={`h-full ${i % 3 === 0 ? 'bg-black' : 'bg-gray-100'}`} style={{ width: (i % 5) + 1 }}></div>
                            ))}
                        </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-[0.5em] text-slate-500">{user.memberId}</span>
                </div>
            </div>

            <button 
                onClick={() => setIsFlipped(false)}
                className="w-full py-4 text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center space-x-2 border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
                <RefreshCw className="w-4 h-4" />
                <span>Return to Balance</span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            onClick={() => setActiveModal(null)}
          >
             <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="w-full max-w-sm bg-white p-8 rounded-[3rem] shadow-2xl flex flex-col items-center space-y-10"
                onClick={e => e.stopPropagation()}
             >
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-brand-50 p-4 rounded-3xl">
                        <Smartphone className="w-8 h-8 text-brand-600" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Point of Sale Scan</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-widest">Brightness set to max</p>
                    </div>
                </div>

                {activeModal === 'QR' ? (
                   <div className="p-4 bg-slate-50 rounded-4xl border-2 border-slate-100 shadow-inner">
                       <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${user.memberId}`} className="w-64 h-64" alt="Zoomed QR" />
                   </div>
                ) : (
                  <div className="w-full h-32 bg-white flex flex-col items-center justify-center space-y-4">
                       <div className="w-full h-20 flex justify-between space-x-1 p-2">
                            {[...Array(40)].map((_, i) => (
                                <div key={i} className="h-full bg-black" style={{ width: (i % 6) + 1 }}></div>
                            ))}
                       </div>
                  </div>
                )}
                
                <button 
                    onClick={() => setActiveModal(null)}
                    className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-slate-900/20 active:scale-95 transition-all"
                >
                    Dismiss
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default WalletCard;
