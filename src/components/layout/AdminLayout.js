import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import AdminNav from "../nav/AdminNav";

const { Content } = Layout;

export default function AdminLayout({ children }) {
  // state
  const [loading, setLoading] = useState(true);
  // context
  const [auth, setAuth] = useContext(AuthContext);

  // router
  const router = useRouter();

  useEffect(() => {
    // if (auth?.user?.role !== "Admin") {
    //   window.location.href = "/";
    //   router.push("/");
    // } else {
    //   setLoading(false);
    //}
    if (auth?.token) getCurrentUser();
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-admin");
      setLoading(false);
      //console.log(data);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  return (
    <Layout theme="dark">
      {loading ? (
        <></>
      ) : (
        <>
          <AdminNav />
          <Layout theme="dark">
            <Content
              style={{ backgroundColor: "rgb(30, 30, 30)", padding: "10px" }}
            >
              {children}
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  );
}
