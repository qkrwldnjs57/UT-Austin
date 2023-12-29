import styles from "./login_yiwei.module.css";
import { useState, useEffect } from "react";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useMyContext } from "@/components/context/userProvider"; /////////////

export var uteid2 = ""; ////////////////////

export default function Login() {
  const router = useRouter();
  //username and password
  const { user, setUser } = useMyContext(); //////////
  const [uteid, setUsername] = useState("");
  const [password, setPassword] = useState("");
  uteid2 = uteid; ///////////////////////

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("UT EID:", uteid);
    console.log("Password:", password);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uteid: uteid, password: password }),
      });

      const data = await response.json(); ///////

      if (response.ok) {
        console.log("Login successful");
        console.log("UT EID:", uteid);
        // Redirect based on the message from the server

        if (data.message === "User exists, redirect to homepage") {
          setUser({ username: data.username, uteid: uteid }); //////////
          router.push("/homepage"); // Change to your actual homepage route,
        } else if (
          data.message ===
          "User exists, but without username, redirect to create username"
        ) {
          router.push("/username"); // Change to your create username page route
        } else if (data.message === "New user, redirect to create username") {
          router.push("/username"); // Change to your create username page route
        }
      } else if (response.status === 401) {
        alert(
          "Oops! It looks like the password you entered is incorrect. Please try again"
        );
      } else {
        console.error("Login failed: ", data.message); // Log the error message from the server
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    alert("Please check the form for errors.");
  };
  /*const onFinish = (values) => {
    console.log("Success:", values);
    window.alert(values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  }; */

  const topBarStyle = {
    /*
    background: "#C2570C", // Orange color for the top bar
    // width: "1800px", // Set the width to 1440 pixels
    height: "92px", // Set the height to 92 pixels
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px", // Add padding as needed
    /* Add other styles as needed */
  };

  //write an arrary here

  return (
    <div>
      {/* Top Orange Bar */}
      <div style={topBarStyle}>
        {/* You can style the top bar as needed */}
        {/* Add content for the top bar here */}
      </div>

      {/* <img
        src="/Login-UI/UtexasLogo.png"
        alt="Login Image"
        className={styles.UtexasLogo}
      /> */}

      <div className={`${styles.container} ${styles.whiteBackground}`}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          onFinishFailed={handleSubmitFailed}
          autoComplete="off"
        >
          <Form.Item
            label="UT EID"
            name="uteid"
            rules={[
              {
                required: true,
                message: "Please input your UT EID!",
              },
            ]}
          >
            <Input onChange={handleUsernameChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          {/* Display the entered username */}
          {/*<p>Entered UTEID: {uteid}</p>
          <p>Entered Password: {password}</p>*/}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className={styles.myButton}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
