import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  fetchNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead
} from "../api/notifications";
import { websocketUrl } from "../api/client";

const NotificationsContext = createContext(null);

function sortNotifications(notifications) {
  return [...notifications].sort(
    (left, right) => new Date(right.timestamp) - new Date(left.timestamp)
  );
}

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  useEffect(() => {
    let isMounted = true;

    async function loadNotifications() {
      try {
        const data = await fetchNotifications();
        if (isMounted) {
          setNotifications(sortNotifications(data));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(websocketUrl),
      reconnectDelay: 5000,
      debug: () => {}
    });

    client.onConnect = () => {
      setConnectionStatus("connected");
      client.subscribe("/topic/notifications", (message) => {
        const notification = JSON.parse(message.body);
        setNotifications((current) => {
          const deduped = current.filter((item) => item.id !== notification.id);
          return sortNotifications([notification, ...deduped]);
        });
      });
    };

    client.onStompError = () => {
      setConnectionStatus("error");
    };

    client.onWebSocketClose = () => {
      setConnectionStatus("disconnected");
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.readStatus).length,
    [notifications]
  );

  async function refreshNotifications() {
    const data = await fetchNotifications();
    setNotifications(sortNotifications(data));
  }

  async function markAsRead(notificationId) {
    const updated = await markNotificationAsRead(notificationId);
    setNotifications((current) =>
      sortNotifications(
        current.map((notification) =>
          notification.id === notificationId ? updated : notification
        )
      )
    );
  }

  async function markAllAsRead() {
    await markAllNotificationsAsRead();
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        readStatus: true
      }))
    );
  }

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      isLoading,
      connectionStatus,
      refreshNotifications,
      markAsRead,
      markAllAsRead
    }),
    [notifications, unreadCount, isLoading, connectionStatus]
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotificationsContext() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error("useNotificationsContext must be used within NotificationsProvider");
  }

  return context;
}
