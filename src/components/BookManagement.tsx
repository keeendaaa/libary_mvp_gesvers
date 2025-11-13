import { useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  year: number;
  genre: string;
  publisher: string;
  totalCopies: number;
  availableCopies: number;
  borrowedCopies: number;
  status: 'available' | 'low' | 'out';
}

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    isbn: '978-5-17-123456-7',
    year: 1967,
    genre: 'Классическая литература',
    publisher: 'АСТ',
    totalCopies: 5,
    availableCopies: 2,
    borrowedCopies: 3,
    status: 'available'
  },
  {
    id: '2',
    title: 'Преступление и наказание',
    author: 'Федор Достоевский',
    isbn: '978-5-17-234567-8',
    year: 1866,
    genre: 'Классическая литература',
    publisher: 'Эксмо',
    totalCopies: 8,
    availableCopies: 3,
    borrowedCopies: 5,
    status: 'available'
  },
  {
    id: '3',
    title: 'Война и мир',
    author: 'Лев Толстой',
    isbn: '978-5-17-345678-9',
    year: 1869,
    genre: 'Классическая литература',
    publisher: 'АСТ',
    totalCopies: 6,
    availableCopies: 0,
    borrowedCopies: 6,
    status: 'out'
  },
  {
    id: '4',
    title: 'Евгений Онегин',
    author: 'Александр Пушкин',
    isbn: '978-5-17-456789-0',
    year: 1833,
    genre: 'Поэзия',
    publisher: 'Азбука',
    totalCopies: 4,
    availableCopies: 4,
    borrowedCopies: 0,
    status: 'available'
  },
  {
    id: '5',
    title: 'Анна Каренина',
    author: 'Лев Толстой',
    isbn: '978-5-17-567890-1',
    year: 1877,
    genre: 'Классическая литература',
    publisher: 'Эксмо',
    totalCopies: 5,
    availableCopies: 1,
    borrowedCopies: 4,
    status: 'low'
  }
];

export function BookManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const genres = ['all', ...Array.from(new Set(mockBooks.map(b => b.genre)))];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
            УПРАВЛЕНИЕ / {mockBooks.length} НАЗВАНИЙ
          </div>
          <h2 className="text-5xl tracking-tight">Книжный фонд</h2>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors tracking-wider text-sm whitespace-nowrap"
        >
          + ДОБАВИТЬ
        </button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по названию, автору или ISBN..."
          className="px-4 py-3 border-2 border-black focus:outline-none bg-white"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-3 border-2 border-black focus:outline-none bg-white"
        >
          <option value="all">ВСЕ ЖАНРЫ</option>
          {genres.filter(g => g !== 'all').map(genre => (
            <option key={genre} value={genre}>{genre.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="border border-black p-4">
          <div className="text-3xl tracking-tighter mb-1">{mockBooks.length}</div>
          <div className="text-xs tracking-wider text-black/60">НАЗВАНИЙ</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-3xl tracking-tighter mb-1">
            {mockBooks.reduce((sum, b) => sum + b.totalCopies, 0)}
          </div>
          <div className="text-xs tracking-wider text-black/60">ЭКЗЕМПЛЯРОВ</div>
        </div>
        <div className="border border-black p-4">
          <div className="text-3xl tracking-tighter mb-1">
            {mockBooks.reduce((sum, b) => sum + b.availableCopies, 0)}
          </div>
          <div className="text-xs tracking-wider text-black/60">ДОСТУПНО</div>
        </div>
        <div className="border border-black p-4 bg-black text-white">
          <div className="text-3xl tracking-tighter mb-1">
            {mockBooks.reduce((sum, b) => sum + b.borrowedCopies, 0)}
          </div>
          <div className="text-xs tracking-wider text-white/60">НА РУКАХ</div>
        </div>
      </div>

      {/* Books Table */}
      <div className="border-2 border-black">
        <div className="grid grid-cols-12 gap-4 p-4 border-b-2 border-black bg-black/5">
          <div className="col-span-4 text-xs tracking-wider">КНИГА</div>
          <div className="col-span-2 text-xs tracking-wider">ISBN</div>
          <div className="col-span-2 text-xs tracking-wider">ЖАНР</div>
          <div className="col-span-3 text-xs tracking-wider">ЭКЗЕМПЛЯРЫ</div>
          <div className="col-span-1 text-xs tracking-wider text-right">ДЕЙСТВИЯ</div>
        </div>

        {filteredBooks.map((book, idx) => (
          <div key={book.id} className="grid grid-cols-12 gap-4 p-4 border-b border-black last:border-0 hover:bg-black/5 transition-colors">
            <div className="col-span-4 flex items-center gap-3">
              <div className="text-sm opacity-40">{String(idx + 1).padStart(2, '0')}</div>
              <div>
                <div className="text-sm mb-1">{book.title}</div>
                <div className="text-xs text-black/60">{book.author} · {book.year}</div>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="font-mono text-xs">{book.isbn}</div>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="text-xs text-black/60">{book.genre}</div>
            </div>

            <div className="col-span-3 flex items-center">
              <div className="flex items-center gap-3 text-xs">
                <div className="text-center">
                  <div className="mb-1 text-black/40 tracking-wider">ВСЕГО</div>
                  <div className="text-sm">{book.totalCopies}</div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-black/40 tracking-wider">ДОСТУП</div>
                  <div className="text-sm">{book.availableCopies}</div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-black/40 tracking-wider">ВЫДАНО</div>
                  <div className="text-sm">{book.borrowedCopies}</div>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex items-center justify-end gap-2">
              <button className="w-8 h-8 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 bg-white/95 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full border-2 border-black p-8 bg-white max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="float-right w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-8">
              <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
                НОВАЯ / КНИГА
              </div>
              <h2 className="text-4xl tracking-tight">Добавить книгу</h2>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs tracking-wider mb-2 uppercase">Название</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                    placeholder="Название книги"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">Автор</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                    placeholder="Имя автора"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">ISBN</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                    placeholder="978-5-17-123456-7"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">Год</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">Издательство</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                    placeholder="Название"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">Жанр</label>
                  <select className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white">
                    <option>КЛАССИКА</option>
                    <option>ПОЭЗИЯ</option>
                    <option>ИСТОРИЧЕСКИЙ</option>
                    <option>СОВРЕМЕННАЯ ПРОЗА</option>
                    <option>ДЕТСКАЯ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">Экземпляров</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                    placeholder="5"
                    min="1"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs tracking-wider mb-2 uppercase">Описание</label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                    rows={3}
                    placeholder="Краткое описание"
                  />
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-full bg-black text-white py-4 hover:bg-black/90 transition-colors tracking-wider"
                >
                  ДОБАВИТЬ КНИГУ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
