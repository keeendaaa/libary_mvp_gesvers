import { useState } from 'react';
import type { UserRole } from '../App';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string, role: UserRole) => void;
}

export function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'reader' | 'staff'>('reader');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  return (
    <div className="fixed inset-0 bg-white/95 flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full border-2 border-black p-8 bg-white relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-r-2 border-b-2 border-black/10"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-black/10"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-r-2 border-t-2 border-black/10"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-l-2 border-t-2 border-black/10"></div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8">
          <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
            АВТОРИЗАЦИЯ
          </div>
          <h2 className="text-4xl tracking-tight">Вход в систему</h2>
          
          {/* Decorative lines */}
          <div className="flex gap-2 mt-4">
            <div className="w-16 h-px bg-black"></div>
            <div className="w-8 h-px bg-black/20"></div>
            <div className="w-12 h-px bg-black"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs tracking-wider mb-3 uppercase">Тип учетной записи</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('reader')}
                className={`p-4 border-2 transition-colors ${
                  role === 'reader'
                    ? 'border-black bg-black text-white'
                    : 'border-black/20 hover:border-black'
                }`}
              >
                <div className="text-sm tracking-wider">ЧИТАТЕЛЬ</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('staff')}
                className={`p-4 border-2 transition-colors ${
                  role === 'staff'
                    ? 'border-black bg-black text-white'
                    : 'border-black/20 hover:border-black'
                }`}
              >
                <div className="text-sm tracking-wider">ПЕРСОНАЛ</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-wider mb-3 uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
              placeholder="example@library.ru"
              required
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider mb-3 uppercase">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              className="w-full bg-black text-white py-4 hover:bg-black/90 transition-colors tracking-wider"
            >
              ВОЙТИ В СИСТЕМУ
            </button>
            <p className="text-xs text-center text-black/40 tracking-wider">
              DEMO / ЛЮБЫЕ ДАННЫЕ ДЛЯ ВХОДА
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}