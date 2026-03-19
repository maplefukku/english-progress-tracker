'use client';

import { useState } from 'react';
import { StudyCategory, StudyRecord } from '@/types';

const categories: StudyCategory[] = ['リスニング', 'スピーキング', 'リーディング', 'ライティング', 'その他'];

interface StudyFormProps {
  onAdd: (record: StudyRecord) => void;
}

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function StudyForm({ onAdd }: StudyFormProps) {
  const [date, setDate] = useState(todayString());
  const [minutes, setMinutes] = useState('');
  const [category, setCategory] = useState<StudyCategory>('リスニング');
  const [memo, setMemo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = Number(minutes);
    if (!mins || mins <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      date,
      minutes: mins,
      category,
      memo,
    });

    setMinutes('');
    setMemo('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 space-y-3">
      <h2 className="font-bold text-lg">学習を記録する</h2>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">学習日</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">学習時間（分）</label>
          <input
            type="number"
            min="1"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="30"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">学習内容</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as StudyCategory)}
          className="w-full border rounded px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">メモ（任意）</label>
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="学習の内容やメモ"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
      >
        記録する
      </button>
    </form>
  );
}
