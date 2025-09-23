"use client";

import { auth } from "@/lib/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styles from "./Register.module.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ユーザーが登録ボタンを押した際に実行される
  const doRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      alert("登録完了");
      console.log(user);
    } catch (error) {
      console.error("登録失敗:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>新規登録</h1>
      <form>
        <label>
          mail:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={doRegister}>
          登録
        </button>
      </form>
    </div>
  );
}
