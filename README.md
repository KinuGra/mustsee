# プロジェクト作成
```
npx create-next-app@latest
※aliasでYes
pnpm install prettier --save-dev
pnpm install --save-dev eslint-config-prettier eslint-plugin-prettier

コマンド設定
pnpm lint → ESLint だけ実行
pnpm format → Prettier だけ実行
pnpm check → ESLint + Prettier のチェック
pnpm fix → ESLint の autofix + Prettier 整形をまとめて実行

Firebase
pnpm i firebase
```

最初の方のコミットでeslint, prettier, CIの設定をしているのでここにメモしておく
