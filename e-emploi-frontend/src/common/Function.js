export const notify = (title, message, type) => {
    setShowNotification(true);
    setNotification({
      title: title,
      message: message,
      type: type,
    });
    setTimeout(() => setShowNotification(false), 2000);
  };