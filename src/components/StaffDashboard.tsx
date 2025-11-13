import { BookCatalog } from './BookCatalog';
import { EventsManagement } from './EventsManagement';
import { ReadersManagement } from './ReadersManagement';
import type { User } from '../App';
import { AsciiDotPattern } from './AsciiDotPattern';

interface StaffDashboardProps {
  user: User;
}

export function StaffDashboard({ user }: StaffDashboardProps) {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
          ПЕРСОНАЛ / ОБЗОР
        </div>
        <h2 className="text-5xl tracking-tight">Панель управления</h2>
        
        {/* Decorative graphic lines */}
        <div className="flex gap-2 mt-6">
          <div className="w-24 h-1 bg-black"></div>
          <div className="w-12 h-1 bg-black"></div>
          <div className="w-6 h-1 bg-black/20"></div>
          <div className="w-16 h-1 bg-black"></div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        <div className="border-2 border-black p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16">
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
              <div className="border-r border-b border-black/5"></div>
              <div className="border-b border-black/5 bg-black/5"></div>
              <div className="border-r border-black/5"></div>
              <div></div>
            </div>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-5xl tracking-tighter">1247</div>
              <div className="text-xs tracking-wider text-black/40">+12%</div>
            </div>
            <div className="text-xs tracking-wider text-black/60">ЧИТАТЕЛИ</div>
          </div>
        </div>

        <div className="border-2 border-black p-6 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-2 bg-black/5"></div>
          <div className="relative z-10">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-5xl tracking-tighter">8543</div>
              <div className="text-xs tracking-wider text-black/40">+8%</div>
            </div>
            <div className="text-xs tracking-wider text-black/60">КНИГИ</div>
          </div>
        </div>

        <div className="border-2 border-black p-6 relative overflow-hidden">
          <div className="absolute top-2 left-2 w-12 h-12 border border-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-5xl tracking-tighter">12</div>
              <div className="text-xs tracking-wider text-black/40">4</div>
            </div>
            <div className="text-xs tracking-wider text-black/60">МЕРОПРИЯТИЯ</div>
          </div>
        </div>

        <div className="border-2 border-black p-6 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border-r border-white/20 last:border-r-0"></div>
              ))}
            </div>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-5xl tracking-tighter">342</div>
              <div className="text-xs tracking-wider text-white/40">+15%</div>
            </div>
            <div className="text-xs tracking-wider text-white/60">ВЫДАЧ / НЕДЕЛЯ</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div>
          <div className="flex items-baseline gap-4 mb-6">
            <h3 className="text-2xl tracking-tight">Последние действия</h3>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>

          <div className="border-2 border-black">
            {[
              { action: 'Выдана книга', details: 'Мастер и Маргарита', user: 'А. Петрова', time: '5м' },
              { action: 'Новая регистрация', details: 'Иван Сидоров', user: 'Читатель', time: '15м' },
              { action: 'Возврат книги', details: 'Война и мир', user: 'М. Иванова', time: '1ч' },
              { action: 'Запись на событие', details: 'Встреча с автором', user: '3 чел.', time: '2ч' },
            ].map((activity, idx) => (
              <div key={idx} className="p-4 border-b-2 border-black last:border-0 hover:bg-black/5 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-sm opacity-40">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="flex-1">
                    <div className="text-sm mb-1">{activity.action}</div>
                    <div className="text-xs text-black/60">{activity.details}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-black/60 mb-1">{activity.user}</div>
                    <div className="text-xs text-black/40">{activity.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div>
          <div className="flex items-baseline gap-4 mb-6">
            <h3 className="text-2xl tracking-tight">Уведомления</h3>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-black p-6 bg-black text-white">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1">КРИТИЧНО</div>
                  <div className="text-xs text-white/60">15 книг не возвращены в срок</div>
                </div>
              </div>
            </div>

            <div className="border border-black p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-black flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1">НИЗКИЙ ЗАПАС</div>
                  <div className="text-xs text-black/60">3 книги требуют пополнения</div>
                </div>
              </div>
            </div>

            <div className="border border-black/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-black/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1 text-black/60">СОБЫТИЕ ЗАВТРА</div>
                  <div className="text-xs text-black/40">Встреча с писателем в 18:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Books */}
        <div>
          <div className="flex items-baseline gap-4 mb-6">
            <h3 className="text-2xl tracking-tight">Популярное</h3>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>

          <div className="border border-black relative overflow-hidden">
            {/* ASCII dot pattern background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <AsciiDotPattern density="low" width={50} height={20} />
            </div>
            {[
              { title: 'Мастер и Маргарита', borrows: 45 },
              { title: 'Преступление и наказание', borrows: 38 },
              { title: 'Евгений Онегин', borrows: 32 },
              { title: 'Анна Каренина', borrows: 28 },
              { title: 'Война и мир', borrows: 25 },
            ].map((book, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b border-black last:border-0 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="text-sm opacity-40 w-8">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="text-sm">{book.title}</div>
                </div>
                <div className="text-sm tabular-nums">{book.borrows}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="flex items-baseline gap-4 mb-6">
            <h3 className="text-2xl tracking-tight">Ближайшие события</h3>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>

          <div className="space-y-4">
            {[
              { title: 'Встреча с писателем', date: '20 НОЯ', participants: 32 },
              { title: 'Книжный клуб', date: '22 НОЯ', participants: 15 },
              { title: 'Мастер-класс', date: '25 НОЯ', participants: 8 },
            ].map((event, idx) => (
              <div key={idx} className="border border-black p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-sm">{event.title}</div>
                  <div className="text-xs tracking-wider px-2 py-1 border border-black">
                    {event.date}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-black/10">
                    <div className="h-full bg-black" style={{ width: '65%' }}></div>
                  </div>
                  <div className="text-xs tracking-wider text-black/60">{event.participants}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}