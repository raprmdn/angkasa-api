const { User, Notification } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const {
  isNotificationUserIdExist,
} = require("../utils/validation/notification.validation");
const moment = require("moment");
const notification = require("../models/notification");
const { Op } = require("sequelize");

module.exports = {
  // create new notification user
  createNotification: async (req) => {
    try {
      const { id: userId } = req.user;
      const { title, body, type } = req.body;

      await isNotificationUserIdExist(req);

      const newNotification = await Notification.create({
        userId,
        title,
        body,
        type,
        seenAt: null,
      });

      return apiResponse(
        status.CREATED,
        "CREATED",
        "Success to created a new Notification",
        {
          notification: newNotification,
        }
      );
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  // get all user notifications
  getUserNotifications: async (req) => {
    try {
      const { id: userId } = req.user;

      await isNotificationUserIdExist(req);

      const { notifications } = await User.findByPk(userId, {
        include: "notifications",
        order: [["notifications", "createdAt", "DESC"]],
      });

      return apiResponse(status.OK, "OK", "Success to get all Notification", {
        notifications,
      });
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  // Update a Notification's status = read
  readNotification: async (req) => {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;

      await isNotificationUserIdExist(req);

      const notification = await Notification.findByPk(id, {
        where: {
          userId,
        },
      });

      if (!notification) {
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "Notification not found"
        );
      }

      await notification.update({
        seenAt: moment.now(),
      });

      return apiResponse(
        status.OK,
        "OK",
        "Success to updated notification read status"
      );
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  // Mark all user Notifications as Read
  readAllNotifications: async (req) => {
    try {
      const { id: userId } = req.user;

      await isNotificationUserIdExist(req);

      const notifications = await Notification.findAll({
        where: {
          userId,
          seenAt: null,
        },
      });

      if (!notifications || notifications.length == 0)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "unread notification not found",
          []
        );

      await notifications.forEach(async (notification) => {
        await notification.update({
          seenAt: moment.now(),
        });
      });

      return apiResponse(
        status.OK,
        "OK",
        "Success to mark all Notifications as Read"
      );
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  // Delete all read User Notifications
  deleteReadNotification: async (req) => {
    try {
      const { id: userId } = req.user;

      await isNotificationUserIdExist(req);
      console.log("notifications");

      const notifications = await Notification.findAll({
        where: {
          userId,
          seenAt: {
            [Op.ne]: null,
          },
        },
      });

      if (!notifications || notifications.length == 0)
        throw apiResponse(
          status.NOT_FOUND,
          "NOT_FOUND",
          "unread notification not found",
          []
        );

      await notifications.forEach(async (notification) => {
        await notification.destroy();
      });
      return apiResponse(
        status.OK,
        "OK",
        "Success to delete read Notifications"
      );
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
};
