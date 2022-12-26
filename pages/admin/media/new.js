import { Col, Row } from 'antd'
import React from 'react'
import AdminLayout from '../../../src/components/layout/AdminLayout'
import { UploadFile } from '../../../src/components/UploadFile'

const NewMedia = () => {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <div style={{ padding: 100, textAlign: 'center' }}>
            <UploadFile />
          </div>
        </Col>
      </Row>
    </AdminLayout>
  )
}

export default NewMedia
