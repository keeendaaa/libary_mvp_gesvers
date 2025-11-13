import type { User as UserType } from '../App';

interface ReaderProfileProps {
  user: UserType;
}

interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  borrowDate: string;
  dueDate: string;
  status: 'active' | 'overdue';
}

const mockBorrowedBooks: BorrowedBook[] = [
  {
    id: '1',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    borrowDate: '2025-10-15',
    dueDate: '2025-11-15',
    status: 'active'
  },
  {
    id: '2',
    title: 'Преступление и наказание',
    author: 'Федор Достоевский',
    borrowDate: '2025-10-20',
    dueDate: '2025-11-20',
    status: 'active'
  }
];

export function ReaderProfile({ user }: ReaderProfileProps) {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
          ПРОФИЛЬ / {user.cardNumber}
        </div>
        <h2 className="text-5xl tracking-tight">Личный кабинет</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Personal Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="border-2 border-black p-6">
            <div className="w-24 h-24 border-2 border-black flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">{user.name.charAt(0)}</span>
            </div>
            <div className="text-center mb-6">
              <div className="text-2xl tracking-tight mb-2">{user.name}</div>
              <div className="text-xs tracking-wider text-black/60 font-mono">{user.cardNumber}</div>
            </div>

            <div className="border-t-2 border-black pt-6 space-y-4">
              <div>
                <div className="text-xs tracking-wider mb-1 text-black/60">EMAIL</div>
                <div className="text-sm">{user.email}</div>
              </div>
              <div>
                <div className="text-xs tracking-wider mb-1 text-black/60">ЧЛЕН С</div>
                <div className="text-sm">
                  {user.memberSince ? new Date(user.memberSince).toLocaleDateString('ru-RU') : '-'}
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-3 border-2 border-black hover:bg-black hover:text-white transition-colors tracking-wider text-sm">
            РЕДАКТИРОВАТЬ
          </button>

          {/* Achievements */}
          <div className="border border-black p-6">
            <div className="text-xs tracking-wider mb-4 text-black/60">ДОСТИЖЕНИЯ</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-black/10 last:border-0">
                <div className="w-10 h-10 border border-black flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1">Книжный червь</div>
                  <div className="text-xs text-black/60">20+ книг</div>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b border-black/10 last:border-0">
                <div className="w-10 h-10 border border-black flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1">Активный</div>
                  <div className="text-xs text-black/60">5 мероприятий</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Books & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Books */}
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <h3 className="text-2xl tracking-tight">Книги на руках</h3>
              <div className="flex-1 h-px bg-black/10"></div>
              <div className="text-xs tracking-wider text-black/40">{mockBorrowedBooks.length}</div>
            </div>

            <div className="space-y-4">
              {mockBorrowedBooks.map((book, idx) => (
                <div key={book.id} className="border-2 border-black p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl tracking-tighter opacity-20 w-12">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl tracking-tight mb-1">{book.title}</h4>
                      <div className="text-sm text-black/60 mb-4">{book.author}</div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="tracking-wider text-black/60">ВЗЯТО:</span>{' '}
                          {new Date(book.borrowDate).toLocaleDateString('ru-RU')}
                        </div>
                        <div>
                          <span className="tracking-wider text-black/60">ВЕРНУТЬ:</span>{' '}
                          {new Date(book.dueDate).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors text-xs tracking-wider whitespace-nowrap">
                      ПРОДЛИТЬ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading History */}
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <h3 className="text-2xl tracking-tight">История</h3>
              <div className="flex-1 h-px bg-black/10"></div>
            </div>

            <div className="border border-black">
              {['Евгений Онегин', 'Война и мир', 'Анна Каренина'].map((title, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border-b border-black last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="text-sm opacity-40">{String(idx + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="text-sm mb-1">{title}</div>
                      <div className="text-xs text-black/60">Октябрь 2025</div>
                    </div>
                  </div>
                  <button className="text-xs tracking-wider hover:underline">ОЦЕНИТЬ</button>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <h3 className="text-2xl tracking-tight">Статистика</h3>
              <div className="flex-1 h-px bg-black/10"></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="border-2 border-black p-6 text-center">
                <div className="text-5xl tracking-tighter mb-2">23</div>
                <div className="text-xs tracking-wider text-black/60">ВСЕГО</div>
              </div>
              <div className="border-2 border-black p-6 text-center">
                <div className="text-5xl tracking-tighter mb-2">05</div>
                <div className="text-xs tracking-wider text-black/60">В МЕСЯЦ</div>
              </div>
              <div className="border-2 border-black p-6 text-center bg-black text-white">
                <div className="text-5xl tracking-tighter mb-2">2.5</div>
                <div className="text-xs tracking-wider text-white/60">В НЕДЕЛЮ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
