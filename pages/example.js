import App from "./_app";
import { Button, Space, Input } from "antd";
import styles from "./example.module.css";
import { useReducer, useRef, useState } from "react";

const Example = () => {
  // const password = useRef();
  const [sex, setSex] = useState();
  // let password = null;
  const click = () => {
    window.alert(sex);
  };
  return (
    <>
      <div className={"example"}></div>
      {/* <div className={styles.ex}></div> */}

      <div className={styles.flexbox}>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div> <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div> <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
      </div>
      <div className={styles.login}>login page</div>
      <div className={styles.form}>
        <Input
          // ref={sex}
          onChange={(e) => {
            setSex(e.target.value);
          }}
          placeholder="Basic usage"
        />
        <Button className={styles.myButton} onClick={click}>
          button color
        </Button>
        <Button className={styles.myButton}>button color</Button>
      </div>
      <img src="/ut.png" />
    </>
  );
};

export default Example;
