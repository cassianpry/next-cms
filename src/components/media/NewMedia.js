import { Col, Row } from 'antd'
import React from 'react'
import { UploadFile } from '../UploadFile'

const NewMedia = () => {
  return (
    <Row>
      <Col span={24}>
        <div style={{ padding: 100, textAlign: 'center' }}>
          <UploadFile />
        </div>
      </Col>
    </Row>
  )
}

export default NewMedia
