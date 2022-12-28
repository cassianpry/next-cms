import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 500,
      }}
    >
      <p>
        <LoadingOutlined style={{ fontSize: '50px' }} />
      </p>
    </div>
  )
}

export default LoadingComponent
