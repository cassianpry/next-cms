import { Tabs } from 'antd'
import AdminLayout from '../../../src/components/layout/AdminLayout'
import { MediaLibrary } from '../../../src/components/MediaLibrary'
import { UploadFile } from '../../../src/components/UploadFile'

const ImageLibrary = () => {
  return (
    <AdminLayout>
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
    </AdminLayout>
  )
}

export default ImageLibrary
