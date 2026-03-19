# 英語学習進捗トラッカー (English Progress Tracker)

## 概要
英語学習の進捗を記録・可視化するシンプルなWebアプリ。

## 技術スタック
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- LocalStorage（データ永続化）
- Recharts（グラフ表示）

## 機能要件

### 1. 学習記録の追加
- 学習日（デフォルト: 今日）
- 学習時間（分）
- 学習内容（リスニング、スピーキング、リーディング、ライティング、その他）
- メモ（任意）

### 2. 進捗の可視化
- 直近7日間の学習時間を棒グラフで表示
- 合計学習時間の表示
- 今日の学習時間の表示

### 3. 学習記録の一覧
- 新しい順に表示
- 削除機能

### 4. 目標設定
- 1日の目標学習時間を設定（デフォルト: 30分）
- 今日の目標達成状況を表示

## デザイン
- シンプルでクリーンなUI
- モバイルファースト
- 日本語UI

## ディレクトリ構成
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── StudyForm.tsx
│   ├── StudyChart.tsx
│   ├── StudyStats.tsx
│   └── StudyList.tsx
├── hooks/
│   └── useLocalStorage.ts
└── types/
    └── index.ts
```

## 実装手順
1. Next.jsプロジェクト初期化
2. 型定義作成
3. useLocalStorageフック作成
4. 各コンポーネント実装
5. メインページ統合
6. 動作確認

## 成果物
- 動作するアプリ
- すべての機能が動作すること
