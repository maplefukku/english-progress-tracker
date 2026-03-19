'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { StudyRecord } from '@/types';
import Header from '@/components/Header';
import StudyForm from '@/components/StudyForm';
import StudyStats from '@/components/StudyStats';
import StudyChart from '@/components/StudyChart';
import StudyList from '@/components/StudyList';

export default function Home() {
  const [records, setRecords] = useLocalStorage<StudyRecord[]>('study-records', []);
  const [goalMinutes, setGoalMinutes] = useLocalStorage<number>('goal-minutes', 30);

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
        <StudyChart records={records} />
        <StudyForm onAdd={addRecord} />
        <StudyList records={records} onDelete={deleteRecord} />
      </main>
    </>
  );
}
