import type { User } from '../App';
import { HalftoneDotPattern } from './AsciiDotPattern';

interface ReaderCardProps {
  user: User;
}

export function ReaderCard({ user }: ReaderCardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <div className="inline-block px-2 md:px-3 py-1 border border-black mb-3 md:mb-4 text-[10px] md:text-xs tracking-wider">
          ЦИФРОВОЙ / БИЛЕТ
        </div>
        <h2 className="text-3xl md:text-5xl tracking-tight">Читательский билет</h2>
        
        {/* Decorative graphic lines */}
        <div className="flex gap-1 md:gap-2 mt-4 md:mt-6">
          <div className="w-20 md:w-32 h-0.5 md:h-1 bg-black"></div>
          <div className="w-6 md:w-8 h-0.5 md:h-1 bg-black/20"></div>
          <div className="w-12 md:w-16 h-0.5 md:h-1 bg-black"></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
        {/* Digital Card */}
        <div className="border-2 border-black p-4 md:p-8 bg-white relative overflow-hidden">
          {/* Background graphic pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-5">
            <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`border border-black ${i % 3 === 0 ? 'bg-black' : ''}`}></div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 mb-6 md:mb-8">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div>
                <div className="text-[10px] md:text-xs tracking-wider mb-1 md:mb-2 text-black/60">БИБЛИОТЕКА</div>
                <div className="text-xl md:text-2xl tracking-tight">СИСТЕМА.V2</div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 border border-black flex items-center justify-center">
                <span className="text-lg md:text-xl">{user.name.charAt(0)}</span>
              </div>
            </div>

            <div className="h-px bg-black mb-4 md:mb-6"></div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="text-[10px] md:text-xs tracking-wider mb-0.5 md:mb-1 text-black/60">ИМЯ</div>
                <div className="text-lg md:text-xl tracking-tight">{user.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <div className="text-[10px] md:text-xs tracking-wider mb-0.5 md:mb-1 text-black/60">НОМЕР</div>
                  <div className="font-mono text-xs md:text-sm">{user.cardNumber}</div>
                </div>
                <div>
                  <div className="text-[10px] md:text-xs tracking-wider mb-0.5 md:mb-1 text-black/60">С ДАТЫ</div>
                  <div className="text-xs md:text-sm">
                    {user.memberSince
                      ? new Date(user.memberSince).toLocaleDateString('ru-RU')
                      : '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="border-2 border-black p-4 md:p-6 bg-white flex flex-col items-center relative">
            <div className="w-32 h-32 md:w-48 md:h-48 border border-black/10 flex items-center justify-center mb-2 md:mb-3 bg-white">
              <svg className="w-24 h-24 md:w-32 md:h-32" viewBox="0 0 100 100" fill="none">
                <rect x="10" y="10" width="30" height="30" stroke="black" strokeWidth="2" fill="white"/>
                <rect x="60" y="10" width="30" height="30" stroke="black" strokeWidth="2" fill="white"/>
                <rect x="10" y="60" width="30" height="30" stroke="black" strokeWidth="2" fill="white"/>
                <rect x="15" y="15" width="20" height="20" fill="black"/>
                <rect x="65" y="15" width="20" height="20" fill="black"/>
                <rect x="15" y="65" width="20" height="20" fill="black"/>
                <rect x="50" y="50" width="10" height="10" fill="black"/>
                <rect x="70" y="50" width="5" height="5" fill="black"/>
                <rect x="50" y="70" width="5" height="5" fill="black"/>
              </svg>
            </div>
            <div className="text-xs tracking-wider text-center">
              СКАНИРОВАТЬ ДЛЯ ВЫДАЧИ
            </div>
            
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-black"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-black"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-black"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-black"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="border-2 border-black p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 border-l border-b border-black/5"></div>
            {/* Halftone dot effect */}
            <div className="absolute top-2 left-2 w-12 h-12 opacity-10">
              <HalftoneDotPattern size={6} />
            </div>
            <div className="relative z-10">
              <div className="text-6xl tracking-tighter mb-2">05</div>
              <div className="text-xs tracking-wider text-black/60">КНИГ НА РУКАХ</div>
              <div className="mt-4 h-1 bg-black w-16"></div>
            </div>
          </div>

          <div className="border-2 border-black p-6 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-12 opacity-5">
              <div className="flex h-full">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex-1 border-r border-black last:border-r-0"></div>
                ))}
              </div>
            </div>
            {/* Halftone dot effect */}
            <div className="absolute bottom-2 right-2 w-16 h-16 opacity-10">
              <HalftoneDotPattern size={8} />
            </div>
            <div className="relative z-10">
              <div className="text-6xl tracking-tighter mb-2">23</div>
              <div className="text-xs tracking-wider text-black/60">ПРОЧИТАНО</div>
              <div className="mt-4 h-1 bg-black/20 w-16"></div>
            </div>
          </div>

          <div className="border-2 border-black p-6 bg-black text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="grid grid-cols-6 grid-rows-4 h-full">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border border-white/20"></div>
                ))}
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-6xl tracking-tighter mb-2">03</div>
              <div className="text-xs tracking-wider text-white/60">МЕРОПРИЯТИЯ</div>
              <div className="mt-4 h-1 bg-white w-16"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {[
          { label: 'АКТИВНЫХ', value: 'ДА' },
          { label: 'ШТРАФОВ', value: '0₽' },
          { label: 'РЕЙТИНГ', value: '4.8' },
        ].map((item, idx) => (
          <div key={idx} className="border border-black p-3 md:p-4 relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-l border-t border-black/10 group-hover:border-black/20 transition-colors"></div>
            <div className="text-[10px] md:text-xs tracking-wider mb-1 md:mb-2 text-black/60">{item.label}</div>
            <div className="text-base md:text-xl tracking-tight">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}