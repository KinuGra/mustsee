import styles from "./Login.module.css";

const LoginPage = () => {
  return (
    <>
      <div className={styles.card}>
        <h1>ログイン</h1>
        <form>
          <div className={styles.field}>
            <input type="email" placeholder="mail"></input>
          </div>
          <br />
          <div className={styles.field}>
            <input type="password" placeholder="password"></input>
          </div>
          <br />
          <button type="button" className={styles.button}>
            ログイン
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
