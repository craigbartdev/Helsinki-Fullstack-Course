const Notification = ({ message, good }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={good ? "notification" : "error"}>
      {message}
    </div>
  )
}

export default Notification