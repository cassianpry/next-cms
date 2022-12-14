import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { MediaContext } from "../context/media";

export const UploadFile = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);

  const props = {
    name: "file",
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setMedia({
          images: [...media.images, info.file.response],
          selected: info.file.response,
          //showMediaModal: false,
        });
        toast.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props} maxCount={1}>
      <Button type="primary" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};
