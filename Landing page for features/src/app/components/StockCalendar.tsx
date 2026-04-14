import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Calendar as CalendarIcon, FileText, Building2 } from 'lucide-react';

type EventCategory = 'corporate' | 'market' | 'financial' | 'listing';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  category: EventCategory;
  company?: string;
  description: string;
}

export function StockCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>(['corporate', 'market', 'financial', 'listing']);

  const categories = [
    {
      id: 'corporate' as EventCategory,
      name: 'Aksi Korporasi',
      description: 'Jadwal dividen, right issue, stock split, dan aksi penting lainnya.',
      icon: TrendingUp,
      color: '#F97316'
    },
    {
      id: 'market' as EventCategory,
      name: 'Jadwal Bursa',
      description: 'Hari perdagangan dan hari libur pasar saham Indonesia.',
      icon: CalendarIcon,
      color: '#3B82F6'
    },
    {
      id: 'financial' as EventCategory,
      name: 'Laporan Keuangan',
      description: 'Jadwal rilis laporan keuangan dan laporan tahunan perusahaan.',
      icon: FileText,
      color: '#10B981'
    },
    {
      id: 'listing' as EventCategory,
      name: 'Pencatatan Saham',
      description: 'IPO, delisting, relisting, dan aktivitas pencatatan saham lainnya',
      icon: Building2,
      color: '#8B5CF6'
    }
  ];

  // Sample events data
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Dividen BBCA',
      date: new Date(2026, 3, 15),
      category: 'corporate',
      company: 'BBCA',
      description: 'Pembagian dividen Rp 500/saham'
    },
    {
      id: '2',
      title: 'Libur Bursa - Idul Fitri',
      date: new Date(2026, 3, 20),
      category: 'market',
      description: 'Bursa tutup untuk perayaan Idul Fitri'
    },
    {
      id: '3',
      title: 'Laporan Q1 2026 - BBRI',
      date: new Date(2026, 3, 25),
      category: 'financial',
      company: 'BBRI',
      description: 'Rilis laporan keuangan kuartal pertama 2026'
    },
    {
      id: '4',
      title: 'IPO PT Digital Nusantara',
      date: new Date(2026, 3, 18),
      category: 'listing',
      company: 'DIGI',
      description: 'Pencatatan perdana saham PT Digital Nusantara Tbk'
    },
    {
      id: '5',
      title: 'Stock Split TLKM',
      date: new Date(2026, 3, 22),
      category: 'corporate',
      company: 'TLKM',
      description: 'Pemecahan saham dengan rasio 1:5'
    },
    {
      id: '6',
      title: 'Right Issue ASII',
      date: new Date(2026, 3, 28),
      category: 'corporate',
      company: 'ASII',
      description: 'Periode pelaksanaan right issue'
    },
    {
      id: '7',
      title: 'Laporan Tahunan UNVR',
      date: new Date(2026, 3, 30),
      category: 'financial',
      company: 'UNVR',
      description: 'Publikasi laporan tahunan 2025'
    },
    {
      id: '8',
      title: 'Dividen HMSP',
      date: new Date(2026, 3, 10),
      category: 'corporate',
      company: 'HMSP',
      description: 'Pembagian dividen interim'
    }
  ];

  const toggleCategory = (categoryId: EventCategory) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        selectedCategories.includes(event.category)
      );
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const getCategoryColor = (categoryId: EventCategory) => {
    return categories.find(c => c.id === categoryId)?.color || '#F97316';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-[36px] font-bold text-[#2A2826] mb-2">Kalender Saham</h1>
          <p className="text-[16px] text-[#8A8682]">
            Pantau jadwal penting pasar modal Indonesia dalam satu kalender
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] sticky top-24">
              <h2 className="text-[18px] font-bold text-[#2A2826] mb-4">Kategori Event</h2>
              <div className="space-y-3">
                {categories.map(category => {
                  const Icon = category.icon;
                  const isSelected = selectedCategories.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-[#F97316] bg-[rgba(249,115,22,0.05)]'
                          : 'border-[#E5E7EB] bg-white hover:border-[#FDBA74]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${category.color}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: category.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[14px] font-bold text-[#2A2826] mb-1">
                            {category.name}
                          </h3>
                          <p className="text-[12px] text-[#8A8682] leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] font-bold text-[#2A2826]">{monthName}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="w-10 h-10 rounded-lg border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F8F9FA] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#8A8682]" />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="w-10 h-10 rounded-lg border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F8F9FA] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[#8A8682]" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day names */}
                {dayNames.map(day => (
                  <div
                    key={day}
                    className="text-center py-2 text-[12px] font-bold text-[#8A8682]"
                  >
                    {day}
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const date = new Date(year, month, day);
                  const dayEvents = getEventsForDate(date);
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={day}
                      className={`aspect-square border rounded-lg p-2 ${
                        isToday
                          ? 'border-[#F97316] bg-[rgba(249,115,22,0.05)]'
                          : 'border-[#E5E7EB]'
                      }`}
                    >
                      <div className="h-full flex flex-col">
                        <div
                          className={`text-[14px] font-bold mb-1 ${
                            isToday ? 'text-[#F97316]' : 'text-[#2A2826]'
                          }`}
                        >
                          {day}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          {dayEvents.slice(0, 3).map(event => (
                            <div
                              key={event.id}
                              className="text-[10px] px-1.5 py-0.5 rounded mb-1 truncate"
                              style={{
                                backgroundColor: `${getCategoryColor(event.category)}15`,
                                color: getCategoryColor(event.category)
                              }}
                              title={`${event.title} - ${event.description}`}
                            >
                              {event.company || event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-[9px] text-[#8A8682] px-1">
                              +{dayEvents.length - 3} lainnya
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                <h3 className="text-[14px] font-bold text-[#2A2826] mb-3">Legenda</h3>
                <div className="flex flex-wrap gap-4">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-[12px] text-[#8A8682]">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="mt-6 bg-white rounded-2xl p-6 border border-[#E5E7EB]">
              <h2 className="text-[20px] font-bold text-[#2A2826] mb-4">Event Mendatang</h2>
              <div className="space-y-3">
                {events
                  .filter(event => selectedCategories.includes(event.category))
                  .filter(event => event.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map(event => {
                    const category = categories.find(c => c.id === event.category);
                    const Icon = category?.icon || CalendarIcon;
                    return (
                      <div
                        key={event.id}
                        className="flex items-start gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#F97316] transition-colors"
                      >
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${category?.color}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: category?.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-[16px] font-bold text-[#2A2826]">
                              {event.title}
                            </h3>
                            <span className="text-[12px] text-[#8A8682] whitespace-nowrap">
                              {event.date.toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </span>
                          </div>
                          <p className="text-[14px] text-[#8A8682]">{event.description}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
