'use client';

import { StudyRecord } from '@/types';

interface StudyStatsProps {
  records: StudyRecord[];
  goalMinutes: number;
}

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function StudyStats({ records, goalMinutes }: StudyStatsProps) {
  const today = todayString();
  const todayMinutes = records
    .filter((r) => r.date === today)
    .reduce((sum, r) => sum + r.minutes, 0);
  const totalMinutes = records.reduce((sum, r) => sum + r.minutes, 0);
  const goalProgress = Math.min(100, Math.round((todayMinutes / goalMinutes) * 100));

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <h2 className="font-bold text-lg">学習状況</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-600">今日の学習</p>
          <p className="text-2xl font-bold text-blue-600">{todayMinutes}分</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-600">合計学習時間</p>
          <p className="text-2xl font-bold text-green-600">{totalMinutes}分</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>目標達成状況</span>
          <span>{todayMinutes}/{goalMinutes}分 ({goalProgress}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-300"
            style={{
              width: `${goalProgress}%`,
              backgroundColor: goalProgress >= 100 ? '#16a34a' : '#2563eb',
            }}
          />
        </div>
        {goalProgress >= 100 && (
          <p className="text-green-600 text-sm font-medium mt-1">目標達成！</p>
        )}
      </div>
    </div>
  );
}
