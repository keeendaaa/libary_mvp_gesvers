import { useState } from 'react';
import { AsciiDotPattern } from './AsciiDotPattern';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
  isbn: string;
  description: string;
}

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    year: 1967,
    genre: 'Классическая литература',
    available: true,
    totalCopies: 5,
    availableCopies: 2,
    isbn: '978-5-17-123456-7',
    description: 'Знаменитый роман Михаила Булгакова'
  },
  {
    id: '2',
    title: 'Преступление и наказание',
    author: 'Федор Достоевский',
    year: 1866,
    genre: 'Классическая литература',
    available: true,
    totalCopies: 8,
    availableCopies: 3,
    isbn: '978-5-17-234567-8',
    description: 'Социально-психологический роман'
  },
  {
    id: '3',
    title: 'Война и мир',
    author: 'Лев Толстой',
    year: 1869,
    genre: 'Классическая литература',
    available: false,
    totalCopies: 6,
    availableCopies: 0,
    isbn: '978-5-17-345678-9',
    description: 'Роман-эпопея о русском обществе'
  },
  {
    id: '4',
    title: 'Евгений Онегин',
    author: 'Александр Пушкин',
    year: 1833,
    genre: 'Поэзия',
    available: true,
    totalCopies: 4,
    availableCopies: 4,
    isbn: '978-5-17-456789-0',
    description: 'Роман в стихах'
  },
  {
    id: '5',
    title: 'Анна Каренина',
    author: 'Лев Толстой',
    year: 1877,
    genre: 'Классическая литература',
    available: true,
    totalCopies: 5,
    availableCopies: 1,
    isbn: '978-5-17-567890-1',
    description: 'История любви и трагедии'
  },
  {
    id: '6',
    title: 'Тихий Дон',
    author: 'Михаил Шолохов',
    year: 1940,
    genre: 'Исторический роман',
    available: true,
    totalCopies: 3,
    availableCopies: 2,
    isbn: '978-5-17-678901-2',
    description: 'Эпопея о донском казачестве'
  }
];

export function BookCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const genres = ['all', ...Array.from(new Set(mockBooks.map(b => b.genre)))];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <div className="mb-8">
        <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
          КАТАЛОГ / {filteredBooks.length} КНИГ
        </div>
        <h2 className="text-5xl tracking-tight">Библиотечный каталог</h2>
        
        {/* Decorative graphic composition */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex gap-1">
            <div className="w-2 h-8 bg-black"></div>
            <div className="w-2 h-8 bg-black/20"></div>
            <div className="w-2 h-8 bg-black"></div>
          </div>
          <div className="w-16 h-px bg-black"></div>
          <div className="w-8 h-8 border border-black"></div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-xs tracking-wider mb-2 uppercase">Поиск</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Название или автор..."
            className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
          />
        </div>
        <div>
          <label className="block text-xs tracking-wider mb-2 uppercase">Жанр</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
          >
            <option value="all">ВСЕ ЖАНРЫ</option>
            {genres.filter(g => g !== 'all').map(genre => (
              <option key={genre} value={genre}>{genre.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Books List */}
      <div className="space-y-4">
        {filteredBooks.map((book, idx) => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book)}
            className="border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer group"
          >
            <div className="p-6">
              <div className="flex items-start gap-6">
                <div className="text-4xl tracking-tighter opacity-20 group-hover:opacity-40 w-16">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl tracking-tight mb-2">{book.title}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4 opacity-60">
                    <span>{book.author}</span>
                    <span>·</span>
                    <span>{book.year}</span>
                    <span>·</span>
                    <span>{book.genre}</span>
                  </div>
                  <div className="flex items-center gap-6 text-xs tracking-wider">
                    <div>
                      <span className="opacity-60">ISBN:</span> {book.isbn}
                    </div>
                    <div>
                      <span className="opacity-60">КОПИЙ:</span> {book.availableCopies}/{book.totalCopies}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className={`px-4 py-2 border-2 text-xs tracking-wider ${
                    book.available 
                      ? 'border-black group-hover:border-white' 
                      : 'border-black/20 group-hover:border-white/20'
                  }`}>
                    {book.available ? 'В НАЛИЧИИ' : 'НЕТ'}
                  </div>
                  <div className="text-xs tracking-wider opacity-60">
                    ПОДРОБНЕЕ →
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div
          onClick={() => setSelectedBook(null)}
          className="fixed inset-0 bg-white/95 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full border-2 border-black p-8 bg-white relative overflow-hidden"
          >
            {/* ASCII dot pattern in background */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
              <AsciiDotPattern density="medium" gradient width={40} height={40} />
            </div>
            
            <button
              onClick={() => setSelectedBook(null)}
              className="float-right w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center relative z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-8 relative z-10">
              <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
                КНИГА / {selectedBook.id}
              </div>
              <h2 className="text-4xl tracking-tight mb-4">{selectedBook.title}</h2>
              <div className="text-lg mb-2">{selectedBook.author}</div>
              <div className="flex gap-4 text-sm text-black/60">
                <span>{selectedBook.year}</span>
                <span>·</span>
                <span>{selectedBook.genre}</span>
              </div>
            </div>

            <div className="border-t-2 border-black pt-6 mb-6 relative z-10">
              <p className="text-lg leading-relaxed">{selectedBook.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
              <div className="border border-black p-4">
                <div className="text-3xl tracking-tighter mb-1">{selectedBook.availableCopies}</div>
                <div className="text-xs tracking-wider text-black/60">ДОСТУПНО</div>
              </div>
              <div className="border border-black p-4">
                <div className="text-3xl tracking-tighter mb-1">{selectedBook.totalCopies}</div>
                <div className="text-xs tracking-wider text-black/60">ВСЕГО</div>
              </div>
              <div className="border border-black p-4">
                <div className="text-xs tracking-wider mb-1">ISBN</div>
                <div className="font-mono text-sm">{selectedBook.isbn}</div>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              {selectedBook.available ? (
                <button className="flex-1 bg-black text-white py-4 hover:bg-black/90 transition-colors tracking-wider">
                  ЗАБРОНИРОВАТЬ
                </button>
              ) : (
                <button className="flex-1 border-2 border-black/20 text-black/40 py-4 cursor-not-allowed tracking-wider">
                  НЕТ В НАЛИЧИИ
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}