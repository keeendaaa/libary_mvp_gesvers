import { useState } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  category: string;
  registered?: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Встреча с писателем А.И. Сидоровым',
    description: 'Автор современной прозы расскажет о своем творческом пути',
    date: '2025-11-20',
    time: '18:00',
    location: 'Конференц-зал, 2 этаж',
    maxParticipants: 50,
    currentParticipants: 32,
    category: 'Встреча',
    registered: true
  },
  {
    id: '2',
    title: 'Книжный клуб: обсуждение "Мастер и Маргарита"',
    description: 'Дискуссия о романе Михаила Булгакова',
    date: '2025-11-22',
    time: '19:00',
    location: 'Читальный зал',
    maxParticipants: 20,
    currentParticipants: 15,
    category: 'Клуб',
    registered: false
  },
  {
    id: '3',
    title: 'Мастер-класс по скорочтению',
    description: 'Практические упражнения для увеличения скорости чтения',
    date: '2025-11-25',
    time: '17:00',
    location: 'Учебная комната',
    maxParticipants: 15,
    currentParticipants: 8,
    category: 'МК',
    registered: false
  },
  {
    id: '4',
    title: 'Детская литературная гостиная',
    description: 'Чтение сказок и творческие мастер-классы для детей 6-10 лет',
    date: '2025-11-27',
    time: '15:00',
    location: 'Детская зона',
    maxParticipants: 25,
    currentParticipants: 18,
    category: 'Детское',
    registered: true
  }
];

interface EventsProps {
  userRole: 'reader' | 'staff';
}

export function Events({ userRole }: EventsProps) {
  const [events, setEvents] = useState(mockEvents);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleRegister = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, registered: !event.registered, currentParticipants: event.registered ? event.currentParticipants - 1 : event.currentParticipants + 1 }
        : event
    ));
  };

  const registeredCount = events.filter(e => e.registered).length;

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
            МЕРОПРИЯТИЯ / {events.length} СОБЫТИЙ
          </div>
          <h2 className="text-5xl tracking-tight">События и встречи</h2>
        </div>
        {userRole === 'staff' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors tracking-wider text-sm whitespace-nowrap"
          >
            + ДОБАВИТЬ
          </button>
        )}
      </div>

      {userRole === 'reader' && registeredCount > 0 && (
        <div className="border-2 border-black p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="text-4xl tracking-tighter">{registeredCount}</div>
            <div>
              <div className="text-xs tracking-wider text-black/60">ЗАПИСАНЫ</div>
              <div className="text-sm">Вы зарегистрированы на мероприятия</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {events.map((event, idx) => {
          const spotsLeft = event.maxParticipants - event.currentParticipants;
          const isFull = spotsLeft <= 0;
          const percentage = (event.currentParticipants / event.maxParticipants) * 100;

          return (
            <div key={event.id} className="border-2 border-black">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  <div className="text-4xl tracking-tighter opacity-20 w-16">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl tracking-tight">{event.title}</h3>
                          {event.registered && userRole === 'reader' && (
                            <span className="px-3 py-1 bg-black text-white text-xs tracking-wider">
                              ЗАПИСАН
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-black/60 max-w-2xl">{event.description}</p>
                      </div>
                      <div className="px-3 py-1 border border-black text-xs tracking-wider whitespace-nowrap">
                        {event.category}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 mb-4 text-sm">
                      <div>
                        <div className="text-xs tracking-wider mb-1 text-black/60">ДАТА</div>
                        <div>{new Date(event.date).toLocaleDateString('ru-RU')}</div>
                      </div>
                      <div>
                        <div className="text-xs tracking-wider mb-1 text-black/60">ВРЕМЯ</div>
                        <div>{event.time}</div>
                      </div>
                      <div>
                        <div className="text-xs tracking-wider mb-1 text-black/60">МЕСТО</div>
                        <div>{event.location}</div>
                      </div>
                      <div>
                        <div className="text-xs tracking-wider mb-1 text-black/60">УЧАСТНИКИ</div>
                        <div>{event.currentParticipants}/{event.maxParticipants}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-black/10">
                        <div 
                          className="h-full bg-black transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      {userRole === 'reader' ? (
                        <button
                          onClick={() => handleRegister(event.id)}
                          disabled={isFull && !event.registered}
                          className={`px-6 py-2 border-2 transition-colors tracking-wider text-sm whitespace-nowrap ${
                            event.registered
                              ? 'border-black bg-black text-white hover:bg-white hover:text-black'
                              : isFull
                              ? 'border-black/20 text-black/20 cursor-not-allowed'
                              : 'border-black hover:bg-black hover:text-white'
                          }`}
                        >
                          {event.registered ? 'ОТМЕНИТЬ' : isFull ? 'НЕТ МЕСТ' : 'ЗАПИСАТЬСЯ'}
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button className="w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Event Modal */}
      {showAddModal && userRole === 'staff' && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 bg-white/95 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full border-2 border-black p-8 bg-white"
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="float-right w-10 h-10 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
                НОВОЕ / СОБЫТИЕ
              </div>
              <h2 className="text-4xl tracking-tight">Создать мероприятие</h2>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-xs tracking-wider mb-2 uppercase">Название</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                  placeholder="Название мероприятия"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wider mb-2 uppercase">Описание</label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                  rows={3}
                  placeholder="Описание мероприятия"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">Дата</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">Время</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-wider mb-2 uppercase">Место</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                  placeholder="Место проведения"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">Категория</label>
                  <select className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white">
                    <option>ВСТРЕЧА</option>
                    <option>КЛУБ</option>
                    <option>МК</option>
                    <option>ДЕТСКОЕ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-2 uppercase">Макс. участников</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-white"
                    placeholder="50"
                  />
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-full bg-black text-white py-4 hover:bg-black/90 transition-colors tracking-wider"
                >
                  СОЗДАТЬ МЕРОПРИЯТИЕ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
