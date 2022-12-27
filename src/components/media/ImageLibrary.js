import { Tabs } from 'antd'
import { MediaLibrary } from '../MediaLibrary'
import { UploadFile } from '../UploadFile'

const ImageLibrary = () => {
  return (
    <Tabs
      className="tabs-text"
      defaultActiveKey="1"
      items={[
        {
          label: `Upload Files`,
          key: '1',
          children: <UploadFile />,
        },
        {
          label: `Media Library`,
          key: '2',
          children: <MediaLibrary />,
        },
      ]}
    />
  )
}

export default ImageLibrary
