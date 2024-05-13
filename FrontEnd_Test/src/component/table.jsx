import React from "react";

import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData} from '../store/userSlice';
import { RiDeleteBinFill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import Collapse from "@mui/material/Collapse";

const TableTest = () => {
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector((state) => state.user);
    
    useEffect(() => {
        dispatch(fetchUserData()); // Dispatch the fetchProductData action when the component mounts
    }, [dispatch]);
    return (
    <>
              <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Member
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Last activity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userData.map((user) => (
                <React.Fragment key={user._id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center">
                      {/* <ProfilePicture fullname={user.fullname} /> */}
                      <span className="ml-3">{user.login_User}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {user.type_User}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {user.email_User}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Today
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-end items-center space-x-3">
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-900 focus:outline-none"
                          onClick={() => handleCollapseToggle(user._id)}
                        >
                          <GrView />
                          <path d="M10 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-3m-4 8v4m0-8V6m4 8h3m2-3h-8"></path>
                        </button>
                        <button
                          type="button"
                          className="text-green-600 hover:text-green-900 focus:outline-none"
                          onClick={() => handleOpenEditDialog(user)}
                        >
                          <RiEdit2Fill />
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900 focus:outline-none"
                          onClick={() => deletePostHandler(user)}
                        >
                          <RiDeleteBinFill />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6">
                      {/* <Collapse in={openCollapse[user.id_User]} timeout="auto" unmountOnExit> */}
                        <div className="p-4 bg-gray-100">
                          <h3 className="text-lg font-semibold mb-2">
                            Additional Information
                          </h3>
                          <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed quis metus eu magna vulputate varius.
                            Quisque nec dolor id leo porttitor fermentum. In
                            hac habitasse platea dictumst. Nulla facilisi.
                            Suspendisse et convallis urna. Nam ac mauris
                            aliquet, consequat velit nec, feugiat ligula. Nulla
                            facilisi. Curabitur sed libero lectus. Vivamus
                            fermentum dui vitae magna tincidunt, ac feugiat
                            nisi ultrices. Donec varius augue id nunc vehicula
                            volutpat. Sed pharetra vehicula lacinia. Phasellus
                            et turpis orci. Fusce auctor nunc eget semper
                            vehicula.
                          </p>
                        </div>
                      {/* </Collapse> */}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
    </> 
    );
}
 
export default TableTest;