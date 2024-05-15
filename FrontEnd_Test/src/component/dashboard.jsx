import React from 'react';
import { GetUserData } from './usrDashBoard/getUserData';
import AddUser from './usrDashBoard/addUser';
import Logout from './oldComponent/logout';
import LogoutComponent from './logoutComponent';
import logo from "../pictures/logo.png"
// import UpdateDeleteUser from './usrDashBoard/updateDeleteUser';
import UpdateDeleteUsers from './usrDashBoard/updateDeleteUser';
import TableTest from './table';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const authData = useSelector(state => state.auth);
  const userData = useSelector(state => state.user);
  
  const helloMessage = () => {
    const helloUser = userData.userData.filter(user => user.login_User === authData.user?.name);
    if (helloUser.length > 0) {
        return helloUser[0].nom_User + " " + helloUser[0].prenom_User;
    } else {
      return ""; // or handle the case when user is not found
    }
}

const userRole = () => {
    const helloUser = userData.userData.filter(user => user.login_User === authData.user?.name);
    if (helloUser.length > 0) {
        return helloUser[0].type_User;
    } else {
      return ""; // or handle the case when user is not found
    }
  }
  // const helloMessage = ()=>{
  //   const helloUser = userData.userData.filter(user=>user.login_User == authData.user.name)
  //   return helloUser[0].nom_User + " " + helloUser[0].prenom_User
  // }
  // const userRole= () => {
  //   const helloUser = userData.userData.filter(user=>user.login_User == authData.user.name)
  //   return helloUser[0].type_User 
  // }

return (
  <>
    
    <div class="bg-slate-200 flex h-screen">
  <aside class="fixed z-50 md:relative">
    {/* <!-- Sidebar --> */}
    <input type="checkbox" class="peer hidden" id="sidebar-open" />
    <label class="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden" for="sidebar-open">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </label>
    <nav aria-label="Sidebar Navigation" class="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-700 text-white transition-all md:h-screen md:w-64 lg:w-72">
      <div class="bg-slate-900 mt-5 py-4 px-10 md:mt-10">
        <span class="">
          <img src={logo} />
          {/* <span class="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 align-bottom text-2xl font-bold">U</span> */}
          {/* <span class="text-xl">rbane</span> */}
        </span>
      </div>
      <ul class="mt-8 space-y-3 md:mt-20">
        <li class="relative">
          <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
            <span
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></span
            ><span class="">Test1</span>
          </button>
        </li>
        <li class="relative">
          <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 font-semibold focus:outline-none">
            <span
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg> </span
            ><span class="">Users</span>
          </button>
          <svg class="text-slate-200 absolute -right-1 -top-1/2 z-10 hidden h-32 w-8 md:block" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
            <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
          </svg>
        </li>
        <li class="relative">
          <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
            <span
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></span
            ><span class="">Test3</span>
          </button>
        </li>
        <li class="relative">
          <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
            <span class="text-2xl"
              ><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                <path fill="currentColor" d="M32 15h-1V9a1 1 0 0 0-1-1H6a1 1 0 0 1-1-.82v-.36A1 1 0 0 1 6 6h23.58a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3a3.08 3.08 0 0 0 0 .36v20.57A4.1 4.1 0 0 0 7.13 32H30a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 15H7.13A2.11 2.11 0 0 1 5 27.93V9.88A3.11 3.11 0 0 0 6 10h23v5h-7a5 5 0 0 0 0 10h7Zm2-7h-9a3 3 0 0 1 0-6h9Z" class="clr-i-outline clr-i-outline-path-1" />
                <circle cx="23.01" cy="20" r="1.5" fill="currentColor" class="clr-i-outline clr-i-outline-path-2" />
                <path fill="none" d="M0 0h36v36H0z" /></svg></span><span class="">Test4</span>
          </button>
        </li>
        <li class="relative">
          <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
            <span
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg></span
            ><span class="">Test5</span>
          </button>
        </li>
      </ul>

    </nav>
  </aside>
  {/* <!-- /Sidebar --> */}

  <div class="flex h-full w-full flex-col">
    {/* <!-- Navbar --> */}
    <header class="relative flex flex-col items-center bg-white px-4 py-4 shadow sm:flex-row md:h-20">
      <div class="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
        <ul class="mx-auto mt-4  flex justify-between w-full sm:mx-5 sm:mt-0">

          <li class="">
            <button class="flex h-8 w-20 items-center justify-center rounded-l border text-gray-600 hover:text-black hover:shadow">
                {/* <Logout/> */}
                <LogoutComponent/>
            </button>
          </li>
          <li class="flex">
            <div class="flex h-8 w-60 items-center justify-center rounded-l border text-gray-600 hover:text-black hover:shadow">
                {helloMessage()}
            </div>
            <div class="flex h-8 w-60 items-center justify-center rounded-l border text-gray-600 hover:text-black hover:shadow">
                <p className='px-4'>Role :</p> {userRole()}
            </div>
          </li>
        </ul>
      </div>
    </header>
    {/* <!-- /Navbar --> */}

    {/* <!-- Main --> */}
    <div class="h-full overflow-hidden pl-10">
    <main id="dashboard-main" class="h-[calc(100vh-10rem)] overflow-auto px-4 py-10">
        <p class="text-2xl font-black text-gray-800 py-5">Bonjour <span className='text-4xl px-3'> {helloMessage()}</span></p>
        {/* <p class="mb-6 text-gray-600">Here's an overview of project</p> */}
        <div class="flex flex-wrap gap-x-4 gap-y-8">
            <div class=" w-full rounded-xl bg-white shadow-md">
            {/* {userRole() === 'Super Admin' || userRole() === 'Admin' ? <TableTest/> : null} */}
              <TableTest/>
            </div>
        </div>
    </main>
    </div>
        {/* <!-- /Main --> */}
    </div>
    </div>

  </>
    ) ;
}
 
export default Dashboard;