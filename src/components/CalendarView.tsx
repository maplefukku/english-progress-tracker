'use client';

import { useState, useMemo } from 'react';
import { StudyRecord } from '@/types';

interface CalendarViewProps {
  records: StudyRecord[];
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getIntensityClass(minutes: number): string {
  if (minutes === 0) return 'bg-gray-50';
  if (minutes < 15) return 'bg-green-100';
  if (minutes < 30) return 'bg-green-200';
  if (minutes < 60) return 'bg-green-400 text-white';
  return 'bg-green-600 text-white';
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export default function CalendarView({ records }: CalendarViewProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const minutesByDate = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of records) {
      map[r.date] = (map[r.date] || 0) + r.minutes;
    }
    return map;
  }, [records]);

  const selectedRecords = useMemo(() => {
    if (!selectedDate) return [];
    return records.filter((r) => r.date === selectedDate);
  }, [records, selectedDate]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const goToPrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
    setSelectedDate(null);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPrevMonth}
          className="px-3 py-1 rounded hover:bg-gray-100 text-lg font-bold"
          aria-label="前月"
        >
          ‹
        </button>
        <h2 className="font-bold text-lg">
          {year}年{month + 1}月
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-3 py-1 rounded hover:bg-gray-100 text-lg font-bold"
          aria-label="次月"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {WEEKDAYS.map((w) => (
          <div key={w} className="font-medium text-gray-500 py-1">
            {w}
          </div>
        ))}

        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} />;
          }
          const dateStr = formatDate(year, month, day);
          const minutes = minutesByDate[dateStr] || 0;
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr === selectedDate ? null : dateStr)}
              className={`
                aspect-square flex items-center justify-center rounded-md text-sm transition-colors
                ${getIntensityClass(minutes)}
                ${isToday ? 'ring-2 ring-blue-500' : ''}
                ${isSelected ? 'ring-2 ring-orange-400' : ''}
                hover:opacity-80
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span>少</span>
        <div className="w-4 h-4 rounded bg-gray-50 border border-gray-200" />
        <div className="w-4 h-4 rounded bg-green-100" />
        <div className="w-4 h-4 rounded bg-green-200" />
        <div className="w-4 h-4 rounded bg-green-400" />
        <div className="w-4 h-4 rounded bg-green-600" />
        <span>多</span>
      </div>

      {selectedDate && (
        <div className="mt-4 border-t pt-3">
          <h3 className="font-bold text-sm mb-2">
            {selectedDate.replace(/(\d{4})-(\d{2})-(\d{2})/, (_, y, m, d) => `${Number(y)}年${Number(m)}月${Number(d)}日`)}
            の記録
          </h3>
          {selectedRecords.length === 0 ? (
            <p className="text-sm text-gray-400">記録がありません</p>
          ) : (
            <ul className="space-y-1">
              {selectedRecords.map((r) => (
                <li key={r.id} className="text-sm flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                    {r.category}
                  </span>
                  <span className="font-medium">{r.minutes}分</span>
                  {r.memo && <span className="text-gray-500">- {r.memo}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
