"use client";

import { auth } from "@/lib/FirebaseConfig";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import OrangeButton from "@/components/OrangeButton";

const ChatPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebaseからログアウト
    } catch (error) {
      console.log("ログアウトに失敗しました。");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        router.push("/login");
      } else {
        console.log("ログイン中:", user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, router]);
  return (
    <>
      <h1>チャット画面</h1>
      <OrangeButton onClick={handleLogout} />
    </>
  );
};

export default ChatPage;
