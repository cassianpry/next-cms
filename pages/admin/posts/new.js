import ReactMde from "react-mde";
import AdminLayout from "../../../src/components/layout/AdminLayout";
import * as Showdown from "showdown";
import { useState } from "react";
import { Col, Input, Row } from "antd";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

function NewPost() {
  // load from localStorage
  const savedTitle = () => {
    if (process.browser) {
      if (localStorage.getItem("post-title")) {
        return JSON.parse(localStorage.getItem("post-title"));
      }
    }
  };

  const savedContent = () => {
    if (process.browser) {
      if (localStorage.getItem("post-content")) {
        return JSON.parse(localStorage.getItem("post-content"));
      }
    }
  };

  const [title, setTitle] = useState(savedTitle());
  const [content, setContent] = useState(savedContent());
  const [selectedTab, setSelectedTab] = useState("write");

  const save = async function* (data) {
    // Promise that waits for "time" milliseconds
    const wait = function (time) {
      return new Promise((a, r) => {
        setTimeout(() => a(), time);
      });
    };

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000);

    // yields the URL that should be inserted in the markdown
    yield "https://picsum.photos/300";
    await wait(2000);

    // returns true meaning that the save was successful
    return true;
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    localStorage.setItem("post-title", JSON.stringify(e.target.value));
  };

  const handleEditorChange = (e) => {
    setContent(e);
    localStorage.setItem("post-content", JSON.stringify(e));
  };

  return (
    <AdminLayout>
      <Row>
        <Col sm={12}>
          <h1>Create a new post</h1>
          <Input
            style={{ margin: "10px 0 10px 0" }}
            value={title}
            placeholder="Give your post title"
            size="large"
            onChange={handleChange}
          />
          <ReactMde
            value={content}
            onChange={handleEditorChange}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
            childProps={{
              writeButton: {
                tabIndex: -1,
              },
            }}
            paste={{
              saveImage: save,
            }}
          />
          <p>{JSON.stringify(content, null, 4)}</p>
        </Col>
      </Row>
    </AdminLayout>
  );
}
export default NewPost;
