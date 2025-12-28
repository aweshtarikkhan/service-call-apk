
import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Phone, Star, Sparkles, LogOut, Loader2, Wind, Droplets, Zap, Palette, 
  Scissors, Flower2, Bug, Hammer, Car, Users, HardHat, HandHelping, 
  Construction, Layers, Bell, ChevronDown, Plus, ArrowLeft, Heart, ShieldCheck, Calendar, Clock, CheckCircle2, AlertCircle, CreditCard, Banknote, ChevronRight, User as UserIcon,
  Lock, ChevronLeft, Wrench
} from 'lucide-react';
import { CATEGORIES, SERVICES, PROVIDERS } from './constants';
import { CategoryType, type Service, type ViewState, type User, type BookingDetails, type RegistrationForm } from './types';
import { api } from './services/supabaseClient'; 
import ServiceCard from './components/ServiceCard';
import BookingModal from './components/BookingModal';
import RegisterProfessional from './components/RegisterProfessional';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import { getServiceRecommendation } from './services/geminiService';
import MobileBottomNav from './components/MobileBottomNav';
import MobileStatusBar from './components/MobileStatusBar';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationForm[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const [pendingBookingDetails, setPendingBookingDetails] = useState<Omit<BookingDetails, 'id' | 'createdAt' | 'status'> | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'CASH'>('CASH');
  
  const [isSearching, setIsSearching] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const [filteredServices, setFilteredServices] = useState<Service[]>(SERVICES);

  const [notification, setNotification] = useState<{title: string, body: string} | null>(null);

  // Slider State
  const heroServices = SERVICES.filter(s => s.isHero);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    if (view === 'HOME') {
      const timer = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroServices.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [view, heroServices.length]);

  useEffect(() => {
    const checkAssignments = () => {
        const assigned = bookings.find(b => b.status === 'ASSIGNED');
        if (assigned && !notification) {
            setNotification({
                title: "Professional Assigned!",
                body: `A professional has been assigned for your ${assigned.serviceName} booking.`
            });
            setTimeout(() => setNotification(null), 5000);
        }
    };
    checkAssignments();
  }, [bookings.length, bookings.filter(b => b.status === 'ASSIGNED').length]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (view === 'HOME') {
        if (window.confirm("Do you want to exit Service on Call?")) {
          window.close();
        } else {
          window.history.pushState({ view: 'HOME' }, "");
        }
      } else {
        setView('HOME');
        window.scrollTo(0, 0);
      }
    };

    window.history.pushState({ view: view }, "");
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [view]);

  const navigateTo = (newView: ViewState) => {
    if (newView === 'DASHBOARD' && !currentUser) {
      setIsLoginOpen(true);
      return;
    }
    if (newView === 'BOOKINGS' && !currentUser) {
      setIsLoginOpen(true);
      return;
    }
    setView(newView);
    window.history.pushState({ view: newView }, "");
    window.scrollTo(0, 0);
  };

  const refreshData = async () => {
    try {
      const data = await api.fetchAllData();
      setUsers(data.users);
      setBookings(data.bookings);
      setRegistrations(data.registrations);
    } catch (err) {
      console.error("Failed to refresh data", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const getVisibleBookings = () => {
    if (!currentUser) return [];
    if (currentUser.role === 'ADMIN') return bookings;
    if (currentUser.role === 'PROVIDER') {
        return bookings.filter(b => b.providerId === currentUser.username || (b.status === 'PENDING' && b.category === currentUser.category));
    }
    return bookings.filter(b => b.customerPhone === currentUser.phone);
  };

  const visibleBookings = getVisibleBookings();

  const getCategoryIcon = (category: CategoryType) => {
    const size = 32; 
    switch (category) {
      case CategoryType.AC_APPLIANCE: return <Wind size={size} className="text-[#3F51B5]" />;
      case CategoryType.CLEANING: return <Sparkles size={size} className="text-[#00BCD4]" />;
      case CategoryType.PLUMBING: return <Droplets size={size} className="text-[#2196F3]" />;
      case CategoryType.ELECTRICIAN: return <Zap size={size} className="text-[#FFC107]" />;
      case CategoryType.PAINTING: return <Palette size={size} className="text-[#FF5722]" />;
      case CategoryType.BEAUTY_MEN: return <Scissors size={size} className="text-[#424242]" />;
      case CategoryType.BEAUTY_WOMEN: return <Flower2 size={size} className="text-[#E91E63]" />;
      case CategoryType.PEST_CONTROL: return <Bug size={size} className="text-[#4CAF50]" />;
      case CategoryType.CARPENTRY: return <Hammer size={size} className="text-[#795548]" />;
      case CategoryType.CAR_RENTAL: return <Car size={size} className="text-[#6739B7]" />;
      case CategoryType.LABOUR: return <Users size={size} className="text-[#607D8B]" />;
      case CategoryType.MISTRI: return <HardHat size={size} className="text-[#FF9800]" />;
      case CategoryType.HOUSE_HELPER: return <HandHelping size={size} className="text-[#F06292]" />;
      case CategoryType.WELDING: return <Construction size={size} className="text-[#455A64]" />;
      case CategoryType.ROOF_PANEL: return <Layers size={size} className="text-[#009688]" />;
      case CategoryType.MECHANIC: return <Wrench size={size} className="text-[#607D8B]" />;
      default: return <Sparkles size={size} />;
    }
  };

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handlePaymentSubmit = async () => {
      if (!pendingBookingDetails) return;
      setIsActionInProgress(true);
      try {
          const finalBooking = {
              ...pendingBookingDetails,
              paymentMethod
          };
          await api.createBooking(finalBooking);
          await refreshData();
          setPendingBookingDetails(null);
          if (!currentUser) {
              setCurrentUser({
                name: finalBooking.customerName,
                phone: finalBooking.customerPhone,
                role: 'CUSTOMER'
              });
          }
          navigateTo('BOOKINGS');
      } catch (err) {
          alert("Payment/Booking failed. Please try again.");
      } finally {
          setIsActionInProgress(false);
      }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const recommendation = await getServiceRecommendation(searchQuery);
    
    if (recommendation.suggestedServiceIds.length > 0) {
        setFilteredServices(SERVICES.filter(s => recommendation.suggestedServiceIds.includes(s.id)));
        setAiReasoning(recommendation.reasoning);
        navigateTo('SEARCH_RESULTS');
    } else {
        const lowerQ = searchQuery.toLowerCase();
        setFilteredServices(SERVICES.filter(s => 
            s.name.toLowerCase().includes(lowerQ) || s.description.toLowerCase().includes(lowerQ)
        ));
        setAiReasoning(null);
        navigateTo('SEARCH_RESULTS');
    }
    setIsSearching(false);
  };

  if (isLoadingData) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-white">
              <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-2" />
                  <p className="text-slate-400 text-sm font-medium">Service on Call</p>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <MobileStatusBar />
      
      {notification && (
          <div className="fixed top-[env(safe-area-inset-top)+32px] left-4 right-4 z-[100] bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 flex items-start gap-3 animate-in slide-in-from-top duration-300">
              <div className="bg-accent p-2 rounded-xl text-white">
                <Bell size={20} />
              </div>
              <div>
                  <h4 className="font-extrabold text-sm">{notification.title}</h4>
                  <p className="text-xs text-slate-500">{notification.body}</p>
              </div>
          </div>
      )}

      {view !== 'PAYMENT' && (
        <header className="bg-white sticky top-[calc(env(safe-area-inset-top)+32px)] z-40 px-6 h-16 flex items-center justify-between border-b border-slate-50">
            <div className="flex flex-col cursor-pointer" onClick={() => navigateTo('HOME')}>
                <div className="flex items-center gap-1">
                    <span className="font-extrabold text-sm uppercase tracking-tighter">Kotma</span>
                    <ChevronDown size={14} className="text-accent" />
                </div>
                <span className="text-[11px] text-slate-500 font-bold truncate max-w-[200px]">
                    Anuppur, Madhya Pradesh
                </span>
            </div>
            
            <div className="flex items-center gap-4">
                {currentUser && (
                    <button 
                        onClick={() => { setCurrentUser(null); navigateTo('HOME'); }}
                        className="hidden md:flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full border border-red-100"
                    >
                        <LogOut size={14} /> Logout
                    </button>
                )}
                {!currentUser && (
                    <button 
                        onClick={() => setIsLoginOpen(true)}
                        className="hidden md:flex items-center gap-2 text-xs font-black text-accent uppercase tracking-widest bg-accent/5 px-4 py-2 rounded-full border border-accent/10"
                    >
                        Login
                    </button>
                )}
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</span>
                </div>
            </div>
        </header>
      )}

      {/* Persistent padding to account for the fixed bottom navigation bar */}
      <main className="flex-1 pb-[calc(80px+env(safe-area-inset-bottom))] relative">
        {isActionInProgress && (
            <div className="fixed inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        )}

        {/* View: HOME */}
        {view === 'HOME' && (
          <div className="animate-in fade-in duration-500">
            {/* HERO SLIDER */}
            <section className="relative overflow-hidden h-[50vh] min-h-[380px]">
                <div 
                  className="flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1) h-full"
                  style={{ transform: `translateX(-${currentHeroIndex * 100}%)` }}
                >
                    {heroServices.map((service) => (
                        <div 
                          key={service.id} 
                          className="min-w-full h-full relative group cursor-pointer active:brightness-95 transition-all"
                          onClick={() => handleBookService(service)}
                        >
                            <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            
                            <div className="absolute bottom-12 left-6 right-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-accent text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-2xl">
                                        Famous Choice
                                    </span>
                                    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-white text-[10px] font-black">{service.rating}</span>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black text-white leading-tight mb-3 drop-shadow-2xl">{service.name}</h3>
                                <p className="text-white/80 text-xs mb-5 max-w-[90%] font-medium leading-relaxed">Verified professionals at your doorstep.</p>
                                
                                <div className="flex items-center gap-4">
                                    <button className="bg-white text-accent px-6 py-3 rounded-[16px] font-black text-[11px] shadow-2xl uppercase tracking-widest active:scale-95 transition-transform flex items-center gap-2">
                                        Book Now <ChevronRight size={16} />
                                    </button>
                                    <div className="flex flex-col">
                                        <span className="text-white/50 text-[8px] font-black uppercase tracking-widest">Starts at</span>
                                        <span className="text-white text-lg font-black tracking-tighter">₹{service.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute top-4 left-4 right-4 z-10">
                    <form onSubmit={handleSearch} className="relative">
                        <input 
                            type="text" 
                            placeholder="Search for a service..." 
                            className="w-full h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[16px] px-10 text-xs text-white placeholder:text-white/60 shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={16} />
                    </form>
                </div>

                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    {heroServices.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentHeroIndex(idx); }}
                            className={`h-1 rounded-full transition-all duration-500 ${currentHeroIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                        />
                    ))}
                </div>
            </section>

            {/* CATEGORY GRID */}
            <section className="px-6 py-12 bg-white">
              <div className="flex flex-col items-center text-center mb-8">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">Service Menu</h2>
                  <p className="text-xl font-black text-slate-900">What are you looking for?</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {CATEGORIES.map((cat, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                        setSelectedCategory(cat);
                        setFilteredServices(SERVICES.filter(s => s.category === cat));
                        navigateTo('CATEGORY');
                    }}
                    className="flex flex-col items-center bg-slate-50 p-6 rounded-[32px] border border-slate-100 group active:scale-95 transition-all shadow-sm active:bg-accent/5 active:border-accent/10"
                  >
                     <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center mb-4 shadow-md group-hover:bg-accent/5 transition-colors border border-slate-50">
                        {getCategoryIcon(cat)}
                     </div>
                     <span className="text-xs font-black text-slate-800 text-center leading-tight uppercase tracking-wide">
                        {cat}
                     </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Trusted Experts Divider */}
            <section className="py-8 bg-slate-50 text-center">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-[32px] p-6 border border-slate-200/60 shadow-sm grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center">
                            <ShieldCheck size={24} className="text-accent mb-2" />
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">Verified</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Clock size={24} className="text-accent mb-2" />
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">60-Min</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <CheckCircle2 size={24} className="text-accent mb-2" />
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">Guaranteed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mechanic Scrollable Row */}
            <section className="py-12 bg-white">
                <div className="px-6 mb-8 flex justify-between items-end">
                   <div>
                       <h2 className="text-2xl font-black text-slate-900 tracking-tight">Mechanic Experts</h2>
                       <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Fast repair in Kotma</p>
                   </div>
                </div>
                <div className="flex overflow-x-auto gap-6 no-scrollbar px-6 pb-4">
                    {SERVICES.filter(s => s.category === CategoryType.MECHANIC && !s.isHero).map(service => (
                        <div key={service.id} className="min-w-[240px] bg-white rounded-[32px] border border-slate-100 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <img src={service.image} className="w-full h-40 object-cover rounded-[24px] mb-4" alt={service.name} />
                                <h3 className="font-black text-lg text-slate-800 leading-tight line-clamp-2">{service.name}</h3>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                                        <Star size={12} className="fill-green-600 text-green-600" />
                                        <span className="text-[10px] font-black text-green-600">{service.rating}</span>
                                    </div>
                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest ml-auto">{service.duration}</span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Price</span>
                                    <span className="text-xl font-black text-slate-900 font-mono tracking-tighter">₹{service.price}</span>
                                </div>
                                <button 
                                    onClick={() => handleBookService(service)}
                                    className="bg-accent text-white h-12 w-12 rounded-[16px] flex items-center justify-center active:scale-90 shadow-xl shadow-accent/25 transition-all"
                                >
                                    <Plus size={24} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          </div>
        )}

        {/* View: CATEGORY */}
        {view === 'CATEGORY' && (
            <div className="animate-in slide-in-from-right-4 duration-300 min-h-screen bg-white">
                <div className="sticky top-[calc(env(safe-area-inset-top)+32px+64px)] z-30 bg-white border-b border-slate-50 px-6 py-6 flex items-center gap-4">
                   <button onClick={() => navigateTo('HOME')} className="p-2 bg-slate-50 rounded-full active:bg-slate-100"><ArrowLeft size={22} /></button>
                   <div>
                       <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedCategory}</h2>
                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Select your expert service</p>
                   </div>
                </div>
                <div className="p-6 space-y-4">
                    {filteredServices.map(service => (
                        <ServiceCard key={service.id} service={service} onBook={handleBookService} />
                    ))}
                </div>
            </div>
        )}

        {/* View: PAYMENT */}
        {view === 'PAYMENT' && pendingBookingDetails && (
            <div className="animate-in slide-in-from-bottom duration-300 min-h-screen bg-[#F9FAFB]">
                <div className="bg-white px-6 py-6 flex items-center gap-4 border-b border-slate-100 shadow-sm">
                    <button onClick={() => navigateTo('HOME')} className="p-2 bg-slate-50 rounded-full"><ArrowLeft size={18} /></button>
                    <h2 className="text-xl font-black">Secure Checkout</h2>
                </div>

                <div className="p-6 space-y-6">
                    <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
                        <div className="flex gap-4 items-center">
                            <div className="bg-slate-50 p-4 rounded-[16px]">
                                {getCategoryIcon(pendingBookingDetails.category)}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-lg text-slate-900 leading-tight">{pendingBookingDetails.serviceName}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar size={12} className="text-slate-400" />
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{pendingBookingDetails.date} • {pendingBookingDetails.time}</p>
                                </div>
                            </div>
                            <span className="font-black text-xl tracking-tighter">₹{pendingBookingDetails.price}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-3">Payment Method</h3>
                        
                        <div 
                            onClick={() => setPaymentMethod('RAZORPAY')}
                            className={`bg-white rounded-[24px] p-6 border-2 flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'RAZORPAY' ? 'border-accent bg-accent/[0.02]' : 'border-slate-100'}`}
                        >
                            <div className={`p-4 rounded-[16px] ${paymentMethod === 'RAZORPAY' ? 'bg-accent text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <CreditCard size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-black text-base">Secure Online</h4>
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">UPI / Cards / Netbanking</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'RAZORPAY' ? 'border-accent' : 'border-slate-300'}`}>
                                {paymentMethod === 'RAZORPAY' && <div className="w-3.5 h-3.5 bg-accent rounded-full animate-in zoom-in" />}
                            </div>
                        </div>

                        <div 
                            onClick={() => setPaymentMethod('CASH')}
                            className={`bg-white rounded-[24px] p-6 border-2 flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'CASH' ? 'border-accent bg-accent/[0.02]' : 'border-slate-100'}`}
                        >
                            <div className={`p-4 rounded-[16px] ${paymentMethod === 'CASH' ? 'bg-accent text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <Banknote size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-black text-base">Pay After Service</h4>
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Cash or QR Scan</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'CASH' ? 'border-accent' : 'border-slate-300'}`}>
                                {paymentMethod === 'CASH' && <div className="w-3.5 h-3.5 bg-accent rounded-full animate-in zoom-in" />}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-[calc(88px+env(safe-area-inset-bottom))] left-0 right-0 p-6 bg-white border-t border-slate-100 flex items-center justify-between z-40 pb-[10px] shadow-2xl">
                    <div>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Final Amount</p>
                        <p className="text-3xl font-black tracking-tighter">₹{pendingBookingDetails.price}</p>
                    </div>
                    <button 
                        onClick={handlePaymentSubmit}
                        className="bg-accent text-white px-8 py-4 rounded-[20px] font-black text-xs shadow-2xl shadow-accent/40 active:scale-95 transition-transform flex items-center gap-2"
                    >
                        {paymentMethod === 'RAZORPAY' ? 'Pay Now' : 'Place Order'}
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        )}

        {/* View: DASHBOARD */}
        {view === 'DASHBOARD' && currentUser && (
             currentUser.role === 'ADMIN' ? (
                <AdminDashboard 
                    bookings={bookings} 
                    registrations={registrations} 
                    users={users} 
                    onAddUser={async (u) => { await api.createUser(u); refreshData(); }}
                    onDeleteUser={async (un) => { await api.deleteUser(un); refreshData(); }}
                    onAssignBooking={async (bid, pid) => { await api.updateBooking(bid, { status: 'ASSIGNED', providerId: pid }); refreshData(); }}
                />
            ) : currentUser.role === 'PROVIDER' ? (
                <ProviderDashboard 
                    user={currentUser} 
                    bookings={bookings} 
                    onAcceptBooking={async (bid) => { await api.updateBooking(bid, { status: 'ASSIGNED', providerId: currentUser.username }); refreshData(); }}
                />
            ) : (
                <div className="p-8 bg-slate-50 min-h-screen">
                    <div className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100 text-center">
                        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 text-accent shadow-inner">
                            <UserIcon size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 leading-tight">{currentUser.name}</h2>
                        <p className="text-slate-400 font-bold mt-2 text-lg">+91 {currentUser.phone}</p>
                        <div className="mt-12 space-y-3">
                            <button 
                                onClick={() => navigateTo('BOOKINGS')}
                                className="w-full bg-slate-900 text-white py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.15em] shadow-xl"
                            >
                                Track My Orders
                            </button>
                            <button 
                                onClick={() => { setCurrentUser(null); navigateTo('HOME'); }}
                                className="w-full bg-red-50 text-red-500 py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.15em] border border-red-100"
                            >
                                Log Out Account
                            </button>
                        </div>
                    </div>
                </div>
            )
        )}

        {/* View: BOOKINGS */}
        {view === 'BOOKINGS' && (
            <div className="animate-in fade-in duration-300 min-h-screen bg-slate-50">
                <div className="bg-white px-8 py-10 border-b border-slate-100 mb-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Activity</h2>
                    <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-[0.3em]">
                        {currentUser ? `Orders for ${currentUser.phone}` : 'Sign in to see history'}
                    </p>
                </div>
                <div className="p-6 space-y-4">
                    {visibleBookings.length > 0 ? visibleBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-black text-xl text-slate-900 leading-tight">{booking.serviceName}</h3>
                                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-widest mt-3">
                                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full"><Calendar size={12} /> {booking.date}</span>
                                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full"><Clock size={12} /> {booking.time}</span>
                                    </div>
                                </div>
                                <span className={`px-3 py-1.5 rounded-full text-[8px] font-black tracking-[0.2em] uppercase shadow-sm ${booking.status === 'ASSIGNED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {booking.status}
                                </span>
                            </div>
                            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Paid Amount</span>
                                    <span className="text-slate-900 font-black text-xl tracking-tighter">₹{booking.price}</span>
                                </div>
                                <button className="bg-slate-900 text-white px-6 py-3 rounded-[16px] text-[9px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform">Details</button>
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center opacity-30">
                            <Calendar size={80} className="mb-6 text-slate-200" />
                            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Empty History</p>
                        </div>
                    )}
                </div>
            </div>
        )}

      </main>

      {/* Persistent Bottom Navbar (Always Rendered & Visible) */}
      <MobileBottomNav 
        currentView={view} 
        onNavigate={(v) => navigateTo(v)} 
        isLoggedIn={!!currentUser} 
      />

      {selectedService && (
        <BookingModal 
          service={selectedService} 
          isOpen={isBookingOpen} 
          currentUser={currentUser}
          onClose={() => setIsBookingOpen(false)} 
          onConfirmBooking={async (details) => {
              setPendingBookingDetails(details);
              setIsBookingOpen(false);
              navigateTo('PAYMENT');
          }}
        />
      )}
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={(u) => { setCurrentUser(u); navigateTo('DASHBOARD'); }}
        users={users}
      />
    </div>
  );
};

export default App;
