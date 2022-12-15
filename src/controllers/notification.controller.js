const NotificationService = require("../services/notification.service");

module.exports = {
  // create new notification user
  createNotification: async (req, res) => {
    try {
      const notificationServiceResponse =
        await NotificationService.createNotification(req);
      return res
        .status(notificationServiceResponse.code)
        .json(notificationServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },

  // get all user notifications
  getUserNotifications: async (req, res) => {
    try {
      const notificationServiceResponse =
        await NotificationService.getUserNotifications(req);
      return res
        .status(notificationServiceResponse.code)
        .json(notificationServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },

  // Update a Notification's status = read
  readNotification: async (req, res) => {
    try {
      const notificationServiceResponse =
        await NotificationService.readNotification(req);
      return res
        .status(notificationServiceResponse.code)
        .json(notificationServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },

  // Mark all user Notifications as Read
  readAllNotification: async (req, res) => {
    try {
      const notificationServiceResponse =
        await NotificationService.readAllNotifications(req);
      return res
        .status(notificationServiceResponse.code)
        .json(notificationServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },

  // Delete all read User Notifications
  deleteReadNotification: async (req, res) => {
    try {
      const notificationServiceResponse =
        await NotificationService.deleteReadNotification(req);
      return res
        .status(notificationServiceResponse.code)
        .json(notificationServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
};
