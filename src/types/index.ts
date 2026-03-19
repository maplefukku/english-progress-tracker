export type StudyCategory = 'リスニング' | 'スピーキング' | 'リーディング' | 'ライティング' | 'その他';

export interface StudyRecord {
  id: string;
  date: string; // YYYY-MM-DD
  minutes: number;
  category: StudyCategory;
  memo: string;
}

export interface DailyGoal {
  minutes: number;
}
