import AdminLayout from "../../../src/components/layout/AdminLayout";
import { useEffect, useMemo, useState } from "react";
import { Col, Input, Row, Select } from "antd";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const { Option } = Select;

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
    return;
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

  // state
  const [title, setTitle] = useState(savedTitle());
  const [content, setContent] = useState(savedContent());
  const [selectedTab, setSelectedTab] = useState("write");
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const editorOptions = useMemo(() => {
    return {
      hideIcons: ["fullscreen", "side-by-side"],
      spellChecker: false,
    };
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
          <SimpleMDE
            value={content}
            onChange={handleEditorChange}
            options={editorOptions}
          />
          <p>{JSON.stringify(content, null, 4)}</p>
        </Col>
        <Col span={6} offset={1}>
          <h4>Categories</h4>
          <Select
            style={{ width: "100%", color: "red" }}
            mode="multiple"
            allowClear={true}
            placeholder="Select categories"
            onChange={(e) => setCategories(e)}
          >
            {loadedCategories?.map((item) => (
              <Option key={item.name}>{item.name}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    </AdminLayout>
  );
}
export default NewPost;
