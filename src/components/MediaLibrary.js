import { DeleteFilled, InboxOutlined } from '@ant-design/icons'
import { Badge, Image, Upload } from 'antd'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../context/auth'
import { MediaContext } from '../context/media'

const { Dragger } = Upload

export const MediaLibrary = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext)
  const [media, setMedia] = useContext(MediaContext)
  //state
  const [showPreview, setShowPreview] = useState(false)
  const [imageList, setImageList] = useState([])

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get('/media')
        setMedia((prev) => ({ ...prev, images: data }))
      } catch (err) {
        console.log(err)
      }
    }
    fetchMedia()
  }, [])

  const props = {
    name: 'file',
    multiple: true,
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log('UPLOADING => ', info.file, info.fileList)
      }
      if (status === 'done') {
        setMedia({
          images: [...media.images, info.file.response],
          selected: info.file.response,
          showMediaModal: true,
        })
        toast.success(`${info.file.name} file uploaded successfully.`)
        if (Array.isArray(info)) {
          return info
        }
        if (info.fileList.length >= 1) {
          info.fileList.shift()
        }
        return info && info.fileList
      } else if (status === 'error') {
        toast.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  const handleImageDelete = async (imageId) => {
    try {
      const { data } = axios.delete(`/media/${imageId}`)
      if (data?.error) {
        toast.error(data.error)
      } else {
        setMedia({
          ...media,
          images: media.images.filter((image) => image._id !== imageId),
          selected: null,
        })
        toast.success('Image deleted successfully')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
      <div>
        {media?.images?.map((images) => (
          <Badge key={images._id}>
            <div className="media-image-card">
              <div className="media-library-div">
                <Image
                  className="media-image"
                  src={images.url}
                  preview={showPreview}
                  onClick={() => setMedia({ ...media, selected: images })}
                />
              </div>
              <DeleteFilled
                className="media-image-delete-icon"
                onClick={() => handleImageDelete(images._id)}
              />
            </div>
          </Badge>
        ))}
      </div>
    </div>
  )
}
