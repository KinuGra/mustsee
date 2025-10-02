import styles from "./Login.module.css";

const LoginPage = () => {
  return (
    <>
      <div>
        <form className={styles.card}>
          <div>
            <input
              className={styles.field}
              type="email"
              placeholder="mail"
            ></input>
          </div>
          <div>
            <input
              className={styles.field}
              type="password"
              placeholder="password"
            ></input>
          </div>
          <div className={styles.button}>
            <button type="button">ログイン</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
