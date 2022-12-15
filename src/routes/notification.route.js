const express = require("express");
const router = express.Router();
const {
  createNotificationValidation,
} = require("../utils/validation/notification.validation");
const NotificationController = require("../controllers/notification.controller");
const { authentication } = require("../middlewares/authentication.middleware");

// get all user notifications
router.get("/all", authentication, NotificationController.getUserNotifications);

// create new user notification
router.post(
  "/",
  authentication,
  createNotificationValidation,
  NotificationController.createNotification
);

// Update a Notification's status = read
router.put("/:id", authentication, NotificationController.readNotification);

// Mark as Read all user Notifications
router.post(
  "/all/read",
  authentication,
  NotificationController.readAllNotification
);

// Delete all read User Notifications
router.delete(
  "/all/read",
  authentication,
  NotificationController.deleteReadNotification
);

module.exports = router;
