import React, { useEffect, useState } from "react";
import UserTable from '../component/table';
import { useSelector } from "react-redux";

const PageUsers = () => {
  const [user, setUser] = useState(null);
  const [typeUser, setTypeUser] = useState(null);
  const [statusValue, setStatusValue] = useState(null)
  const authState = useSelector(state => state.auth);
  const userState = useSelector(state => state.user);
  useEffect(() => {
    if (authState.user) {
      setUser(authState.user);
    }
  }, [authState]);

  useEffect(() => {
    if (user && userState.userData.length > 0) {
      // const match = userState.userData.find(u => u.id == user.id);
      const match = userState.userData.find(usr => usr.login_User == user.username);
      setTypeUser(match.type_User)
      setStatusValue(match.status)
    }
  }, [user, userState]);

  const checkAccess = ()=>{
    if (typeUser === "Super Admin") return true
    else if (typeUser === "Admin") return true
    else return false
  }

  const checkStatus = () =>{
    if (statusValue === "Active") return true
    else return false
  }

  return (
    <div>
      {checkAccess() && checkStatus() &&
        <UserTable />
      }
    </div>
  );
};

export default PageUsers;
