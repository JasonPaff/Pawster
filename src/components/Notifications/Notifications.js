import {useEffect, useState} from "react";
import {useSubscription} from "@apollo/react-hooks";
import NotificationDropdown from "./NotificationDropdown";
import {getUserNotifications} from "../../utils/notification_utils";
import {notificationSubscription} from "../../services/notifications/notificationSubscription";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [reloadNotifications, setReloadNotifications] = useState(true);
    const [newNotifications, setNewNotifications] = useState(false);

    useSubscription(notificationSubscription, {
        onSubscriptionData: (res) => {
            const userId = localStorage.getItem('id');
            const notification = res.subscriptionData.data.notificationAdded.notification;
            if (notification.toUserId === userId) {
                setNewNotifications(true);
                setReloadNotifications(true);
            }
        }
    });

    useEffect(() => {
        getUserNotifications(setNotifications).catch((err) => console.log(err))
        setReloadNotifications(false);
    }, [reloadNotifications]);

    return (
        <NotificationDropdown notifications={notifications} setNewNotifications={setNewNotifications}
                              newNotifications={newNotifications} setReloadNotifications={setReloadNotifications}/>
    );
}