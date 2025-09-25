import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Firestoreはログインやユーザー登録の実装には使わないが、今後のことを考えて入れておく
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// .envファイルで設定した環境変数をfirebaseConfigに入れる
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

// Firebase アプリを一度だけ初期化
const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 各サービスを取得
const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);

// Analytics はブラウザ環境でのみ有効
if (typeof window !== "undefined") {
  getAnalytics(app);
}

export { app, auth, firestore };
