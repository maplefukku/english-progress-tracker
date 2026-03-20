'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { StudyRecord } from '@/types';
import Header from '@/components/Header';
import StudyForm from '@/components/StudyForm';
import StudyStats from '@/components/StudyStats';
import StudyChart from '@/components/StudyChart';
import StudyList from '@/components/StudyList';
import CalendarView from '@/components/CalendarView';

export default function Home() {
  const [records, setRecords] = useLocalStorage<StudyRecord[]>('study-records', []);
  const [goalMinutes, setGoalMinutes] = useLocalStorage<number>('goal-minutes', 30);
  const [activeTab, setActiveTab] = useState<'chart' | 'calendar'>('chart');

  const addRecord = (record: StudyRecord) => {
    setRecords((prev) => [...prev, record]);
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      <Header goalMinutes={goalMinutes} onGoalChange={setGoalMinutes} />
      <main className="max-w-2xl mx-auto p-4 space-y-4 pb-8">
        <StudyStats records={records} goalMinutes={goalMinutes} />
        <div>
          <div className="flex gap-1 mb-2">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === 'chart'
                  ? 'bg-white shadow text-blue-600'
                  : 'bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              グラフ
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === 'calendar'
                  ? 'bg-white shadow text-blue-600'
                  : 'bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              カレンダー
            </button>
          </div>
          {activeTab === 'chart' ? (
            <StudyChart records={records} />
          ) : (
            <CalendarView records={records} />
          )}
        </div>
        <StudyForm onAdd={addRecord} />
        <StudyList records={records} onDelete={deleteRecord} />
      </main>
    </>
  );
}
