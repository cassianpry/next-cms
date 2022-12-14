import { Col, Row, Card, Avatar } from "antd";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";

const { Meta } = Card;

function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Recent blog posts</title>
        <meta description="Blog posts about web develop" />
      </Head>
      <Row style={{ margin: "10px" }}>
        {posts.map((post) => (
          <Col xs={24} xl={8}>
            <div style={{ paddingRight: "15px" }}>
              <Card
                cover={
                  <img
                    className="image-card"
                    alt="example"
                    src={post.featuredImage?.url || "images/Blur.jpg"}
                  />
                }
              >
                <Meta title={post.title} />
              </Card>
            </div>
          </Col>
        ))}
        <Col sm={24} lg={8}>
          <p>SideBar</p>
        </Col>
      </Row>{" "}
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BASE_URL}/posts`);
  return {
    props: {
      posts: data,
    },
  };
}

export default Posts;
