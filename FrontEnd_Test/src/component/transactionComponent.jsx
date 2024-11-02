import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionData } from '../store/transactionSlice'; // Adjust the import path

const Transactions = () => {
  const dispatch = useDispatch();

  // Get the data from the Redux store
  const { transactionData, loading, error } = useSelector((state) => state.transaction);

  // Local state for search filters
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');

  // Fetch the data when the component mounts
  useEffect(() => {
    dispatch(fetchTransactionData());
  }, [dispatch]);

  // Function to format date as dd/mm/yyyy hh:mm
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('fr-FR'); // Formats as dd/mm/yyyy
    const formattedTime = date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }); // Formats time as hh:mm
    return `${formattedDate} ${formattedTime}`;
  };

  // Filter transactions based on search term and date
  // const filteredTransactions = transactionData.filter((transaction) => {
  //   const lowercasedSearchTerm = searchTerm.toLowerCase();
  //   const matchesUser = transaction.user_Dmd.toLowerCase().includes(lowercasedSearchTerm);
  //   const matchesArticle = transaction.Numéro_Article.toLowerCase().includes(lowercasedSearchTerm);

  //   const transactionDate = new Date(transaction.update_at).toISOString().split('T')[0]; // Format to yyyy-mm-dd
  //   const matchesDate = searchDate ? transactionDate === searchDate : true; // Check if the transaction matches the date

  //   return (matchesUser || matchesArticle) && matchesDate;
  // });
  const filteredTransactions = transactionData.filter((transaction) => {
    try {
      // Ensure search term and transaction fields are properly checked
      const lowercasedSearchTerm = searchTerm?.toLowerCase() || '';
      const matchesUser = transaction.user_Dmd?.toLowerCase().includes(lowercasedSearchTerm) || false;
      const matchesArticle = transaction.Numéro_Article?.toLowerCase().includes(lowercasedSearchTerm) || false;
  
      // Ensure the transaction date is a valid date
      const transactionDate = new Date(transaction.update_at).toISOString().split('T')[0]; // Format to yyyy-mm-dd
      const matchesDate = searchDate ? transactionDate === searchDate : true; // Check if the transaction matches the date
  
      // Return true if it matches search term and date
      return (matchesUser || matchesArticle) && matchesDate;
    } catch (error) {
      console.error('Error filtering transactions:', error);
      return false; // In case of error, skip this transaction
    }
  });
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Transactions</h2>

      {/* Search Filter */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Search by User or Article Number"
          className="border p-2 rounded w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded w-80"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

      {/* Table of Transactions */}
      {loading ? (
        <p className="text-center text-gray-500">Loading transactions...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white text-left">
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Ref</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Qte Ancienne</th>
                <th className="px-4 py-2">Qte Edité</th>
                <th className="px-4 py-2">Qte Magasine</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.idTransaction} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{transaction.user_Dmd}</td>
                    <td className="px-4 py-2">{transaction.Numéro_Article}</td>
                    <td className="px-4 py-2">{transaction.Type_Transaction}</td>
                    <td className="px-4 py-2">{formatDate(transaction.update_at)}</td>
                    <td className="px-4 py-2">{transaction.qte_Old}</td>
                    <td className="px-4 py-2">{transaction.qte_Edited}</td>
                    <td className="px-4 py-2">{transaction.qte_Magasin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center px-4 py-2 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
