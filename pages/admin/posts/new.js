import AdminLayout from "../../../src/components/layout/AdminLayout";
import { useEffect, useState } from "react";
import { Button, Col, Input, Row, Select } from "antd";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import { toast } from "react-hot-toast";
//import { commands } from "@uiw/react-md-editor";

const { Option } = Select;

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      720,
      400,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const uploadImage = async (file) => {
  console.log("uploadImageData...");
  try {
    const image = await resizeFile(file);
    console.log("Image Base64 => ", image);
    const { data } = await axios.post("/upload-image", { image });
    console.log("Upload file Response => ", data);
    return data.url;
  } catch (err) {
    console.log(err);
  }
};

function NewPost() {
  // load categories from database
  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setLoadedCategories(data);
    } catch (err) {
      console.log(err);
      toast.error("Post create failed. Try again");
    }
  };

  // load from localStorage
  const savedTitle = () => {
    if (typeof window === "object") {
      if (localStorage.getItem("post-title")) {
        return JSON.parse(localStorage.getItem("post-title"));
      }
    }
  };

  const savedContent = () => {
    if (typeof window === "object") {
      if (localStorage.getItem("post-content")) {
        return JSON.parse(localStorage.getItem("post-content"));
      }
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    localStorage.setItem("post-title", JSON.stringify(e.target.value));
  };

  const handleEditorChange = (e) => {
    setContent(e);
    localStorage.setItem("post-content", JSON.stringify(e));
  };

  const handlePublish = async () => {
    try {
      const { data } = await axios.post("/create-post", {
        title,
        content,
        categories,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success("Post created successfully");
        console.log("POST PUBLISHED RES => ", data);
        setTitle("");
        setContent("");
        setCategories([]);
        localStorage.removeItem("post-title");
        localStorage.removeItem("post-content");
      }
    } catch (err) {
      console.log(err);
      toast;
    }
  };

  // state
  const [title, setTitle] = useState(savedTitle());
  const [content, setContent] = useState(savedContent());
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <AdminLayout>
      <Row>
        <Col span={14} offset={1}>
          <h1>Create a new post</h1>
          <Input
            style={{ margin: "10px 0 10px 0" }}
            value={title}
            placeholder="Give your post title"
            size="large"
            onChange={handleChange}
          />

          <MDEditor
            data-color-mode="dark"
            value={content}
            onChange={handleEditorChange}
            height={500}
            preview="edit"
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
          {/* <p>localStorage content = {JSON.stringify(content, null, 4)}</p> */}
        </Col>
        <Col span={6} offset={1}>
          <h1>Categories</h1>
          <Select
            style={{
              margin: "10px 0 10px 0",
              width: "100%",
            }}
            size="large"
            mode="multiple"
            allowClear={true}
            placeholder="Select categories"
            onChange={(e) => setCategories(e)}
          >
            {loadedCategories?.map((item) => (
              <Option key={item.name}>{item.name}</Option>
            ))}
          </Select>
          <Button
            style={{ width: "100%" }}
            type="primary"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </Col>
      </Row>
    </AdminLayout>
  );
}
export default NewPost;
