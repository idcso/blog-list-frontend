import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  return (
    <div>
      {notification.message && (
        <div className={notification.style}>{notification.message}</div>
      )}
    </div>
  )
}

export default Notification
