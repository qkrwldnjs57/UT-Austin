import styles from "./login_jiwon.module.css";
import { useState, useEffect } from "react";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import {signIn} from 'next-auth/react'

export var uteid2 = ""; ////////////////////

export default function Login() {
    const { data: session, status } = useSession();
    const router = useRouter();
    //username and password
    const [uteid, setUsername] = useState("");
    const [password, setPassword] = useState("");

    uteid2 = uteid; ///////////////////////

    if (status === "authenticated") {
        console.log('jiwon log executed');
        router.push("/homepage");
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async () => {
        const login = async () => {
            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ uteid: uteid, password: password }),
                });

                if (response.ok) {

                    const data = await response.json();

                    console.log("Login successful");
                    console.log("UT EID:", uteid);

                    // Redirect based on the message from the server

                    if (data.message === "User exists, redirect to homepage") {
                        setUser({ username: data.username, uteid: uteid }); //////////
                        // JWT 토큰을 받아 로컬 스토리지에 저장하거나 쿠키에 저장합니다.
                        localStorage.setItem('token', data.token);
                        // 사용자 상태를 업데이트하거나 페이지를 리다이렉트합니다.
                        router.push("/homepage"); // Change to your actual homepage route,
                    } else if (
                        data.message ===
                        "User exists, but without username, redirect to create username"
                    ) {
                        router.push("/username2"); // Change to your create username page route
                    } else if (data.message === "New user, redirect to create username") {
                        router.push("/username2"); // Change to your create username page route
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

        login();


    };

    const handleSubmitFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        alert("Please check the form for errors.");
    };


    return (
        <div>
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
            <div className={styles.loginButton}>
                {/* <LoginBtn /> */}
                <button onClick={() => { signIn() }}>Login with Google</button>
            </div>
        </div>
    );
}
