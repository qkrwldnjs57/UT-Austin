import styles from "./username.module.css";
import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { uteid2 } from "./login_jiwon"; //////////////////
import { useMyContext } from "@/components/context/userProvider"; /////////////

export default function Username() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const { user, setUser } = useMyContext(); ////////////////

  useEffect(() => {
    if (router.query.uteid) {
      setUteid(router.query.uteid);
      if (queryUteid) {
        setUteid(queryUteid);
      }
    }
  }, [router, router.isReady]);

  const handleSubmit = async () => {
    console.log("UTEID:", uteid2); /////////////////////
    console.log("User Name:", username);
    if (!uteid2) {
      //////////////////////
      alert("UTEID is missing. Please try again.");
      return;
    }
    try {
      const response = await fetch("/api/user_updating2", {
        // Adjust the endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uteid: uteid2, username: username }), //////////////////
      });

      const data = await response.json();
      console.log('jiwon log added here');

      if (response.ok) {
        console.log("Username updated successfully");
        setUser({ ...user, username: data.username, uteid: uteid2 }); /////////
        router.push("/homepage"); // Redirect to the homepage or other appropriate route
      } else {
        console.error("Failed to update username:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    alert("Please check the form for errors.");
  };

  return (
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            value={username} // The value of the input is controlled by the username state
            onChange={(e) => setUsername(e.target.value)} // Update the state when the input changes
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className={styles.myButton}>
            Finish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
