"use client";

import { auth, db } from "@/lib/FirebaseConfig";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrangeButton from "@/components/OrangeButton";
import {
  onChildAdded,
  ref,
  push,
  set,
  off,
  DataSnapshot,
} from "firebase/database";

const ChatPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<
    {
      uid: string;
      name: string;
      text: string;
      timestamp: number;
    }[]
  >([]);
  const [text, setText] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebaseからログアウト
    } catch (error) {
      console.log("ログアウトに失敗しました:", error);
    }
  };

  // 認証状態を監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  // メッセージの受信
  useEffect(() => {
    const messagesRef = ref(db, "messages");

    const handleChildAdded = (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      setMessages((prev) => [...prev, data]);
    };

    // 監視開始
    onChildAdded(messagesRef, handleChildAdded);

    return () => {
      off(messagesRef, "child_added", handleChildAdded);
    };
  }, []);

  // メッセージ送信
  const sendMessage = async () => {
    if (!user || text.trim() === "") return;

    const messagesRef = ref(db, "messages");
    const newMessageRef = push(messagesRef);

    await set(newMessageRef, {
      uid: user.uid,
      name: user.displayName || "名無し",
      text: text.trim(),
      timestamp: Date.now(),
    });

    setText("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1>チャット</h1>
      <OrangeButton onClick={handleLogout} />

      {messages.map((msg, index) => (
        <div key={index}>
          <b>{msg.name}</b>: {msg.text}
        </div>
      ))}

      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="メッセージを入力"
        />
        <button onClick={sendMessage}>送信</button>
      </div>
    </>
  );
};

export default ChatPage;
