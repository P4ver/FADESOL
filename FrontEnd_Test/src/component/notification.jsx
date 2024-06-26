// import React, { useState } from 'react';
// import { IoClose } from "react-icons/io5";

// const notificationsData = [
//   { id: 1, text: "Melissa Maker assigned you as 'Sales Rep' of 'Malibu Nails' on 'Sales CRM'", time: "6h" },
//   { id: 2, text: "Leslie Link set a reminder for you to contact 'Casey of Casey Cosmetics' in '1 Week'", time: "10h" },
//   { id: 3, text: "Mark Maron assigned you as 'Sales Rep' of 'Clayton Care' on 'Sales CRM'", time: "16h" },
//   { id: 4, text: "Sarah Simpson assigned you as 'Sales Rep' of 'Everlane' on 'Sales CRM'", time: "1 day" },
// ];

// const Notification = ({ notifications }) => {
//   return (
//     <div className="absolute top-16 right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
//       <div className="p-4">
//         <div className="flex justify-between items-center pb-2 border-b">
//           <span className="font-bold text-lg">Your Notifications</span>
//           <button className="text-gray-600 hover:text-gray-900">
//             <IoClose size={20} />
//           </button>
//         </div>
//         <ul className="mt-4">
//           {notifications.map(notification => (
//             <li key={notification.id} className="flex justify-between items-center py-2 border-b">
//               <span className="text-sm text-gray-600">{notification.text}</span>
//               <span className="text-xs text-gray-500">{notification.time}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Notification;


//works good with date

// import React, { useState, useEffect } from 'react';
// import { IoClose } from "react-icons/io5";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000");

// const Notification = ({ initialNotifications }) => {
//   const [notifications, setNotifications] = useState(initialNotifications);

//   useEffect(() => {
//     socket.on('notify-admin', (data) => {
//       const currentTime = new Date().toLocaleString(); // Obtenir l'heure actuelle sous forme de chaîne formatée
//       setNotifications(prevNotifications => [
//         ...prevNotifications,
//         { id: prevNotifications.length + 1, text: data.message, time: currentTime }
//       ]);
//     });

//     return () => {
//       socket.off('notify-admin');
//     };
//   }, []);

//   return (
//     <div className="absolute top-16 right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
//       <div className="p-4">
//         <div className="flex justify-between items-center pb-2 border-b">
//           <span className="font-bold text-lg">Your Notifications</span>
//           <button className="text-gray-600 hover:text-gray-900">
//             <IoClose size={20} />
//           </button>
//         </div>
//         <ul className="mt-4">
//           {notifications.map(notification => (
//             <li key={notification.id} className="flex justify-between items-center py-2 border-b">
//               <span className="text-sm text-gray-600">{notification.text}</span>
//               <span className="text-xs text-gray-500">{notification.time}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Notification;


//hade works good ms still hadak probleme dyl console

// import React, { useState, useEffect } from 'react';
// import { IoClose } from "react-icons/io5";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000");

// const Notification = ({ initialNotifications }) => {
//   const [notifications, setNotifications] = useState(initialNotifications);

//   useEffect(() => {
//     // Charger les notifications depuis le stockage local s'il y en a
//     const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
//     setNotifications(storedNotifications);

//     socket.on('notify-admin', (data) => {
//       const currentTime = new Date().toLocaleString();
//       const newNotification = { id: notifications.length + 1, text: data.message, time: currentTime };
//       const updatedNotifications = [...notifications, newNotification];
//       setNotifications(updatedNotifications);
//       // Mettre à jour les notifications dans le stockage local
//       localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
//     });

//     return () => {
//       socket.off('notify-admin');
//     };
//   }, [notifications]); // Déclencher l'effet lorsque les notifications changent

//   const handleClearNotifications = () => {
//     setNotifications([]);
//     localStorage.removeItem('notifications'); // Supprimer les notifications du stockage local
//   };

//   const handleDeleteNotification = (id) => {
//     const updatedNotifications = notifications.filter(notification => notification.id !== id);
//     setNotifications(updatedNotifications);
//     localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Mettre à jour les notifications dans le stockage local
//   };

//   return (
//     <div className="absolute top-16 right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 overflow-y-auto max-h-96">
//       <div className="p-4">
//         <div className="flex justify-between items-center pb-2 border-b">
//           <span className="font-bold text-lg">Your Notifications</span>
//           <button className="text-gray-600 hover:text-gray-900" onClick={handleClearNotifications}>
//             <IoClose size={20} />
//           </button>
//         </div>
//         <ul className="mt-4">
//           {notifications.map(notification => (
//             <li key={notification.id} className="flex justify-between items-center py-2 border-b">
//               <span className="text-sm text-gray-600">{notification.text}</span>
//               <span className="text-xs text-gray-500">{notification.time}</span>
//               <button className="text-xs text-red-500 ml-2" onClick={() => handleDeleteNotification(notification.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Notification;
//try to fix this good it fix any expiration until  clearing browser 

// import React, { useState, useEffect } from 'react';
// import { IoClose } from "react-icons/io5";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000");

// const Notification = ({ initialNotifications }) => {
//   const [notifications, setNotifications] = useState(initialNotifications);

//   useEffect(() => {
//     // Charger les notifications depuis le stockage local s'il y en a
//     const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
//     setNotifications(storedNotifications);
//   }, []); // This effect runs only once on component mount

//   useEffect(() => {
//     socket.on('notify-admin', (data) => {
//       const currentTime = new Date().toLocaleString();
//       const newNotification = { id: notifications.length + 1, text: data.message, time: currentTime };
//       const updatedNotifications = [...notifications, newNotification];
//       setNotifications(updatedNotifications);
//       // Mettre à jour les notifications dans le stockage local
//       localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
//     });

//     return () => {
//       socket.off('notify-admin');
//     };
//   }, [notifications]); // This effect runs whenever `notifications` changes

//   const handleClearNotifications = () => {
//     setNotifications([]);
//     localStorage.removeItem('notifications'); // Supprimer les notifications du stockage local
//   };

//   const handleDeleteNotification = (id) => {
//     const updatedNotifications = notifications.filter(notification => notification.id !== id);
//     setNotifications(updatedNotifications);
//     localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Mettre à jour les notifications dans le stockage local
//   };

//   return (
//     <div className="absolute top-16 right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 overflow-y-auto max-h-96">
//       <div className="p-4">
//         <div className="flex justify-between items-center pb-2 border-b">
//           <span className="font-bold text-lg">Your Notifications</span>
//           <button className="text-gray-600 hover:text-gray-900" onClick={handleClearNotifications}>
//             <IoClose size={20} />
//           </button>
//         </div>
//         <ul className="mt-4">
//           {notifications.map(notification => (
//             <li key={notification.id} className="flex justify-between items-center py-2 border-b">
//               <span className="text-sm text-gray-600">{notification.text}</span>
//               <span className="text-xs text-gray-500">{notification.time}</span>
//               <button className="text-xs text-red-500 ml-2" onClick={() => handleDeleteNotification(notification.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Notification;
//remove notifications older than a specified number of days (let's say 7 days):

import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import io from "socket.io-client";

const socket = io("http://localhost:3000");
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

//on verra db mazal kaymchi daqshi

// import React, { useState, useEffect } from 'react';
// import { IoClose } from "react-icons/io5";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000");

// const Notification = ({ initialNotifications }) => {
//   const [notifications, setNotifications] = useState(initialNotifications);

//   useEffect(() => {
//     // Charger les notifications depuis le stockage local s'il y en a
//     const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
//     setNotifications(storedNotifications);

//     // Écouter les événements 'notify-admin' de Socket.io
//     socket.on('notify-admin', (data) => {
//       const currentTime = new Date().toLocaleString();
//       const newNotification = { id: generateUniqueId(), text: data.message, time: currentTime };
//       setNotifications(prevNotifications => [...prevNotifications, newNotification]);

//       // Mettre à jour les notifications dans le stockage local
//       localStorage.setItem('notifications', JSON.stringify([...prevNotifications, newNotification]));
//     });

//     return () => {
//       socket.off('notify-admin'); // Nettoyer l'écouteur d'événement à la déconnexion du composant
//     };
//   }, []); // Utiliser une dépendance vide pour exécuter l'effet une seule fois au montage initial

//   const generateUniqueId = () => {
//     // Générer un ID unique pour la nouvelle notification
//     return '_' + Math.random().toString(36).substr(2, 9);
//   };

//   const handleClearNotifications = () => {
//     setNotifications([]);
//     localStorage.removeItem('notifications'); // Supprimer les notifications du stockage local
//   };

//   const handleDeleteNotification = (id) => {
//     const updatedNotifications = notifications.filter(notification => notification.id !== id);
//     setNotifications(updatedNotifications);
//     localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Mettre à jour les notifications dans le stockage local
//   };

//   return (
//     <div className="absolute top-16 right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 overflow-y-auto max-h-96">
//       <div className="p-4">
//         <div className="flex justify-between items-center pb-2 border-b">
//           <span className="font-bold text-lg">Your Notifications</span>
//           <button className="text-gray-600 hover:text-gray-900" onClick={handleClearNotifications}>
//             <IoClose size={20} />
//           </button>
//         </div>
//         <ul className="mt-4">
//           {notifications.map(notification => (
//             <li key={notification.id} className="flex justify-between items-center py-2 border-b">
//               <span className="text-sm text-gray-600">{notification.text}</span>
//               <span className="text-xs text-gray-500">{notification.time}</span>
//               <button className="text-xs text-red-500 ml-2" onClick={() => handleDeleteNotification(notification.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Notification;


//
