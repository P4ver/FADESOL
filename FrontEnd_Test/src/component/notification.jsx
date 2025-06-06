import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import io from "socket.io-client";
import { API_BASE_URL } from '../apiConfig';

const socket = io(`${API_BASE_URL}`);
// const socket = io("http://15.236.46.59:3000");
const EXPIRATION_DAYS = 7;

const Notification = ({ initialNotifications }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const getNonExpiredNotifications = (notifications) => {
    const now = new Date();
    return notifications.filter(notification => {
      const notificationDate = new Date(notification.time);
      const differenceInTime = now - notificationDate;
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays <= EXPIRATION_DAYS;
    });
  };

  useEffect(() => {
    // Charger les notifications depuis le stockage local s'il y en a
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const nonExpiredNotifications = getNonExpiredNotifications(storedNotifications);
    setNotifications(nonExpiredNotifications);
    localStorage.setItem('notifications', JSON.stringify(nonExpiredNotifications));
  }, []); // This effect runs only once on component mount

  useEffect(() => {
    socket.on('notify-admin', (data) => {
      const currentTime = new Date().toISOString();
      const newNotification = { id: notifications.length + 1, text: data.message, time: currentTime };
      const updatedNotifications = getNonExpiredNotifications([...notifications, newNotification]);
      setNotifications(updatedNotifications);
      // Mettre à jour les notifications dans le stockage local
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    });

    return () => {
      socket.off('notify-admin');
    };
  }, [notifications]); // This effect runs whenever `notifications` changes

  const handleClearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('notifications'); // Supprimer les notifications du stockage local
  };

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Mettre à jour les notifications dans le stockage local
  };

  return (
    <div className="absolute top-16 right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 overflow-y-auto max-h-96">
      <div className="p-4">
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="font-bold text-lg">Your Notifications</span>
          <button className="text-gray-600 hover:text-gray-900" onClick={handleClearNotifications}>
            <IoClose size={20} />
          </button>
        </div>
        <ul className="mt-4">
          {notifications.map(notification => (
            <li key={notification.id} className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-gray-600">{notification.text}</span>
              <span className="text-xs text-gray-500">{new Date(notification.time).toLocaleString()}</span>
              <button className="text-xs text-red-500 ml-2" onClick={() => handleDeleteNotification(notification.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
