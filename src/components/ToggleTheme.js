import { BulbFilled, BulbOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { ThemeContext } from '../context/theme'

const ToggleTheme = () => {
  const [theme, setTheme] = useContext(ThemeContext)
  return (
    <>
      {theme === 'light' ? (
        <BulbFilled
          style={{ fontSize: '20px' }}
          onClick={() => {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
          }}
        />
      ) : (
        <BulbOutlined
          style={{ fontSize: '20px' }}
          onClick={() => {
            setTheme('light')
            localStorage.setItem('theme', 'light')
          }}
        />
      )}
    </>
  )
}

export default ToggleTheme
