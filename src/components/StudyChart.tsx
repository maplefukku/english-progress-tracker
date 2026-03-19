'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StudyRecord } from '@/types';

interface StudyChartProps {
  records: StudyRecord[];
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  }
  return days;
}

function formatDateLabel(dateStr: string): string {
  const [, m, d] = dateStr.split('-');
  return `${Number(m)}/${Number(d)}`;
}

export default function StudyChart({ records }: StudyChartProps) {
  const days = getLast7Days();
  const data = days.map((date) => {
    const minutes = records
      .filter((r) => r.date === date)
      .reduce((sum, r) => sum + r.minutes, 0);
    return { date: formatDateLabel(date), minutes };
  });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-bold text-lg mb-3">直近7日間の学習時間</h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis fontSize={12} unit="分" />
            <Tooltip formatter={(value) => [`${value}分`, '学習時間']} />
            <Bar dataKey="minutes" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
