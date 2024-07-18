import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchClientData } from '../store/clientSlice';
const Client = () => {
    const dispatch = useDispatch(); 
    const { clientData, loading, error } = useSelector((state) => state.client);

    useEffect(() => {
        dispatch(fetchClientData()); 
    }, [dispatch]);
    console.log("from client ",clientData)
  return (
        <div>
            {/* 
            
            
            
             */}
        </div>
        
    )
}

export default Client

