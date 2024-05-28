// import React from 'react';
// import Logout from './oldComponent/logout';
// import LogoutComponent from './logoutComponent';
// import logo from "../pictures/logo.png"
// // import UpdateDeleteUser from './usrDashBoard/updateDeleteUser';
// import UpdateDeleteUsers from './usrDashBoard/updateDeleteUser';
// import TableTest from './table';
// import { useSelector } from 'react-redux';

// const Dashboard = () => {
//   const authReducer = useSelector(state => state.auth);
//   const authData = useSelector(state => state.auth);
//   const userData = useSelector(state => state.user);
//   const helloMessage = () => {
//     const helloUser = userData.userData.filter(user => user.login_User === authData.user?.name);
//     if (helloUser.length > 0) {
//         return helloUser[0].nom_User + " " + helloUser[0].prenom_User;
//     } else {
//       return ""; // or handle the case when user is not found
//     }
//   }
//   // const getUserName = () => {
//   //   if (authReducer.isAuthenticated && authReducer.user) {
//   //     return authReducer.user;
//   //   } else {
//   //     return "Guest";
//   //   }
//   // }
//   // console.log("Logged-in user:", getUserName());

// console.log("=====authDAta======", authReducer.user)
// // console.log("=====authDAta======", dispatch(loginSuccess(userData)))
  
// const userRole = () => {
//     const helloUser = userData.userData.filter(user => user.login_User === authData.user?.name);
//     if (helloUser.length > 0) {
//         return helloUser[0].type_User;
//     } else {
//       return ""; // or handle the case when user is not found
//     }
//   }

// return (
//   <>
    
//     <div class="bg-slate-200 flex h-screen">
//   <aside class="fixed z-50 md:relative">
//     {/* <!-- Sidebar --> */}
//     <input type="checkbox" class="peer hidden" id="sidebar-open" />
//     <label class="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden" for="sidebar-open">
//       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//         <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//       </svg>
//     </label>
//     <nav aria-label="Sidebar Navigation" class="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-700 text-white transition-all md:h-screen md:w-64 lg:w-72">
//       <div class="bg-slate-900 mt-5 py-4 px-10 md:mt-10">
//         <div class=" w-36">
//           <img src={logo} />
//         </div>
//       </div>
//       <ul class="mt-8 space-y-3 md:mt-20">
//         <li class="relative">
//           <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
//             <span
//               ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></span
//             ><span class="">Test1</span>
//           </button>
//         </li>
//         <li class="relative">
//           <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 font-semibold focus:outline-none">
//             <span
//               ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//               </svg> </span
//             ><span class="">Users</span>
//           </button>
//           <svg class="text-slate-200 absolute -right-1 -top-1/2 z-10 hidden h-32 w-8 md:block" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
//             <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
//           </svg>
//         </li>
//         <li class="relative">
//           <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
//             <span
//               ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></span
//             ><span class="">Test3</span>
//           </button>
//         </li>
//         <li class="relative">
//           <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
//             <span class="text-2xl"
//               ><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
//                 <path fill="currentColor" d="M32 15h-1V9a1 1 0 0 0-1-1H6a1 1 0 0 1-1-.82v-.36A1 1 0 0 1 6 6h23.58a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3a3.08 3.08 0 0 0 0 .36v20.57A4.1 4.1 0 0 0 7.13 32H30a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 15H7.13A2.11 2.11 0 0 1 5 27.93V9.88A3.11 3.11 0 0 0 6 10h23v5h-7a5 5 0 0 0 0 10h7Zm2-7h-9a3 3 0 0 1 0-6h9Z" class="clr-i-outline clr-i-outline-path-1" />
//                 <circle cx="23.01" cy="20" r="1.5" fill="currentColor" class="clr-i-outline clr-i-outline-path-2" />
//                 <path fill="none" d="M0 0h36v36H0z" /></svg></span><span class="">Test4</span>
//           </button>
//         </li>
//         <li class="relative">
//           <button class="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
//             <span
//               ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg></span
//             ><span class="">Test5</span>
//           </button>
//         </li>
//       </ul>

//     </nav>
//   </aside>
//   {/* <!-- /Sidebar --> */}

//   <div class="flex h-full w-full flex-col">
//     {/* <!-- Navbar --> */}
//     <header class="relative flex flex-col items-center bg-white px-4 py-4 shadow sm:flex-row md:h-20">
//       <div class="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
//         <ul class="mx-auto mt-4  flex justify-between items-center w-full sm:mx-5 sm:mt-0">

//           <li class="w-32">
//             <img src={logo} />
//           </li>
//           <li class="max-w-96">
//                 <div className="relative w-full max-w-md sm:-ml-2 ">
//               <svg
//                 aria-hidden="true"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <input
//                 type="text"
//                 role="search"
//                 placeholder="Search..."
//                 className="py-2 pl-10 pr-4 w-full border-2  placeholder-gray-400 focus:bg-gray-50 rounded-lg"
//               />
//             </div>
//           </li>
//           <li class="">
//             <button class="flex h-8 w-8 items-center justify-center bg-customGreen rounded-full  text-gray-600 hover:text-black hover:shadow">
//                 <LogoutComponent/>
//             </button>
//           </li>
//           {/* <li class="flex">
//             <div class="flex h-8 w-60 items-center justify-center rounded-l border text-gray-600 hover:text-black hover:shadow">
//                 {helloMessage()}
//             </div>
//             <div class="flex h-8 w-60 items-center justify-center rounded-l border text-gray-600 hover:text-black hover:shadow">
//                 <p className='px-4'>Role :</p> {userRole()}
//             </div>
//           </li> */}
//         </ul>
//       </div>
//     </header>
//     {/* <!-- /Navbar --> */}

//     {/* <!-- Main --> */}
//     <div class="h-full overflow-hidden pl-10">
//     <main id="dashboard-main" class="h-[calc(100vh-10rem)] overflow-auto px-4 py-10">
//         <p class="text-2xl font-black text-gray-800 py-5">Bonjour <span className='text-4xl px-3'> {helloMessage()}</span></p>
//         {/* <p class="mb-6 text-gray-600">Here's an overview of project</p> */}
//         <div class="flex flex-wrap gap-x-4 gap-y-8">
//             <div class=" w-full rounded-xl bg-white shadow-md">
//             {/* {userRole() === 'Super Admin' || userRole() === 'Admin' ? <TableTest/> : null} */}
//               <TableTest/>
//             </div>
//         </div>
//     </main>
//     </div>
//         {/* <!-- /Main --> */}
//     </div>
//     </div>

//   </>
//     ) ;
// }
 
// export default Dashboard;
//  import React from "react";

// const Dashboard = () => {
//   return (
//     <main className="p-6 sm:p-10 space-y-6">
//       <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
//         <div className="mr-6">
//           <h1 className="text-4xl font-semibold mb-2">Dashboard 💜</h1>
//           <h2 className="text-gray-600 ml-0.5">
//             {" "}
//             JEWLELRY JUNCTION 
//           </h2>
//         </div>
//         <div className="flex flex-wrap items-start justify-end -mb-3">
//           <button className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//               ></path>
//             </svg>
//             Manage dashboard
//           </button>
//           <button className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//               ></path>
//             </svg>
//             Create new dashboard
//           </button>
//         </div>
//       </div>
//       <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
//         <div className="flex items-center p-8 bg-white shadow rounded-lg">
//           <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 10V3L4 14h7v7l9-11h-7z"
//               ></path>
//             </svg>
//           </div>
//           <div>
//             <span className="block text-xl font-bold">
//               Total Registered Customers
//             </span>
//             <span className="block text-gray-500">Last 12 months</span>
//           </div>
//         </div>
//         <div className="flex items-center p-8 bg-white shadow rounded-lg">
//           <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//               ></path>
//             </svg>
//           </div>
//           <div>
//             <span className="block text-xl font-bold">Total Revenue</span>
//             <span className="block text-gray-500">Last 12 months</span>
//           </div>
//         </div>
//         <div className="flex items-center p-8 bg-white shadow rounded-lg">
//           <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M17 10v4m0 0V10m0 4H7m10 0h3a2 2 0 002-2V6a2 2 0 00-2-2h-1a3 3 0 00-3 3v2"
//               ></path>
//             </svg>
//           </div>
//           <div>
//             <span className="block text-xl font-bold">Number of Sales</span>
//             <span className="block text-gray-500">Last 12 months</span>
//           </div>
//         </div>
//         <div className="flex items-center p-8 bg-white shadow rounded-lg">
//           <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M17 10v4m0 0V10m0 4H7m10 0h3a2 2 0 002-2V6a2 2 0 00-2-2h-1a3 3 0 00-3 3v2"
//               ></path>
//             </svg>
//           </div>
//           <div>
//             <span className="block text-xl font-bold">Pending Orders</span>
//             <span className="block text-gray-500">Last 12 months</span>
//           </div>
//         </div>
//       </section>
//       <section className="grid md:grid-cols-2 gap-6">
//         <div className="bg-white shadow rounded-lg p-6">
//           <h3 className="text-xl font-semibold mb-4">
//             Total Registered Customers
//           </h3>
//           <LineChart
//             xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12] }]}
//             series={[
//               {
//                 data: [10, 15, 25, 30, 40, 50, 60],
//               },
//             ]}
//             width={500}
//             height={300}
//           />
//         </div>
//         <div className="bg-white shadow rounded-lg p-6">
//           <h3 className="text-xl font-semibold mb-4">Number of Sales</h3>

//           <PieChart
//             series={[
//               {
//                 data: [
//                   { id: 0, value: 10, label: "series A" },
//                   { id: 1, value: 15, label: "series B" },
//                   { id: 2, value: 20, label: "series C" },
//                 ],
//               },
//             ]}
//             width={400}
//             height={200}
//           />
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;

// import React from 'react';
// import { PieChart, LineChart } from "@mui/x-charts";

// const BasicPie = () => {
//   return (
//     <PieChart
//       series={[
//         {
//           data: [
//             { id: 0, value: 10, label: 'series A' },
//             { id: 1, value: 15, label: 'series B' },
//             { id: 2, value: 20, label: 'series C' },
//           ],
//         },
//       ]}
//       width={400}
//       height={200}
//     />
//   );
// };

// const Dashboard = () => {
//   return (
//     <main className="p-6 sm:p-10 space-y-6">
//       <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
//         <div className="mr-6">
//           <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
//           <h2 className="text-gray-600 ml-0.5"></h2>
//         </div>
//         <div className="flex flex-wrap items-start justify-end -mb-3">
//           <button className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//               ></path>
//             </svg>
//             Manage dashboard
//           </button>
//           <button className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//               ></path>
//             </svg>
//             Create new dashboard
//           </button>
//         </div>
//       </div>
//       <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
//         <div className="flex items-center p-8 bg-white shadow rounded-lg">
//           <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//               ></path>
//             </svg>
//           </div>
//           <div>
//             <span className="block text-2xl font-bold">62</span>
//             <span className="block text-gray-500">Users</span>
//           </div>
//         </div>
//         <div className="flex items-center p-8 bg-white shadow rounded-lg">
//           <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//               ></path>
//             </svg>
//           </div>
//           <div>
//             <span className="block text-2xl font-bold">24</span>
//             <span className="block text-gray-500">Articles</span>
//           </div>
//         </div>
//         <div className="flex items-center p-8 bg-white shadow rounded-lg">
//           <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 10V3L4 14h7v7l9-11h-7z"
//               ></path>
//             </svg>
//           </div>
//           <div>
//             <span className="block text-2xl font-bold">18</span>
//             <span className="block text-gray-500">Entree</span>
//           </div>
//         </div>
//         <div className="flex items-center p-8 bg-white shadow rounded-lg">
//           <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M17 10v4m0 0V10m0 4H7m10 0h3a2 2 0 002-2V6a2 2 0 00-2-2h-1a3 3 0 00-3 3v2"
//               ></path>
//             </svg>
//           </div>
//           <div>
//             <span className="block text-2xl font-bold">5</span>
//             <span className="block text-gray-500">Sortie</span>
//           </div>
//         </div>
//       </section>
//       <section className="bg-white shadow rounded-lg p-6 md:p-8">
//         <h2 className="text-xl font-semibold mb-4">Upcoming tests</h2>
//         <div className="flex space-x-6">
//           <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg"></div>
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold mb-1"></h3>
//             <p className="text-gray-600 mb-2">2 weeks • Design basics and principles</p>
//             <p className="text-sm text-gray-500">Starts on April 29, 2024</p>
//           </div>
//           <a
//             href="#"
//             className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
//           >
//             <span className="sr-only">Messages</span>
//             <svg
//               aria-hidden="true"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//               ></path>
//             </svg>
//           </a>
//         </div>
//         <div className="mt-8">
//           <BasicPie />
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { PieChart ,LineChart } from "@mui/x-charts";

const BasicPie = ({ data }) => {
  return (
    <PieChart
      series={[
        {
          data: data.map(item => ({ id: item.id, value: item.value, label: item.label })),
        },
      ]}
      width={400}
      height={200}
    />
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, entries: 0 });

  useEffect(() => {
    fetch('http://localhost:3000/stats')
      .then(response => response.json())
      .then(data => {
        setStats({
          users: data.users,
          products: data.products,
          achats: data.achats, 
        });
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }, []);

  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
          <h2 className="text-gray-600 ml-0.5"></h2>
        </div>
        <div className="flex flex-wrap items-start justify-end -mb-3">
          <button className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
            Manage dashboard
          </button>
          <button className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Create new dashboard
          </button>
        </div>
      </div>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.users}</span>
            <span className="block text-gray-500">Users</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.products}</span>
        
            <span className="block text-gray-500">Articles</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.achats}</span>
            <span className="block text-gray-500">Entree</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 10v4m0 0V10m0 4H7m10 0h3a2 2 0 002-2V6a2 2 0 00-2-2h-1a3 3 0 00-3 3v2"
              ></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">5</span>
            <span className="block text-gray-500">Sortie</span>
          </div>
        </div>
      </section>
      <section className="bg-white shadow rounded-lg p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4">Gestion de stock pieces Rechanges</h2>
        {/* <div className="flex space-x-6">
          <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg"></div> */}
          {/* <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1"></h3>
            <p className="text-gray-600 mb-2">2 weeks • Design basics and principles</p>
            <p className="text-sm text-gray-500">Starts on April 29, 2024</p>
          </div> */}
          {/* <a
            href="#"
            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
          >
            <span className="sr-only">Messages</span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </a>
        </div> */}

        <section className="grid md:grid-cols-2 gap-6">
         <div className="bg-white shadow rounded-lg p-6">
           <h3 className="text-xl font-semibold mb-4">
             Total Registered Supliers
           </h3>
           <LineChart
             xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12] }]}
             series={[
               {
                 data: [10, 15, 25, 30, 40, 50, 60],
               },
             ]}
             width={500}
             height={300}
           />
         </div>
         {/* <div className="bg-white shadow rounded-lg p-6">
           <h3 className="text-xl font-semibold mb-4">Number of Sales</h3>

           <PieChart
             series={[
               {
                 data: [
                   { id: 0, value: 10, label: "series A" },
                   { id: 1, value: 15, label: "series B" },
                   { id: 2, value: 20, label: "series C" },
                 ],
               },
             ]}
             width={400}
             height={200}
           />
  
         </div> */}
                       <div className="mt-8">
          <BasicPie
            data={[
              { id: 0, value: stats.users, label: 'Users' },
              { id: 1, value: stats.products, label: 'Articles' },
              { id: 2, value: stats.achat, label: 'Entree' },
            ]}
          />
        </div>
       </section>
   
      </section>
    </main>
  );
};

export default Dashboard;
