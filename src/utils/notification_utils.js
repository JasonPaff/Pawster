import getNotifications from "../services/notifications/getNotifications";

export const getUserNotifications = async (setNotifications) => {
    const notificationData = await getNotifications();
    const notifications = notificationData.data.getNotifications;

    if (notifications.success)
        setNotifications(notifications.notifications);
    else
        setNotifications([{
            id: -1,
            message: "no notifications",
            link: "none",
        }]);
}