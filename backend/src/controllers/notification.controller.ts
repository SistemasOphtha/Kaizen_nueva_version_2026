import Notification from '../models/Notification';

const getNotifications = async (req: any, res: any) => {
    try {
        const third = await Notification.findAll({
            where: {
                read: false
            }
        });
        res.json(third);
    } catch (error) {
        console.error(error);
    }
}

const markNotificationsAsRead = async (req: any, res: any) => {
    try {
        const third = await Notification.update({
            read: true
        }, {
            where: {
                read: false
            }
        });
        res.json(third);
    } catch (error) {
        console.error(error);
    }
}

const markNotificationIdAsRead = async (req: any, res: any) => {
    try {
        const third = await Notification.update({
            read: true
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json(third);
    } catch (error) {
        console.error(error);
    }
}

export {
  getNotifications,
    markNotificationsAsRead,
    markNotificationIdAsRead
};
