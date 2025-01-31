import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.find({ userId });
        return res.status(200).json({ notifications, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const markNotificationAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findById(notificationId);
        if(!notification) {
            return res.status(400).json({ message: "Notification not found" , success: false});
        }
        notification.readStatus = true;
        await notification.save();
        return res.status(200).json({ message: "Notification marked as read" , success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}
