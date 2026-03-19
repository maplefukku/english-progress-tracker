'use client';

import { StudyRecord } from '@/types';

interface StudyListProps {
  records: StudyRecord[];
  onDelete: (id: string) => void;
}

export default function StudyList({ records, onDelete }: StudyListProps) {
  const sorted = [...records].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return 0;
  });

  if (sorted.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-bold text-lg mb-3">学習記録</h2>
        <p className="text-gray-500 text-center py-4">まだ記録がありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-bold text-lg mb-3">学習記録</h2>
      <div className="space-y-2">
        {sorted.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">{record.date}</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">
                  {record.category}
                </span>
                <span className="font-medium">{record.minutes}分</span>
              </div>
              {record.memo && (
                <p className="text-sm text-gray-600 mt-1 truncate">{record.memo}</p>
              )}
            </div>
            <button
              onClick={() => onDelete(record.id)}
              className="ml-2 text-red-500 hover:text-red-700 text-sm shrink-0"
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
