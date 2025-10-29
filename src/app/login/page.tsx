"use client";

import { auth } from "@/lib/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const doSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/chat");
      })
      .catch((error) => {
        console.error("ログイン失敗:", error);
      });
  };

  return (
    <>
      <div className={styles.card}>
        <h1>ログイン</h1>
        <form>
          <div className={styles.field}>
            <input
              type="email"
              placeholder="mail"
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </div>
          <br />
          <div className={styles.field}>
            <input
              type="password"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
          <br />
          <button type="button" className={styles.button} onClick={doSignIn}>
            ログイン
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
