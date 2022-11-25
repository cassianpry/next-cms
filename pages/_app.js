import { Layout } from "antd";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";
import { AuthProvider } from "../context/auth";
import "../styles/global.css";

const { Footer } = Layout;

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavBar />
      <Toaster />
      <Component {...pageProps} />
      <Footer
        style={{
          textAlign: "center",
          position: "fixed",
          width: "100%",
          bottom: 0,
          backgroundColor: "rgb(36, 39, 46)",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        ©2022 Cassiano Marinello - This site is made for learning proposal
      </Footer>
    </AuthProvider>
  );
}

export default MyApp;
