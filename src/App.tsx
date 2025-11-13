import { useState } from 'react';
import { Header } from './components/Header';
import { ReaderView } from './components/ReaderView';
import { StaffDashboard } from './components/StaffDashboard';
import { AuthModal } from './components/AuthModal';
import { AsciiDotPattern, HalftoneDotPattern } from './components/AsciiDotPattern';

export type UserRole = 'reader' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  memberSince?: string;
  cardNumber?: string;
  avatar?: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // Mock login
    const user: User = {
      id: '1',
      name: role === 'reader' ? 'Анна Петрова' : 'Мария Иванова',
      email: email,
      role: role,
      memberSince: '2020-03-15',
      cardNumber: 'ГЭС-2-001234',
      avatar: undefined
    };
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        user={currentUser} 
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-6 md:py-12">
        {!currentUser ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 md:mb-16">
              <div className="lg:col-span-7">
                <div className="mb-8">
                  <div className="inline-block px-3 md:px-4 py-1 border border-black mb-4 md:mb-6 text-[10px] md:text-xs tracking-wider">
                    СИСТЕМА / LIBRARY.V2
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-4 md:mb-6 leading-none">
                    Цифровая<br/>библиотека
                  </h1>
                  <div className="w-16 md:w-24 h-px bg-black mb-4 md:mb-6"></div>
                  <p className="text-base md:text-lg max-w-md leading-relaxed">
                    Автоматизированная система взаимодействия читателей и персонала. 
                    Электронный билет, каталог, рекомендации.
                  </p>
                </div>
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="group relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 border-2 border-black hover:bg-black hover:text-white transition-colors w-full md:w-auto justify-center"
                >
                  <span className="tracking-wider text-sm md:text-base">ВОЙТИ</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Decorative graphic elements */}
                <div className="mt-8 md:mt-12 grid grid-cols-8 gap-1 md:gap-2 max-w-md">
                  <div className="h-12 md:h-16 bg-black"></div>
                  <div className="h-12 md:h-16 border border-black"></div>
                  <div className="h-12 md:h-16 border border-black"></div>
                  <div className="h-12 md:h-16 bg-black/10"></div>
                  <div className="h-12 md:h-16 border border-black"></div>
                  <div className="h-12 md:h-16 bg-black"></div>
                  <div className="h-12 md:h-16 border border-black"></div>
                  <div className="h-12 md:h-16 bg-black/10"></div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="border-2 border-black p-6 md:p-8 space-y-4 md:space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-5xl md:text-6xl tracking-tighter mb-1 md:mb-2">8543</div>
                      <div className="text-[10px] md:text-xs tracking-wider">КНИГИ В КАТАЛОГЕ</div>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 border border-black flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-px bg-black"></div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-5xl md:text-6xl tracking-tighter mb-1 md:mb-2">1247</div>
                      <div className="text-[10px] md:text-xs tracking-wider">ЧИТАТЕЛИ</div>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 border border-black flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Grid pattern decoration */}
                  <div className="pt-2 md:pt-4">
                    <div className="grid grid-cols-6 gap-1">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-2 md:h-3 ${i % 5 === 0 ? 'bg-black' : 'border border-black/20'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid system decoration - hide on mobile */}
            <div className="hidden md:grid grid-cols-12 gap-4 mb-12">
              <div className="col-span-4 h-32 border border-black/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="grid grid-cols-4 h-full">
                    <div className="border-r border-black/5"></div>
                    <div className="border-r border-black/5"></div>
                    <div className="border-r border-black/5"></div>
                    <div></div>
                  </div>
                </div>
                {/* ASCII Dot Pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <AsciiDotPattern density="medium" width={30} height={8} />
                </div>
              </div>
              <div className="col-span-5 h-32 border border-black/10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-2/3 h-2 bg-black/10"></div>
                <div className="absolute top-4 right-4 w-12 h-12 border border-black/20"></div>
                {/* Gradient ASCII Dot Pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <AsciiDotPattern density="low" gradient width={40} height={8} />
                </div>
              </div>
              <div className="col-span-3 h-32 border border-black/10 bg-black relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-b border-white/10"></div>
                  <div className="border-r border-b border-white/10"></div>
                  <div className="border-r border-b border-white/10 bg-white/10"></div>
                  <div className="border-b border-white/10"></div>
                  <div className="border-r border-white/10"></div>
                  <div className="border-r border-white/10"></div>
                  <div></div>
                </div>
                {/* Halftone Pattern */}
                <div className="absolute bottom-2 right-2 w-16 h-16 opacity-20">
                  <HalftoneDotPattern size={8} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        ) : currentUser.role === 'reader' ? (
          <ReaderView user={currentUser} />
        ) : (
          <StaffDashboard user={currentUser} />
        )}
      </main>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}