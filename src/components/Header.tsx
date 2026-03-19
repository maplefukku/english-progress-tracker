'use client';

interface HeaderProps {
  goalMinutes: number;
  onGoalChange: (minutes: number) => void;
}

export default function Header({ goalMinutes, onGoalChange }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">英語学習トラッカー</h1>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="goal">目標:</label>
          <input
            id="goal"
            type="number"
            min="1"
            value={goalMinutes}
            onChange={(e) => onGoalChange(Math.max(1, Number(e.target.value)))}
            className="w-16 px-2 py-1 rounded text-gray-900 text-center"
          />
          <span>分/日</span>
        </div>
      </div>
    </header>
  );
}
