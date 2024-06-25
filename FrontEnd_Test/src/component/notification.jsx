import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

const notificationsData = [
  { id: 1, text: "Melissa Maker assigned you as 'Sales Rep' of 'Malibu Nails' on 'Sales CRM'", time: "6h" },
  { id: 2, text: "Leslie Link set a reminder for you to contact 'Casey of Casey Cosmetics' in '1 Week'", time: "10h" },
  { id: 3, text: "Mark Maron assigned you as 'Sales Rep' of 'Clayton Care' on 'Sales CRM'", time: "16h" },
  { id: 4, text: "Sarah Simpson assigned you as 'Sales Rep' of 'Everlane' on 'Sales CRM'", time: "1 day" },
];

const Notification = ({ notifications }) => {
  return (
    <div className="absolute top-16 right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
      <div className="p-4">
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="font-bold text-lg">Your Notifications</span>
          <button className="text-gray-600 hover:text-gray-900">
            <IoClose size={20} />
          </button>
        </div>
        <ul className="mt-4">
          {notifications.map(notification => (
            <li key={notification.id} className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-gray-600">{notification.text}</span>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
