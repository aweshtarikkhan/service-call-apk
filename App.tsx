
import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Phone, Star, Sparkles, LogOut, Loader2, Wind, Droplets, Zap, Palette, 
  Scissors, Flower2, Bug, Hammer, Car, Users, HardHat, HandHelping, 
  Construction, Layers, Bell, ChevronDown, Plus, ArrowLeft, Heart, ShieldCheck, Calendar, Clock, CheckCircle2, AlertCircle, CreditCard, Banknote, ChevronRight
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
  
  // Payment Flow State
  const [pendingBookingDetails, setPendingBookingDetails] = useState<Omit<BookingDetails, 'id' | 'createdAt' | 'status'> | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'CASH'>('CASH');
  
  const [isSearching, setIsSearching] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const [filteredServices, setFilteredServices] = useState<Service[]>(SERVICES);

  const [notification, setNotification] = useState<{title: string, body: string} | null>(null);

  // --- SIMULATED NOTIFICATION LOGIC ---
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

  // --- NATIVE BACK BUTTON LOGIC ---
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

      {/* Header (Hidden on Payment Page for focus) */}
      {view !== 'PAYMENT' && (
        <header className="bg-white sticky top-[calc(env(safe-area-inset-top)+32px)] z-40 px-4 h-16 flex items-center justify-between border-b border-slate-50">
            <div className="flex flex-col cursor-pointer" onClick={() => navigateTo('HOME')}>
            <div className="flex items-center gap-1">
                <span className="font-extrabold text-sm uppercase tracking-tight">Kotma</span>
                <ChevronDown size={14} className="text-accent" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium truncate max-w-[180px]">
                Anuppur, Madhya Pradesh
            </span>
            </div>

            <div className="flex items-center gap-4">
              {currentUser ? (
                <div className="flex items-center gap-2" onClick={() => navigateTo('DASHBOARD')}>
                   <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                     {currentUser.name.charAt(0)}
                   </div>
                </div>
              ) : (
                <Bell size={22} className="text-slate-800" />
              )}
            </div>
        </header>
      )}

      <main className="flex-1 pb-24 relative">
        {isActionInProgress && (
            <div className="fixed inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        )}

        {/* View: PAYMENT PAGE */}
        {view === 'PAYMENT' && pendingBookingDetails && (
            <div className="animate-in slide-in-from-bottom duration-300 min-h-screen bg-[#F9FAFB]">
                <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-slate-100">
                    <button onClick={() => navigateTo('HOME')}><ArrowLeft size={20} /></button>
                    <h2 className="text-lg font-bold">Payment</h2>
                </div>

                <div className="p-4 space-y-4">
                    <div className="bg-white rounded-uc p-4 border border-slate-100 uc-card-shadow">
                        <div className="flex gap-4 items-center">
                            <div className="bg-slate-50 p-2 rounded-xl">
                                {getCategoryIcon(pendingBookingDetails.category)}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900">{pendingBookingDetails.serviceName}</h3>
                                <p className="text-xs text-slate-500">{pendingBookingDetails.date} • {pendingBookingDetails.time}</p>
                            </div>
                            <span className="font-bold">₹{pendingBookingDetails.price}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-400">
                            <MapPin size={12} className="text-accent" />
                            <span className="truncate">{pendingBookingDetails.address}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider px-1">Payment Options</h3>
                        
                        <div 
                            onClick={() => setPaymentMethod('RAZORPAY')}
                            className={`bg-white rounded-uc p-4 border flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'RAZORPAY' ? 'border-accent bg-purple-50' : 'border-slate-100'}`}
                        >
                            <div className={`p-2 rounded-full ${paymentMethod === 'RAZORPAY' ? 'bg-accent text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <CreditCard size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Online Payment (UPI/Cards)</h4>
                                <p className="text-[10px] text-slate-500">Fast and secure via Razorpay</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'RAZORPAY' ? 'border-accent' : 'border-slate-300'}`}>
                                {paymentMethod === 'RAZORPAY' && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
                            </div>
                        </div>

                        <div 
                            onClick={() => setPaymentMethod('CASH')}
                            className={`bg-white rounded-uc p-4 border flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'CASH' ? 'border-accent bg-purple-50' : 'border-slate-100'}`}
                        >
                            <div className={`p-2 rounded-full ${paymentMethod === 'CASH' ? 'bg-accent text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <Banknote size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Pay After Service (Cash/UPI)</h4>
                                <p className="text-[10px] text-slate-500">Pay directly to the professional</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'CASH' ? 'border-accent' : 'border-slate-300'}`}>
                                {paymentMethod === 'CASH' && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-uc border border-blue-100 flex gap-3">
                        <ShieldCheck size={20} className="text-blue-600 flex-shrink-0" />
                        <p className="text-[10px] text-blue-800 leading-relaxed font-medium">
                            Urban Company's safety standard applies to every booking in Kotma. Your payment is safe and protected by our refund policies.
                        </p>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex items-center justify-between z-50 pb-[env(safe-area-inset-bottom)]">
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">To Pay</p>
                        <p className="text-lg font-extrabold">₹{pendingBookingDetails.price}</p>
                    </div>
                    <button 
                        onClick={handlePaymentSubmit}
                        className="bg-accent text-white px-10 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-accent/20 active:bg-accent-hover flex items-center gap-2"
                    >
                        {paymentMethod === 'RAZORPAY' ? 'Proceed to Pay' : 'Confirm Booking'}
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
            ) : (
                <ProviderDashboard 
                    user={currentUser} 
                    bookings={bookings} 
                    onAcceptBooking={async (bid) => { await api.updateBooking(bid, { status: 'ASSIGNED', providerId: currentUser.username }); refreshData(); }}
                />
            )
        )}

        {/* View: BOOKINGS (Customer View) */}
        {view === 'BOOKINGS' && (
            <div className="animate-in fade-in duration-300 min-h-screen bg-slate-50">
                <div className="bg-white px-4 py-6 border-b border-slate-100 mb-2">
                    <h2 className="text-2xl font-extrabold text-slate-900">Your Bookings</h2>
                    <p className="text-xs text-slate-400 mt-1">Track your requests in Kotma.</p>
                </div>
                
                <div className="p-4 space-y-4">
                    {bookings.length > 0 ? bookings.map((booking) => {
                        const provider = PROVIDERS.find(p => p.id === booking.providerId) || users.find(u => u.username === booking.providerId);
                        const isAssigned = booking.status === 'ASSIGNED';

                        return (
                            <div key={booking.id} className="bg-white rounded-uc p-5 shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-extrabold text-lg text-slate-900">{booking.serviceName}</h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 uppercase font-bold tracking-tighter">
                                            <Calendar size={12} /> {booking.date}
                                            <Clock size={12} /> {booking.time}
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-tight ${isAssigned ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                        {isAssigned ? 'ASSIGNED' : 'PENDING'}
                                    </span>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 mt-2">
                                    {isAssigned ? (
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                                <Users size={24} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-extrabold text-slate-400">Assigned Professional</p>
                                                <h4 className="font-bold text-slate-800">{provider?.name || booking.providerId}</h4>
                                                <p className="text-xs text-slate-500">
                                                    {(provider as any)?.experience ? `${(provider as any).experience} Experience` : 'Verified Expert'}
                                                </p>
                                                <div className="mt-1 flex items-center gap-1 text-green-600 text-[10px] font-bold">
                                                    <CheckCircle2 size={12} /> IDENTITY VERIFIED
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 py-2">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 animate-pulse">
                                                <Loader2 size={24} className="animate-spin" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-extrabold text-slate-400">Status</p>
                                                <h4 className="font-bold text-slate-600">Looking for a professional...</h4>
                                                <p className="text-[11px] text-slate-400">Usually assigned within 15 mins</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-900 uppercase">Amount: ₹{booking.price}</span>
                                    <button className="text-accent text-xs font-bold px-4 py-2 hover:bg-slate-50 rounded-lg">Help / Support</button>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-slate-300">
                                <Calendar size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">No bookings yet</h3>
                            <p className="text-sm text-slate-400 mt-2">Book a service in Kotma to see it here.</p>
                            <button 
                                onClick={() => navigateTo('HOME')}
                                className="mt-6 bg-accent text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-accent/20"
                            >
                                Book Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* View: HOME */}
        {view === 'HOME' && (
          <div className="animate-in fade-in duration-500">
            {/* Search Bar */}
            <div className="px-4 pt-4 pb-2">
                <form onSubmit={handleSearch} className="relative">
                    <input 
                        type="text" 
                        placeholder="Search for 'refrigerator repair'" 
                        className="w-full h-14 bg-white border border-slate-200 rounded-xl px-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    {isSearching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-accent" size={20} />}
                </form>
            </div>

            <section className="px-4 py-4 mt-2">
              <h2 className="text-lg font-extrabold text-slate-900 mb-6 px-1">Expert services in Kotma</h2>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((cat, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                        setSelectedCategory(cat);
                        setFilteredServices(SERVICES.filter(s => s.category === cat));
                        navigateTo('CATEGORY');
                    }}
                    className="bg-white p-5 rounded-uc border border-slate-100 flex flex-col items-center justify-center gap-4 active:scale-95 transition-all uc-card-shadow"
                  >
                     <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                        {getCategoryIcon(cat)}
                     </div>
                     <span className="text-[11px] font-bold text-slate-800 text-center leading-tight uppercase tracking-tight">{cat}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-6 bg-[#FAFAFA]">
                <div className="px-4 mb-4 flex justify-between items-center">
                   <h2 className="text-lg font-extrabold text-slate-900">Appliance Repair</h2>
                   <span className="text-accent text-xs font-bold uppercase" onClick={() => { setSelectedCategory(CategoryType.AC_APPLIANCE); setFilteredServices(SERVICES.filter(s => s.category === CategoryType.AC_APPLIANCE)); navigateTo('CATEGORY'); }}>See All</span>
                </div>
                <div className="flex overflow-x-auto gap-4 no-scrollbar px-4 pb-4">
                    {SERVICES.filter(s => s.category === CategoryType.AC_APPLIANCE).slice(0, 6).map(service => (
                        <div key={service.id} className="min-w-[220px] bg-white rounded-uc border border-slate-100 p-3 uc-card-shadow">
                            <img src={service.image} className="w-full h-32 object-cover rounded-xl mb-3" />
                            <h3 className="font-bold text-sm text-slate-800 line-clamp-1">{service.name}</h3>
                            <p className="text-xs text-slate-400 mb-2">₹{service.price}</p>
                            <button 
                                onClick={() => handleBookService(service)}
                                className="w-full py-2 bg-white border border-accent text-accent rounded-lg text-xs font-extrabold active:bg-accent active:text-white transition-colors"
                            >
                                ADD
                            </button>
                        </div>
                    ))}
                </div>
            </section>
          </div>
        )}

        {/* View: CATEGORY */}
        {view === 'CATEGORY' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
                <div className="sticky top-[calc(env(safe-area-inset-top)+32px+64px)] z-30 bg-white border-b border-slate-50 px-4 py-3 flex items-center gap-4">
                   <button onClick={() => navigateTo('HOME')}><ArrowLeft size={20} /></button>
                   <h2 className="text-lg font-bold">{selectedCategory}</h2>
                </div>
                
                <div className="p-4 space-y-2">
                    {filteredServices.map(service => (
                        <ServiceCard key={service.id} service={service} onBook={handleBookService} />
                    ))}
                </div>
            </div>
        )}

        {/* View: SEARCH RESULTS */}
        {view === 'SEARCH_RESULTS' && (
            <div className="container mx-auto px-4 pt-4 animate-in fade-in">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigateTo('HOME')}><ArrowLeft size={20} /></button>
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            placeholder="Search for services" 
                            className="w-full h-12 bg-slate-100 rounded-xl px-12 text-sm outline-none focus:ring-2 focus:ring-accent/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                            autoFocus
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                </div>

                {isSearching ? (
                   <div className="flex flex-col items-center py-20"><Loader2 className="animate-spin text-accent" /></div>
                ) : (
                    <div className="space-y-6">
                        {aiReasoning && (
                          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-6">
                            <p className="text-xs text-purple-900 leading-relaxed italic">
                              <Sparkles size={14} className="inline mr-1 text-accent" />
                              {aiReasoning}
                            </p>
                          </div>
                        )}
                        {filteredServices.length > 0 ? filteredServices.map(s => (
                            <ServiceCard key={s.id} service={s} onBook={handleBookService} />
                        )) : (
                          <div className="text-center py-12 text-slate-400">No services found for your search.</div>
                        )}
                    </div>
                )}
            </div>
        )}

        {view === 'REGISTER_PROFESSIONAL' && (
            <RegisterProfessional onSubmit={async (d) => { await api.createRegistration(d); refreshData(); }} />
        )}
      </main>

      {/* Navigation & Login */}
      {view !== 'PAYMENT' && (
          <MobileBottomNav 
            currentView={view} 
            onNavigate={(v) => {
              if (v === 'DASHBOARD' && !currentUser) {
                setIsLoginOpen(true);
              } else {
                navigateTo(v);
              }
            }} 
            isLoggedIn={!!currentUser} 
          />
      )}

      {selectedService && (
        <BookingModal 
          service={selectedService} 
          isOpen={isBookingOpen} 
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
