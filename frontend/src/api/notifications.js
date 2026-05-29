import { apiClient } from "./client";

export async function fetchNotifications() {
  const response = await apiClient.get("/notifications");
  return response.data;
}

export async function fetchUnreadCount() {
  const response = await apiClient.get("/notifications/unread-count");
  return response.data.unreadCount;
}

export async function markNotificationAsRead(notificationId) {
  const response = await apiClient.patch(`/notifications/${notificationId}/read`);
  return response.data;
}

export async function markAllNotificationsAsRead() {
  await apiClient.patch("/notifications/read-all");
}
