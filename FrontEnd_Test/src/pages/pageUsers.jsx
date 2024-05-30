import React from "react";
import { useSelector } from "react-redux";
import TableTest from '../component/table';

const PageUsers = () => {
  const authState = useSelector(state => state.auth);
  const userData = useSelector(state => state.user);
  const username = authState.user.username;

  const findUser = userData.userData.find(user => user.login_User === username);
  
  if (!findUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-10 border border-gray-300 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
        </div>
      </div>
    );
  }

  const userRole = findUser.type_User;
  console.log("|---findRole--->", userRole);

  return (
    <div>
      {userRole === 'Super Admin' || userRole === 'Admin' ? (
        <TableTest />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-10 border border-gray-300 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold mb-4">You do not have access to this page.</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageUsers;



// import React from "react";
// import { useSelector } from "react-redux";
// import TableTest from '../component/table';

// const PageUsers = () => {
//   const authState = useSelector(state => state.auth);
//   const userData = useSelector(state => state.user);
//   const username = authState.user.username;

//   const findUser = userData.userData.find(user => user.login_User === username);
  
//   if (!findUser) {
//     return <div>User not found</div>;
//   }

//   const userRole = findUser.type_User;
//   console.log("|---findRole--->", userRole);

//   return (
//     <div>
//       {userRole === 'Super Admin' || userRole === 'Admin' ? (
//         <TableTest />
//       ) : (
//         <div>You do not have access to this page.</div>
//       )}
//     </div>
//   );
// };

// export default PageUsers;


