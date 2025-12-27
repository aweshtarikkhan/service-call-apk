
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Search, MapPin, Phone, ShieldCheck, Star, Sparkles, LogIn, 
  User as UserIcon, LogOut, Loader2, Wind, Droplets, Zap, Palette, 
  Scissors, Flower2, Bug, Hammer, Car, Users, HardHat, UserCheck, 
  Construction, Layers, Bell, HandHelping, ArrowLeft, Home
} from 'lucide-react';
import { CATEGORIES, SERVICES, TESTIMONIALS, PROVIDERS } from './constants';
import { CategoryType, type Service, type ViewState, type User, type BookingDetails, type RegistrationForm } from './types';
import { api } from './services/supabaseClient'; 
import ServiceCard from './components/ServiceCard';
import ProviderCard from './components/ProviderCard';
import BookingModal from './components/BookingModal';
import AboutUs from './components/AboutUs';
import RegisterProfessional from './components/RegisterProfessional';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import { getServiceRecommendation } from './services/geminiService';
import MobileBottomNav from './components/MobileBottomNav';

const App: React.FC = () => {
  // Navigation & View State
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationForm[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Booking Flow State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // AI Search State
  const [isSearching, setIsSearching] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const [filteredServices, setFilteredServices] = useState<Service[]>(SERVICES);

  // --- MOBILE BACK BUTTON NAVIGATION ---
  useEffect(() => {
    // Push initial state
    if (window.history.state?.view !== view) {
      window.history.pushState({ view: view }, "");
    }

    const handlePopState = (event: PopStateEvent) => {
      if (view === 'HOME') {
        const exit = window.confirm("Do you want to exit the app?");
        if (!exit) {
          window.history.pushState({ view: 'HOME' }, "");
        } else {
          // In a real APK environment, we might call a native close. 
          // For web, we can try window.close() but browsers often block it.
          window.close();
        }
      } else {
        const previousView = event.state?.view || 'HOME';
        setView(previousView);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [view]);

  const navigateTo = (newView: ViewState) => {
    window.history.pushState({ view: newView }, "");
    setView(newView);
    window.scrollTo(0, 0);
  };

  // --- INITIAL DATA LOAD ---
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

  // --- Helpers ---

  const getCategoryIcon = (category: CategoryType) => {
    const size = 56; // Increased icon size as requested
    switch (category) {
      case CategoryType.AC_APPLIANCE: return <Wind size={size} className="text-blue-500" />;
      case CategoryType.CLEANING: return <Sparkles size={size} className="text-blue-400" />;
      case CategoryType.PLUMBING: return <Droplets size={size} className="text-blue-600" />;
      case CategoryType.ELECTRICIAN: return <Zap size={size} className="text-yellow-500" />;
      case CategoryType.PAINTING: return <Palette size={size} className="text-orange-500" />;
      case CategoryType.BEAUTY_MEN: return <Scissors size={size} className="text-slate-700" />;
      case CategoryType.BEAUTY_WOMEN: return <Flower2 size={size} className="text-pink-500" />;
      case CategoryType.PEST_CONTROL: return <Bug size={size} className="text-green-700" />;
      case CategoryType.CARPENTRY: return <Hammer size={size} className="text-amber-800" />;
      case CategoryType.CAR_RENTAL: return <Car size={size} className="text-indigo-600" />;
      case CategoryType.LABOUR: return <Users size={size} className="text-slate-600" />;
      case CategoryType.MISTRI: return <HardHat size={size} className="text-yellow-600" />;
      case CategoryType.HOUSE_HELPER: return <HandHelping size={size} className="text-rose-400" />;
      case CategoryType.WELDING: return <Construction size={size} className="text-slate-500" />;
      case CategoryType.ROOF_PANEL: return <Layers size={size} className="text-cyan-600" />;
      default: return <Sparkles size={size} />;
    }
  };

  // --- Handlers ---

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = async (details: Omit<BookingDetails, 'id' | 'createdAt' | 'status'>) => {
      setIsActionInProgress(true);
      try {
        await api.createBooking(details);
        await refreshData();
      } catch (err) {
        alert("Booking failed. Please check your internet connection and try again.");
      } finally {
        setIsActionInProgress(false);
      }
  };

  const handleRegistrationSubmit = async (data: Omit<RegistrationForm, 'id' | 'submittedAt'>) => {
      setIsActionInProgress(true);
      try {
        await api.createRegistration(data);
        await refreshData();
      } catch (err) {
        alert("Registration failed. Please check your internet connection.");
      } finally {
        setIsActionInProgress(false);
      }
  };

  const handleAddUser = async (user: User) => {
      setIsActionInProgress(true);
      try {
        await api.createUser(user);
        await refreshData();
      } catch (err) {
        alert("Failed to create user. This username might already be taken.");
      } finally {
        setIsActionInProgress(false);
      }
  };

  const handleDeleteUser = async (username: string) => {
    if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
        setIsActionInProgress(true);
        try {
            await api.deleteUser(username);
            if (currentUser?.username === username) {
                handleLogout();
            }
            await refreshData();
        } catch (err) {
            alert("Failed to delete user. Please try again.");
        } finally {
            setIsActionInProgress(false);
        }
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
      if (!currentUser) return;
      setIsActionInProgress(true);
      try {
        await api.updateBooking(bookingId, { status: 'ASSIGNED', providerId: currentUser.username });
        await refreshData();
      } catch (err) {
        alert("Failed to accept booking.");
      } finally {
        setIsActionInProgress(false);
      }
  };

  const handleAssignBooking = async (bookingId: string, providerUsername: string) => {
      setIsActionInProgress(true);
      try {
        await api.updateBooking(bookingId, { status: 'ASSIGNED', providerId: providerUsername || null as any });
        await refreshData();
      } catch (err) {
        alert("Failed to assign booking.");
      } finally {
        setIsActionInProgress(false);
      }
  };

  const handleLogin = (user: User) => {
      setCurrentUser(user);
      navigateTo('DASHBOARD');
  };

  const handleLogout = () => {
      setCurrentUser(null);
      navigateTo('HOME');
  };

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
    setFilteredServices(SERVICES.filter(s => s.category === category));
    setAiReasoning(null);
    navigateTo('CATEGORY');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const recommendation = await getServiceRecommendation(searchQuery);
    
    if (recommendation.suggestedServiceIds.length > 0) {
        const matchedServices = SERVICES.filter(s => recommendation.suggestedServiceIds.includes(s.id));
        setFilteredServices(matchedServices);
        setAiReasoning(recommendation.reasoning);
    } else if (recommendation.recommendedCategory) {
        const categoryMatch = Object.values(CategoryType).find(c => c === recommendation.recommendedCategory);
        if (categoryMatch) {
             setFilteredServices(SERVICES.filter(s => s.category === categoryMatch));
        } else {
             const lowerQ = searchQuery.toLowerCase();
             setFilteredServices(SERVICES.filter(s => 
                s.name.toLowerCase().includes(lowerQ) || 
                s.description.toLowerCase().includes(lowerQ) ||
                s.category.toLowerCase().includes(lowerQ)
             ));
        }
        setAiReasoning(recommendation.reasoning);
    } else {
        const lowerQ = searchQuery.toLowerCase();
        const fallback = SERVICES.filter(s => 
            s.name.toLowerCase().includes(lowerQ) || 
            s.description.toLowerCase().includes(lowerQ)
        );
        setFilteredServices(fallback);
        setAiReasoning("Here is what we found matching your search.");
    }
    
    setIsSearching(false);
  };

  const handleBottomNavNavigate = (newView: ViewState) => {
    if (newView === 'DASHBOARD' && !currentUser) {
      setIsLoginOpen(true);
    } else {
      if (newView === 'SEARCH_RESULTS') {
          setFilteredServices([]);
          setAiReasoning(null);
      }
      navigateTo(newView);
    }
  };

  if (isLoadingData) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
              <div className="text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-accent mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Launching Service on Call...</p>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <div className="bg-black h-safe-top sticky top-0 z-50 w-full" />
      
      <header className="bg-white sticky top-[env(safe-area-inset-top)] z-40 px-4 h-14 flex items-center justify-between border-b border-slate-100">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigateTo('HOME')}
        >
          <div className="bg-accent w-7 h-7 rounded-lg flex items-center justify-center text-white">
            <Phone size={14} fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight text-primary">Service on Call</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-slate-500 p-1"><Bell size={20} /></button>
          {currentUser && (
            <button onClick={handleLogout} className="text-red-500 p-1" title="Logout">
              <LogOut size={20} />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 pb-20 relative">
        {isActionInProgress && (
            <div className="fixed inset-0 bg-white/40 backdrop-blur-[1px] z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 border border-slate-100 animate-in fade-in zoom-in duration-200">
                    <Loader2 className="w-8 h-8 animate-spin text-accent" />
                    <span className="font-bold text-slate-800">Please wait...</span>
                </div>
            </div>
        )}
        
        {view === 'DASHBOARD' && currentUser && (
            currentUser.role === 'ADMIN' ? (
                <AdminDashboard 
                    bookings={bookings} 
                    registrations={registrations} 
                    users={users} 
                    onAddUser={handleAddUser}
                    onDeleteUser={handleDeleteUser}
                    onAssignBooking={handleAssignBooking}
                />
            ) : (
                <ProviderDashboard 
                    user={currentUser} 
                    bookings={bookings} 
                    onAcceptBooking={handleAcceptBooking}
                />
            )
        )}

        {/* View: SEARCH (Search is now exclusively here as requested) */}
        {view === 'SEARCH_RESULTS' && (
            <div className="container mx-auto px-4 pt-6 animate-in slide-in-from-bottom-4 duration-300">
                <button 
                  onClick={() => navigateTo('HOME')}
                  className="mb-4 flex items-center gap-2 text-accent font-bold text-sm"
                >
                  <ArrowLeft size={16} /> Back to Home
                </button>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What can we help with?</h2>
                    <form onSubmit={handleSearch} className="relative">
                      <input 
                        type="text" 
                        placeholder="Search for service e.g. Plumber..." 
                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-100 text-slate-900 outline-none focus:ring-2 focus:ring-accent/50 placeholder-slate-400 text-base shadow-inner"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={24} />
                    </form>
                </div>

                {isSearching ? (
                   <div className="flex flex-col items-center py-20 text-slate-400">
                      <Loader2 className="animate-spin mb-4" size={32} />
                      <p>AI is finding best services for you...</p>
                   </div>
                ) : (
                  <section className="pb-8">
                    {aiReasoning && (
                        <div className="mb-6 bg-blue-50 text-blue-800 px-4 py-4 rounded-2xl text-sm leading-relaxed border border-blue-100">
                            <Sparkles size={16} className="inline mr-2 text-accent" />
                            {aiReasoning}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-5">
                        {filteredServices.length > 0 ? (
                            filteredServices.map(service => (
                                <ServiceCard key={service.id} service={service} onBook={handleBookService} />
                            ))
                        ) : searchQuery && (
                            <div className="text-center py-20">
                                <Search className="text-slate-200 mx-auto mb-3" size={60} />
                                <h3 className="font-bold text-slate-400">Search for a specific service</h3>
                            </div>
                        )}
                    </div>
                  </section>
                )}
            </div>
        )}

        {/* View: HOME */}
        {view === 'HOME' && (
          <div className="animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-primary text-white pt-8 pb-10">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold leading-tight mb-2">Home services at your doorstep.</h1>
                <p className="text-slate-400 text-sm">Organized services for semi-urban & rural cities.</p>
              </div>
            </div>

            {/* Categories Grid - 2 icons per row, increased size */}
            <section className="py-8 container mx-auto px-4">
              <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-accent" /> Our Services
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((cat, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleCategorySelect(cat)}
                    className="bg-white p-6 rounded-[2.5rem] hover:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center gap-4 border border-slate-100 active:scale-95 shadow-sm"
                  >
                     <div className="p-4 bg-slate-50 rounded-3xl group-hover:bg-white transition-colors">
                        {getCategoryIcon(cat)}
                     </div>
                     <span className="text-xs font-extrabold text-slate-800 leading-tight uppercase tracking-tight">{cat}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Trending Carousel */}
            <section className="py-8 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl font-extrabold text-slate-800 mb-5">Popular Now</h2>
                    <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4 -mx-4 px-4">
                        {SERVICES.slice(0, 8).map(service => (
                            <div key={service.id} className="min-w-[280px]">
                                <ServiceCard service={service} onBook={handleBookService} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Banner */}
            <section className="py-8 px-4 mb-4">
               <div className="bg-slate-900 rounded-[3rem] p-10 text-white text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <h3 className="text-2xl font-bold mb-3">Join as a Partner</h3>
                  <p className="text-slate-400 text-sm mb-8 px-4 leading-relaxed">Grow your skills and income by working with Service on Call.</p>
                  <button 
                    onClick={() => navigateTo('REGISTER_PROFESSIONAL')}
                    className="bg-accent w-full py-4 rounded-2xl font-bold text-base shadow-lg shadow-accent/20 active:bg-accent-hover"
                  >
                    Register Now
                  </button>
               </div>
            </section>
          </div>
        )}

        {/* View: CATEGORY */}
        {view === 'CATEGORY' && (
            <div className="container mx-auto px-4 animate-in slide-in-from-right-4 duration-300">
                <section className="py-8 min-h-[50vh]">
                    <button 
                      onClick={() => navigateTo('HOME')}
                      className="mb-6 flex items-center gap-2 text-accent font-bold text-sm"
                    >
                      <ArrowLeft size={16} /> Back to Home
                    </button>

                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-3xl font-extrabold text-slate-800">
                            {selectedCategory}
                        </h2>
                        <div className="bg-slate-50 p-3 rounded-2xl text-slate-400">
                           {selectedCategory && getCategoryIcon(selectedCategory)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        {filteredServices.map(service => (
                            <ServiceCard key={service.id} service={service} onBook={handleBookService} />
                        ))}
                    </div>
                </section>
            </div>
        )}

        {view === 'REGISTER_PROFESSIONAL' && (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <div className="px-4 py-4">
                <button 
                    onClick={() => navigateTo('HOME')}
                    className="flex items-center gap-2 text-accent font-bold text-sm"
                  >
                    <ArrowLeft size={16} /> Back to Home
                  </button>
              </div>
              <RegisterProfessional onSubmit={handleRegistrationSubmit} />
            </div>
        )}

      </main>

      <MobileBottomNav 
        currentView={view} 
        onNavigate={handleBottomNavNavigate} 
        isLoggedIn={!!currentUser} 
      />

      {selectedService && (
        <BookingModal 
          service={selectedService} 
          isOpen={isBookingOpen} 
          onClose={() => {setIsBookingOpen(false); setSelectedService(null);}} 
          onConfirmBooking={handleConfirmBooking}
        />
      )}
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin}
        users={users}
      />
    </div>
  );
};

export default App;
