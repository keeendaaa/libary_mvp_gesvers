import { useState } from 'react';
import type { User } from '../App';
import { ReaderManagement } from './ReaderManagement';
import { BookManagement } from './BookManagement';
import { Events } from './Events';
import { StaffDashboard } from './StaffDashboard';

interface StaffViewProps {
  user: User;
}

type Tab = 'dashboard' | 'readers' | 'books' | 'events' | 'settings';

export function StaffView({ user }: StaffViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const tabs = [
    { id: 'dashboard' as Tab, label: 'ПАНЕЛЬ', number: '01' },
    { id: 'readers' as Tab, label: 'ЧИТАТЕЛИ', number: '02' },
    { id: 'books' as Tab, label: 'КНИГИ', number: '03' },
    { id: 'events' as Tab, label: 'СОБЫТИЯ', number: '04' },
    { id: 'settings' as Tab, label: 'НАСТРОЙКИ', number: '05' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="border-2 border-black mb-8">
        <div className="border-b-2 border-black">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 border-r-2 border-black transition-colors whitespace-nowrap last:border-r-0 ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'hover:bg-black/5'
                }`}
              >
                <span className="text-xs opacity-60">{tab.number}</span>
                <span className="tracking-wider text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'dashboard' && <StaffDashboard />}
          {activeTab === 'readers' && <ReaderManagement />}
          {activeTab === 'books' && <BookManagement />}
          {activeTab === 'events' && <Events userRole="staff" />}
          {activeTab === 'settings' && (
            <div>
              <div className="mb-8">
                <div className="inline-block px-3 py-1 border border-black mb-4 text-xs tracking-wider">
                  СИСТЕМА / КОНФИГУРАЦИЯ
                </div>
                <h2 className="text-5xl tracking-tight">Настройки</h2>
              </div>
              <div className="border border-black/20 p-8 text-center">
                <div className="text-black/40 text-sm tracking-wider">РАЗДЕЛ В РАЗРАБОТКЕ</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
