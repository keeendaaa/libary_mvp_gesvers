interface Recommendation {
  id: string;
  title: string;
  author: string;
  reason: string;
  rating: number;
  category: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Идиот',
    author: 'Федор Достоевский',
    reason: 'На основе прочитанного',
    rating: 4.8,
    category: 'Похожие авторы'
  },
  {
    id: '2',
    title: 'Двенадцать стульев',
    author: 'Ильф и Петров',
    reason: 'Популярно среди читателей',
    rating: 4.9,
    category: 'Популярное'
  },
  {
    id: '3',
    title: 'Доктор Живаго',
    author: 'Борис Пастернак',
    reason: 'Ваши предпочтения',
    rating: 4.7,
    category: 'Подобрано для вас'
  },
  {
    id: '4',
    title: 'Капитанская дочка',
    author: 'Александр Пушкин',
    reason: 'Тот же автор',
    rating: 4.6,
    category: 'Похожие авторы'
  }
];

export function Recommendations() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
          AI / ПЕРСОНАЛИЗАЦИЯ
        </div>
        <h2 className="text-5xl tracking-tight mb-4">Рекомендации</h2>
        <p className="text-lg text-black/60 max-w-2xl">
          Подборка на основе вашей истории чтения и предпочтений
        </p>
        
        {/* Decorative graphic elements */}
        <div className="flex items-center gap-3 mt-6">
          <div className="grid grid-cols-3 gap-1">
            <div className="w-4 h-4 bg-black"></div>
            <div className="w-4 h-4 border border-black"></div>
            <div className="w-4 h-4 bg-black/20"></div>
            <div className="w-4 h-4 border border-black"></div>
            <div className="w-4 h-4 bg-black"></div>
            <div className="w-4 h-4 border border-black"></div>
          </div>
          <div className="w-20 h-px bg-black"></div>
        </div>
      </div>

      {/* User preferences */}
      <div className="grid grid-cols-4 gap-4 mb-12">
        {[
          { label: 'ЖАНР', value: 'Классика' },
          { label: 'АВТОР', value: 'Достоевский' },
          { label: 'ОЦЕНКА', value: '4.6' },
          { label: 'В МЕСЯЦ', value: '5-7' },
        ].map((item, idx) => (
          <div key={idx} className="border-2 border-black p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-6 h-6 border-l border-b border-black/10"></div>
            <div className="text-xs tracking-wider mb-2 text-black/60">{item.label}</div>
            <div className="text-xl tracking-tight">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Recommendations by category */}
      {['Подобрано для вас', 'Похожие авторы', 'Популярное'].map(category => {
        const categoryBooks = mockRecommendations.filter(r => r.category === category);
        if (categoryBooks.length === 0) return null;

        return (
          <div key={category} className="mb-12">
            <div className="flex items-baseline gap-4 mb-6">
              <h3 className="text-2xl tracking-tight">{category}</h3>
              <div className="flex-1 h-px bg-black/10"></div>
              <div className="text-xs tracking-wider text-black/40">
                {categoryBooks.length} КНИГ
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {categoryBooks.map((rec, idx) => (
                <div key={rec.id} className="border-2 border-black p-6 hover:bg-black hover:text-white transition-colors group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl tracking-tighter opacity-20 group-hover:opacity-40">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl tracking-tight mb-2">{rec.title}</h4>
                      <div className="text-sm mb-3 opacity-60">{rec.author}</div>
                      <div className="flex items-center justify-between text-xs tracking-wider">
                        <span className="opacity-60">{rec.reason}</span>
                        <div className="flex items-center gap-2">
                          <span>★</span>
                          <span>{rec.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Algorithm info */}
      <div className="border border-black/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 border border-black flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="text-xs tracking-wider mb-2 text-black/60">АЛГОРИТМ</div>
            <p className="text-sm text-black/80">
              Рекомендации формируются на основе машинного обучения с учетом вашей истории чтения, 
              оценок и предпочтений других читателей с похожими интересами.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}