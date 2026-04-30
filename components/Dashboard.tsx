
import React from 'react';
import { User, Transaction, Store } from '../types';
import { TrendingUp, PiggyBank, CreditCard, Plus, Eye, EyeOff, Receipt, AlertTriangle, ChevronRight, Sparkles } from 'lucide-react';
import StoreCard from './StoreCard';

interface DashboardProps {
  user: User;
  recentTransactions: Transaction[];
  stores: Store[];
  onStoreClick: (store: Store, tab?: string) => void;
  onAddCard?: () => void;
  showBalance: boolean;
  onToggleBalance: () => void;
  onViewReceipt: (tx: Transaction) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, recentTransactions, stores, onStoreClick, onAddCard, showBalance, onToggleBalance, onViewReceipt }) => {
  const storesWithExpiry = stores.filter(s => s.isLinked && (s.pointsExpiring || 0) > 0);

  return (
    <div className="space-y-8 p-4 md:p-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-2">
          <div>
              <div className="flex items-center space-x-2 mb-1">
                  <Sparkles className="w-4 h-4 text-accent-500" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sharp Shopper</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Hey, {user.name.split(' ')[0]}!</h2>
          </div>
          <div className="text-right">
              <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-brand-500/20">
                {user.name[0]}
              </div>
          </div>
      </div>

      {storesWithExpiry.length > 0 && (
        <div className="animate-in slide-in-from-top-4 duration-500">
          <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-[2.5rem] overflow-hidden shadow-xl shadow-amber-500/5">
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-500 p-3 rounded-2xl shadow-lg shadow-amber-500/30 animate-bounce-soft">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-900 dark:text-amber-100 uppercase tracking-tight">Savings Alarm!</h4>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 font-bold uppercase tracking-widest mt-0.5">Points are expiring soon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 p-6 rounded-[3rem] shadow-2xl shadow-brand-500/20 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <PiggyBank className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] opacity-70">MiCoinBank</span>
                    </div>
                    <button onClick={onToggleBalance} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all active:scale-90">
                        {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Available Change</p>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-4xl md:text-5xl font-mono font-black tracking-tighter">
                            {showBalance ? `R ${user.MiCoinBalance.toFixed(2)}` : 'R ••••'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-4">
         <div className="flex justify-between items-center px-1">
           <h3 className="text-gray-900 dark:text-white font-black uppercase tracking-tight text-lg">My Loyalty Grid</h3>
           <button onClick={onAddCard} className="text-brand-600 dark:text-brand-400 text-[10px] font-black uppercase tracking-widest flex items-center bg-brand-50 dark:bg-brand-900/30 px-3 py-2 rounded-2xl hover:bg-brand-100 transition-all active:scale-90">
             <Plus className="w-4 h-4 mr-1.5" /> add
           </button>
         </div>
         <div className="grid grid-cols-2 gap-4">
           {stores.map((store) => (
             <StoreCard key={store.id} store={store} onClick={onStoreClick} />
           ))}
         </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-gray-900 dark:text-white font-black uppercase tracking-tight">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {recentTransactions.slice(0, 3).map((tx) => (
            <div 
                key={tx.id} 
                onClick={() => tx.receiptData && onViewReceipt(tx)}
                className="bg-white dark:bg-slate-800 p-5 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center transition-all cursor-pointer active:scale-95 hover:shadow-md group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                  {tx.category === 'Groceries' ? '🛒' : tx.category === 'Coffee' ? '☕' : '🛍️'}
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="font-black text-slate-800 dark:text-white text-sm uppercase tracking-tight leading-none mb-1">{tx.store}</p>
                    {tx.receiptData && <Receipt className="w-3.5 h-3.5 ml-2 text-slate-300" />}
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-slate-400 font-bold uppercase tracking-widest">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-lg text-brand-600 dark:text-brand-400 tracking-tight">+ R {tx.savings.toFixed(2)}</p>
                <span className="text-[9px] text-gray-400 dark:text-slate-500 uppercase font-black tracking-tighter">Change Saved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
