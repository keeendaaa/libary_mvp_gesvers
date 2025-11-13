import { useState } from 'react';
import type { User } from '../App';
import { ReaderCard } from './ReaderCard';
import { BookCatalog } from './BookCatalog';
import { Recommendations } from './Recommendations';
import { Events } from './Events';
import { ReaderProfile } from './ReaderProfile';

interface ReaderViewProps {
  user: User;
}

type Tab = 'card' | 'catalog' | 'recommendations' | 'events' | 'profile';

export function ReaderView({ user }: ReaderViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('card');

  const tabs = [
    { id: 'card' as Tab, label: 'БИЛЕТ', number: '01', shortLabel: 'БИЛЕТ' },
    { id: 'catalog' as Tab, label: 'КАТАЛОГ', number: '02', shortLabel: 'КАТАЛОГ' },
    { id: 'recommendations' as Tab, label: 'РЕКОМЕНДАЦИИ', number: '03', shortLabel: 'РЕКОМЕНД.' },
    { id: 'events' as Tab, label: 'МЕРОПРИЯТИЯ', number: '04', shortLabel: 'СОБЫТИЯ' },
    { id: 'profile' as Tab, label: 'ПРОФИЛЬ', number: '05', shortLabel: 'ПРОФИЛЬ' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="border-2 border-black mb-4 md:mb-8">
        <div className="border-b-2 border-black">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 md:gap-3 px-3 md:px-6 py-3 md:py-4 border-r-2 border-black transition-colors whitespace-nowrap last:border-r-0 min-w-0 flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'hover:bg-black/5'
                }`}
              >
                <span className="text-[10px] md:text-xs opacity-60">{tab.number}</span>
                <span className="tracking-wider text-xs md:text-sm hidden sm:inline">{tab.label}</span>
                <span className="tracking-wider text-xs sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 md:p-8">
          {activeTab === 'card' && <ReaderCard user={user} />}
          {activeTab === 'catalog' && <BookCatalog />}
          {activeTab === 'recommendations' && <Recommendations />}
          {activeTab === 'events' && <Events userRole="reader" />}
          {activeTab === 'profile' && <ReaderProfile user={user} />}
        </div>
      </div>
    </div>
  );
}