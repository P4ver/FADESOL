import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserData, fetchUserData, updateUserData} from '../store/userSlice';
import { RiDeleteBinFill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import swal from "sweetalert";

const TableTest = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.user);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    Username: "",
    fullname: "",
    email: "",
    role: "",
    status: "active"
  });

  useEffect(() => {
    dispatch(fetchUserData()); // Dispatch the fetchProductData action when the component mounts
  }, [dispatch]);

  const deletePostHandler = (user) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteUserData(user.id_User))
          .then(() => {
            swal("User deleted successfully", {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user. Please try again.");
          });
      }
    });
  };

const handleOpenEditDialog = (user) => {
    setEditUser(user);
    setEditedUser({
      UserID: user.id_User,
      Username: user.login_User,
      email: user.email_User,
      role: user.type_User,
      status: user.status
    });
    setOpenDialog(true);
  };
  

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Save edit
  const handleSaveEdit = async () => {
    try {
      await dispatch(updateUserData({ id_User: editUser.id_User, updateUserData: editedUser }));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.message || "Failed to update user details. Please try again.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Member</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Last activity</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {userData.map((user) => (
            <tr key={user.id_User}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center">
                <span className="ml-3">{user.login_User}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.type_User}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email_User}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Today</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex justify-end items-center space-x-3">
                  <button type="button" className="text-gray-600 hover:text-gray-900 focus:outline-none">
                    <GrView />
                    <path d="M10 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-3m-4 8v4m0-8V6m4 8h3m2-3h-8"></path>
                  </button>
                  <button type="button" className="text-green-600 hover:text-green-900 focus:outline-none" onClick={() => handleOpenEditDialog(user)}>
                    <RiEdit2Fill />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
                  </button>
                  <button type="button" className="text-red-600 hover:text-red-900 focus:outline-none" onClick={() => deletePostHandler(user)}>
                    <RiDeleteBinFill />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openDialog && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Edit User</h3>
                    <div className="mt-5">
                      <form>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input type="text" name="Username" id="username" value={editedUser.Username} onChange={handleEditChange} autoComplete="username" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                          </div>
                          <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" value={editedUser.email} onChange={handleEditChange} autoComplete="email" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select id="role" name="role" autoComplete="role" value={editedUser.role} onChange={handleEditChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={handleSaveEdit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                <button type="button" onClick={handleCloseDialog} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TableTest;