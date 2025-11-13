import { useState } from 'react';

interface Reader {
  id: string;
  name: string;
  email: string;
  phone: string;
  cardNumber: string;
  memberSince: string;
  booksOnHand: number;
  totalBorrowed: number;
  status: 'active' | 'inactive' | 'blocked';
}

const mockReaders: Reader[] = [
  {
    id: '1',
    name: 'Анна Петрова',
    email: 'anna.petrova@email.com',
    phone: '+7 (999) 123-45-67',
    cardNumber: 'ГЭС-2-001234',
    memberSince: '2020-03-15',
    booksOnHand: 5,
    totalBorrowed: 45,
    status: 'active'
  },
  {
    id: '2',
    name: 'Иван Сидоров',
    email: 'ivan.sidorov@email.com',
    phone: '+7 (999) 234-56-78',
    cardNumber: 'ГЭС-2-001235',
    memberSince: '2021-05-20',
    booksOnHand: 2,
    totalBorrowed: 23,
    status: 'active'
  },
  {
    id: '3',
    name: 'Мария Иванова',
    email: 'maria.ivanova@email.com',
    phone: '+7 (999) 345-67-89',
    cardNumber: 'ГЭС-2-001236',
    memberSince: '2019-11-10',
    booksOnHand: 0,
    totalBorrowed: 78,
    status: 'active'
  },
  {
    id: '4',
    name: 'Петр Смирнов',
    email: 'petr.smirnov@email.com',
    phone: '+7 (999) 456-78-90',
    cardNumber: 'ГЭС-2-001237',
    memberSince: '2022-01-15',
    booksOnHand: 3,
    totalBorrowed: 12,
    status: 'active'
  }
];

export function ReaderManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReader, setSelectedReader] = useState<Reader | null>(null);

  const filteredReaders = mockReaders.filter(reader =>
    reader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reader.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reader.cardNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
            УПРАВЛЕНИЕ / {mockReaders.length} ЧИТАТЕЛЕЙ
          </div>
          <h2 className="text-5xl tracking-tight">Читатели</h2>
        </div>
        <button className="px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors tracking-wider text-sm whitespace-nowrap">
          + ДОБАВИТЬ
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по имени, email или номеру..."
          className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="border border-black p-4">
          <div className="text-3xl tracking-tighter mb-1">{mockReaders.length}</div>
          <div className="text-xs tracking-wider text-black/60">ВСЕГО</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-3xl tracking-tighter mb-1">
            {mockReaders.filter(r => r.status === 'active').length}
          </div>
          <div className="text-xs tracking-wider text-black/60">АКТИВНЫХ</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-3xl tracking-tighter mb-1">
            {mockReaders.reduce((sum, r) => sum + r.booksOnHand, 0)}
          </div>
          <div className="text-xs tracking-wider text-black/60">НА РУКАХ</div>
        </div>
        <div className="border border-black p-4 bg-black text-white">
          <div className="text-3xl tracking-tighter mb-1">
            {mockReaders.reduce((sum, r) => sum + r.totalBorrowed, 0)}
          </div>
          <div className="text-xs tracking-wider text-white/60">ВЫДАНО</div>
        </div>
      </div>

      {/* Readers Table */}
      <div className="border-2 border-black">
        <div className="grid grid-cols-12 gap-4 p-4 border-b-2 border-black bg-black/5">
          <div className="col-span-3 text-xs tracking-wider">ЧИТАТЕЛЬ</div>
          <div className="col-span-3 text-xs tracking-wider">КОНТАКТЫ</div>
          <div className="col-span-2 text-xs tracking-wider">БИЛЕТ</div>
          <div className="col-span-2 text-xs tracking-wider">КНИГИ</div>
          <div className="col-span-1 text-xs tracking-wider">СТАТУС</div>
          <div className="col-span-1 text-xs tracking-wider text-right">ДЕЙСТВИЯ</div>
        </div>

        {filteredReaders.map((reader, idx) => (
          <div key={reader.id} className="grid grid-cols-12 gap-4 p-4 border-b border-black last:border-0 hover:bg-black/5 transition-colors">
            <div className="col-span-3 flex items-center gap-3">
              <div className="text-sm opacity-40">{String(idx + 1).padStart(2, '0')}</div>
              <div>
                <div className="text-sm mb-1">{reader.name}</div>
                <div className="text-xs text-black/60">
                  {new Date(reader.memberSince).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div className="text-xs mb-1 text-black/60">{reader.email}</div>
              <div className="text-xs text-black/60">{reader.phone}</div>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="font-mono text-xs">{reader.cardNumber}</div>
            </div>

            <div className="col-span-2 flex items-center gap-4">
              <div className="text-center">
                <div className="text-xl tracking-tighter">{reader.booksOnHand}</div>
                <div className="text-xs text-black/40">из {reader.totalBorrowed}</div>
              </div>
            </div>

            <div className="col-span-1 flex items-center">
              <div className={`px-2 py-1 border text-xs tracking-wider ${
                reader.status === 'active'
                  ? 'border-black'
                  : 'border-black/20 text-black/40'
              }`}>
                {reader.status === 'active' ? 'АКТ' : 'НЕТ'}
              </div>
            </div>

            <div className="col-span-1 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedReader(reader)}
                className="w-8 h-8 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Details Modal */}
      {selectedReader && (
        <div
          onClick={() => setSelectedReader(null)}
          className="fixed inset-0 bg-white/95 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full border-2 border-black p-8 bg-white"
          >
            <button
              onClick={() => setSelectedReader(null)}
              className="float-right w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-8">
              <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
                ЧИТАТЕЛЬ / {selectedReader.cardNumber}
              </div>
              <h2 className="text-4xl tracking-tight mb-4">{selectedReader.name}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-xs tracking-wider mb-2 text-black/60">EMAIL</div>
                <div className="text-sm">{selectedReader.email}</div>
              </div>
              <div>
                <div className="text-xs tracking-wider mb-2 text-black/60">ТЕЛЕФОН</div>
                <div className="text-sm">{selectedReader.phone}</div>
              </div>
              <div>
                <div className="text-xs tracking-wider mb-2 text-black/60">ЧЛЕН С</div>
                <div className="text-sm">
                  {new Date(selectedReader.memberSince).toLocaleDateString('ru-RU')}
                </div>
              </div>
              <div>
                <div className="text-xs tracking-wider mb-2 text-black/60">СТАТУС</div>
                <div className="text-sm">{selectedReader.status === 'active' ? 'АКТИВЕН' : 'НЕАКТИВЕН'}</div>
              </div>
            </div>

            <div className="border-2 border-black p-6 mb-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl tracking-tighter mb-1">{selectedReader.booksOnHand}</div>
                  <div className="text-xs tracking-wider text-black/60">НА РУКАХ</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl tracking-tighter mb-1">{selectedReader.totalBorrowed}</div>
                  <div className="text-xs tracking-wider text-black/60">ВСЕГО</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl tracking-tighter mb-1">
                    {Math.floor((new Date().getTime() - new Date(selectedReader.memberSince).getTime()) / (1000 * 60 * 60 * 24 / 30))}
                  </div>
                  <div className="text-xs tracking-wider text-black/60">МЕСЯЦЕВ</div>
                </div>
              </div>
            </div>

            <button className="w-full bg-black text-white py-4 hover:bg-black/90 transition-colors tracking-wider">
              РЕДАКТИРОВАТЬ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
