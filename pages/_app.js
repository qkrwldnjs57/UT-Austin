import "@/styles/globals.css";
import Navbar from "@/components/common/navbar";
import { MyContextProvider } from "@/components/context/userProvider";
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <MyContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </MyContextProvider>
    </SessionProvider>
  );
}

