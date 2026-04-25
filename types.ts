export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  STORES = 'STORES',
  HISTORY = 'HISTORY',
  PROFILE = 'PROFILE',
  WALLET = 'WALLET',
  STORE_DETAIL = 'STORE_DETAIL',
  DIGITAL_RECEIPT = 'DIGITAL_RECEIPT'
}

export interface User {
  id: string;
  name: string;
  memberId: string;
  totalSaved: number;
  miCoinBalance: number;
  roundUpTarget: number;
  isAutoSaveEnabled: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  cashbackAmount?: number;
  promoDescription?: string;
}

export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ReceiptData {
  id: string;
  storeName: string;
  date: string;
  items: ReceiptItem[];
  total: number;
  saved: number;
}

export interface Transaction {
  id: string;
  store: string;
  date: string;
  amount: number;
  savings: number;
  category: string;
  type: 'Purchase' | 'RoundUp' | 'Cashback';
  receiptData?: ReceiptData;
  cashoutToken?: string;
}

export interface StoreBranch {
  id: string;
  name: string;
  distance: string;
  address: string;
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  color: string;
  tagline: string;
  category: string;
  isLinked: boolean;
  points?: number;
  pointsExpiring?: number;
  tabAlerts?: {
    [key: string]: boolean;
  };
  branches?: StoreBranch[];
}

export interface SavedList {
  id: string;
  name: string;
  items: string[];
}
