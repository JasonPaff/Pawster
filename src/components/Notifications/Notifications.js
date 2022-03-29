import {useEffect, useState} from "react";
import {useSubscription} from "@apollo/react-hooks";
import NotificationDropdown from "./NotificationDropdown";
import {getUserNotifications} from "../../utils/notification_utils";
import {notificationSubscription} from "../../services/notifications/notificationSubscription";

export default function Notifications() {
    const userId = localStorage.getItem('id');
    const [notifications, setNotifications] = useState([]);
    const [reloadNotifications, setReloadNotifications] = useState(true);

    useSubscription(notificationSubscription, {
        onSubscriptionData: (res) => {
            const notification = res.subscriptionData.data.notificationAdded.notification;
            if (notification.userId === userId) {
                setReloadNotifications(true);
            }
        }
    });

    useEffect(() => {
        getUserNotifications(setNotifications).catch((err) => console.log(err))
        setReloadNotifications(false);
    }, [reloadNotifications])

    return (
        <NotificationDropdown notifications={notifications}/>
    );
}