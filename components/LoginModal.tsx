
import React, { useState } from 'react';
import type { User } from '../types';
// Fixed missing Sparkles icon import by adding it to the lucide-react imports
import { X, Lock, User as UserIcon, Phone, ArrowRight, Chrome, Facebook, Apple, ChevronLeft, Loader2, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  users: User[];
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, users }) => {
  const [loginType, setLoginType] = useState<'CUSTOMER' | 'PARTNER'>('CUSTOMER');
  const [step, setStep] = useState<'SOCIAL' | 'MOBILE' | 'PARTNER_FORM'>('SOCIAL');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [socialProvider, setSocialProvider] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin(user);
      onClose();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSocialSelect = (provider: string) => {
    setIsLoading(true);
    // Simulate social authentication (e.g. Google Sign-In)
    setTimeout(() => {
        setSocialProvider(provider);
        setStep('MOBILE');
        setIsLoading(false);
    }, 1200);
  };

  const handleMobileLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Enter a valid 10-digit phone number');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate linking mobile number to social identity
    setTimeout(() => {
        const existingUser = users.find(u => u.phone === phone);
        if (existingUser) {
            onLogin(existingUser);
        } else {
            // Register new customer instantly linked to social
            onLogin({
                name: socialProvider ? `${socialProvider} User` : 'Valued Customer',
                phone: phone,
                role: 'CUSTOMER'
            });
        }
        setIsLoading(false);
        onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md p-0 sm:p-4">
      <div className="bg-white rounded-t-[40px] sm:rounded-[32px] shadow-2xl w-full max-w-sm relative overflow-hidden animate-in slide-in-from-bottom duration-500">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 z-10 bg-slate-50 rounded-full p-2 transition-colors">
          <X size={20} />
        </button>

        {step === 'MOBILE' && (
            <button onClick={() => setStep('SOCIAL')} className="absolute top-6 left-6 text-slate-400 z-10 p-2">
                <ChevronLeft size={24} />
            </button>
        )}

        <div className="p-10">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-accent/10 rounded-[22px] flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="text-accent" size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    {loginType === 'CUSTOMER' ? 'Service on Call' : 'Partner Portal'}
                </h2>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3">
                    {step === 'SOCIAL' ? 'Select identity to continue' : 'Last step: Link Mobile'}
                </p>
            </div>

            {/* View: Social Options */}
            {loginType === 'CUSTOMER' && step === 'SOCIAL' && (
                <div className="space-y-3.5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <button 
                        onClick={() => handleSocialSelect('Google')}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-4 bg-white border-2 border-slate-100 py-4.5 rounded-[22px] hover:border-accent/20 transition-all active:scale-[0.97]"
                    >
                        <Chrome size={22} className="text-[#4285F4]" />
                        <span className="font-bold text-sm text-slate-700">Continue with Google</span>
                        {isLoading && socialProvider === 'Google' && <Loader2 size={16} className="animate-spin text-slate-400" />}
                    </button>
                    <button 
                        onClick={() => handleSocialSelect('Facebook')}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-4 bg-[#1877F2] py-4.5 rounded-[22px] hover:brightness-110 transition-all active:scale-[0.97] text-white"
                    >
                        <Facebook size={22} className="fill-white" />
                        <span className="font-bold text-sm">Continue with Facebook</span>
                    </button>
                    <button 
                        onClick={() => handleSocialSelect('Apple')}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-4 bg-black py-4.5 rounded-[22px] hover:brightness-110 transition-all active:scale-[0.97] text-white"
                    >
                        <Apple size={22} className="fill-white" />
                        <span className="font-bold text-sm">Continue with Apple</span>
                    </button>
                    
                    <div className="flex items-center gap-4 py-4">
                        <div className="flex-1 h-[1px] bg-slate-100"></div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Or</span>
                        <div className="flex-1 h-[1px] bg-slate-100"></div>
                    </div>

                    <button 
                        onClick={() => { setLoginType('PARTNER'); setStep('PARTNER_FORM'); }}
                        className="w-full text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] py-2 hover:text-accent transition-colors"
                    >
                        Login as Service Professional
                    </button>
                </div>
            )}

            {/* View: Link Mobile (No OTP Required) */}
            {loginType === 'CUSTOMER' && step === 'MOBILE' && (
                <form onSubmit={handleMobileLinkSubmit} className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="bg-slate-50 p-5 rounded-[24px] border border-slate-100 flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                            {socialProvider === 'Google' ? <Chrome size={24} className="text-[#4285F4]" /> : 
                             socialProvider === 'Facebook' ? <Facebook size={24} className="text-[#1877F2]" /> : <Apple size={24} />}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-800">Linked to {socialProvider}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Please add your phone number</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                        <div className="flex gap-3">
                            <div className="bg-slate-50 border border-slate-100 px-5 py-5 rounded-[22px] text-sm font-black text-slate-400">+91</div>
                            <div className="relative flex-1">
                                <Phone className="absolute left-5 top-5 text-slate-300" size={20} />
                                <input 
                                    type="tel" 
                                    maxLength={10}
                                    required
                                    autoFocus
                                    className="w-full pl-14 p-5 bg-slate-50 border border-slate-100 rounded-[22px] focus:ring-2 focus:ring-accent/20 outline-none text-sm font-black tracking-widest placeholder:text-slate-200"
                                    placeholder="00000 00000"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value.replace(/\D/g,''));
                                        if(error) setError('');
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-wider animate-pulse">{error}</p>}
                    
                    <button type="submit" disabled={isLoading} className="w-full bg-accent text-white py-5 rounded-[22px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent/40 flex items-center justify-center gap-3 active:scale-95 transition-all">
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Finish & Continue <ArrowRight size={18} /></>}
                    </button>
                    <p className="text-[9px] text-center text-slate-300 font-bold uppercase tracking-widest px-4">Instant linking. No OTP required.</p>
                </form>
            )}

            {/* View: Partner Login Form */}
            {loginType === 'PARTNER' && (
                <form onSubmit={handlePartnerSubmit} className="space-y-5 animate-in fade-in duration-500">
                    <button 
                        type="button" 
                        onClick={() => { setLoginType('CUSTOMER'); setStep('SOCIAL'); }}
                        className="text-[10px] font-black text-accent uppercase tracking-[0.15em] flex items-center gap-1 mb-6"
                    >
                        <ChevronLeft size={14} /> Back to Customer
                    </button>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
                        <div className="relative">
                            <UserIcon className="absolute left-5 top-5 text-slate-300" size={18} />
                            <input 
                                type="text" 
                                required
                                className="w-full pl-14 p-5 bg-slate-50 border border-slate-100 rounded-[22px] focus:ring-2 focus:ring-accent/20 outline-none text-sm font-bold"
                                placeholder="Provider ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-5 top-5 text-slate-300" size={18} />
                            <input 
                                type="password" 
                                required
                                className="w-full pl-14 p-5 bg-slate-50 border border-slate-100 rounded-[22px] focus:ring-2 focus:ring-accent/20 outline-none text-sm font-bold"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-wider">{error}</p>}
                    <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-[22px] font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 mt-4">
                        Partner Sign In <ArrowRight size={18} />
                    </button>
                </form>
            )}
            
            <p className="text-[9px] text-center text-slate-300 mt-12 pb-4 leading-relaxed max-w-[85%] mx-auto font-medium">
                By signing up, you agree to SOC <span className="underline text-slate-400">Terms</span> and <span className="underline text-slate-400">Privacy Policy</span>.
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
