import type { User as UserType } from '../App';

interface HeaderProps {
  user: UserType | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function Header({ user, onLoginClick, onLogout }: HeaderProps) {
  return (
    <header className="border-b-2 border-black relative">
      {/* Decorative top stripe */}
      <div className="h-1 bg-black"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-black flex items-center justify-center relative">
                {/* Corner marks */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
                <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <div className="text-lg tracking-tight leading-none mb-1">БИБЛИОТЕКА</div>
                <div className="text-xs tracking-wider text-black/60">СИСТЕМА.V2</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-4 px-4 py-2 border border-black relative">
                  <div className="absolute top-0 left-0 w-1 h-1 bg-black"></div>
                  <div className="absolute top-0 right-0 w-1 h-1 bg-black"></div>
                  <div className="absolute bottom-0 left-0 w-1 h-1 bg-black"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-black"></div>
                  <div className="text-right">
                    <div className="text-sm tracking-tight leading-none mb-1">{user.name}</div>
                    <div className="text-xs tracking-wider text-black/60">
                      {user.role === 'reader' ? 'ЧИТАТЕЛЬ' : 'ПЕРСОНАЛ'}
                    </div>
                  </div>
                  <div className="w-10 h-10 border border-black flex items-center justify-center">
                    <span className="text-lg">{user.name.charAt(0)}</span>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                  title="Выйти"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors tracking-wider text-sm"
              >
                ВХОД
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}