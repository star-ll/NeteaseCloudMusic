import { useRef } from "react";
import styles from "./login.module.css";
import { loginByPhone } from "../../../api/user/login.js";

export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  async function submit() {
    console.log(usernameRef.current.value);
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await loginByPhone(username, password);

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className={" flex items-center justify-center"}
      style={{ width: "100%", height: "100vh" }}
    >
      <div
        className={styles["card"] + " shadow "}
        style={{ width: "80%", height: "300px" }}
      >
        <h2>Login</h2>
        <div>
          <label>账号</label>
          <input placeholder="请输入账号" ref={usernameRef} />
        </div>
        <div>
          <label>密码</label>
          <input placeholder="请输入密码" ref={passwordRef} />
        </div>
        <div className={styles["bottom-btns"]}>
          <button className={styles.btn} onClick={submit}>
            提交
          </button>
          <button className={styles.btn}>注册</button>
        </div>
      </div>
    </div>
  );
}
