import Link from "next/link";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import { useMyContext } from "@/components/context/userProvider";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { user, setUser } = useMyContext();
  // const [user, setUser] = useState(null);

  // const clickLogin = () => {
  //   if (user === null) {
  //     router.push("/login_yiwei");
  //   }
  // };

  const navigateToProfile = () => {
    router.push("/profile"); // 여기서 "/profile"은 
  };

  const clickLogout = () => {
    signOut();
  };

  // useEffect(() => {
  //   let user = localStorage.getItem("user");
  //   if (user) {
  //     setUser(JSON.parse(user));
  //   }
  // }, []);

  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbarInner"]}>
        <Link href={"/homepage"}>
          <img
            src="/Login-UI/UtexasLogo.png"
            alt="Texas logo"
            className={styles["logo"]}
          />
        </Link>
        <div className={styles["loginWrapper"]}>
          {status === "unauthenticated" && (
            <Link href="/login_jiwon">
              <div className={styles["loginLink"]}>
                <img
                  className={styles["login"]}
                  alt="login icon"
                  src="/homepage-UI/log_in.png"/>
                <p className={styles["loginText"]}>Login</p>
                </div>
            </Link>
          )}

          {status === "authenticated" && session && (
            <div className={styles["loginWrapper"]}>
              <img
                className={styles["login"]}
                alt="profile icon"
                src="/homepage-UI/log_in.png"
              />
              <p className={styles["loginText"]}>{session.user.name}</p>
              <div className={styles["dropdown"]}>
                <Link href="/profile">
                  <button className={styles["dropdown-button"]}>Profile</button>
                </Link>
                <button onClick={clickLogout} className={styles["dropdown-button"]}>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
