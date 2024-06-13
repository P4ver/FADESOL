import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../component/dashboard";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../store/userSlice";
import Swal from 'sweetalert2';

const PageDashboard = () => {
  const [user, setUser] = useState(null);
  const [typeUser, setTypeUser] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  
  const dispatch = useDispatch();

  const authState = useSelector(state => state.auth);
  const userState = useSelector(state => state.user);

  useEffect(() => {
    if (authState.user) {
      setUser(authState.user);
      dispatch(fetchUserData()); 
    }
  }, [authState, dispatch]);

  useEffect(() => {
    if (user && userState.userData.length > 0) {
      const match = userState.userData.find(usr => usr.login_User === user.username);
      if (match) {
        setTypeUser(match.type_User);
        setStatusValue(match.status);
      }
    }
  }, [user, userState]);

  const checkAccess = () => {
    return typeUser === "Super Admin" || typeUser === "Admin";
  }

  const checkStatus = () => {
    return statusValue === "Active";
  }

  useEffect(() => {
    if (statusValue && statusValue !== "Active") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Votre compte a été désactivé.",
        footer: '<a href="#">contacter l\'administrateur</a>'
      });
    }
  }, [statusValue]);

  return (
    <div>
      {checkStatus() ?  
        <Dashboard />
        :
        null // Since Swal is handling the alert, we don't need to render anything here
      }
    </div>
  );
};

export default PageDashboard;


// import { useDispatch, useSelector } from "react-redux";
// import Dashboard from "../component/dashboard";
// import React, { useEffect, useState } from "react";
// import { fetchUserData } from "../store/userSlice";
// import Swal from 'sweetalert2'
// const PageDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [typeUser, setTypeUser] = useState(null);
//   const [statusValue, setStatusValue] = useState(null)
  
//   const dispatch = useDispatch();

//   const authState = useSelector(state => state.auth);
//   const userState = useSelector(state => state.user);


//   useEffect(() => {
//     if (authState.user) {
//       setUser(authState.user);
//       dispatch(fetchUserData()); 
//     }
//   }, [authState, dispatch]);

//   useEffect(() => {
//     if (user && userState.userData.length > 0) {
//       // const match = userState.userData.find(u => u.id == user.id);
//       const match = userState.userData.find(usr => usr.login_User == user.username);
//       setTypeUser(match.type_User)
//       setStatusValue(match.status)
//     }
//   }, [user, userState]);

//   const checkAccess = ()=>{
//     if (typeUser === "Super Admin") return true
//     else if (typeUser === "Admin") return true
//     else return false
//   }

//   const checkStatus = () =>{
//     if (statusValue === "Active") return true
//     else return false
//   }
//   return (
//     <div>
//       {checkStatus() ?  
//       <Dashboard/>
//       :
//       <>
//         {/* <div className="flex items-center justify-center h-screen bg-red-50">
//           <p className="text-xl font-semibold text-red-500">
//             Votre compte a été inactif.
//           </p>
//         </div> */}

//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Something went wrong!",
//             footer: '<a href="#">Why do I have this issue?</a>'
//           });
//       </>
//       }
//     </div>
//   );
// };

// export default PageDashboard;