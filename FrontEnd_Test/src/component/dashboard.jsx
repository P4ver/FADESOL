
import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import { LineChart, PieChart } from "@mui/x-charts";
import { useDispatch, useSelector } from 'react-redux';
import { fetchVenteData, fetchVenteByDayData } from '../store/venteSlice';
import { API_BASE_URL } from '../apiConfig';

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, entries: 0, sorties: 0, return: 0 });
  const [lineChartData, setLineChartData] = useState([]);
  const venteByDayData = useSelector(state => state.vente.venteByDayData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVenteData());
    dispatch(fetchVenteByDayData());
    
    fetch(`${API_BASE_URL}/stats`)
      .then(response => response.json())
      .then(data => {
        setStats({
          users: data.users,
          products: data.products,
          entries: data.achats,
          sorties: data.sorties,
          return: data.return,
        });
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });

    fetch(`${API_BASE_URL}/vente/byDay`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
          time: item.date,
          amount: item.totalSales,
        }));
        console.log("frm_Dashboard  lineChartData:",lineChartData)
        setLineChartData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching daily sales data:', error);
      });
  }, [dispatch]);

  const pieChartData = [
    { id: 0, value: stats.entries, label: 'Entree' },
    { id: 1, value: stats.sorties, label: 'Sortie' },
    { id: 2, value: stats.return, label: 'Return' },
  ];

  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
        </div>
      </div>
      <section className="grid md:grid-cols-5 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.users}</span>
            <span className="block text-gray-500">Users</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.products}</span>
            <span className="block text-gray-500">Articles</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.entries}</span>
            <span className="block text-gray-500">Entree</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 10v4m0 0V10m0 4H7m10 0h3a2 2 0 002-2V6a2 2 0 00-2-2h-1a3 3 0 00-3 3v2"></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.sorties}</span>
            <span className="block text-gray-500">Sortie</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a2 2 0 002 2H6a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2"></path>
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{stats.return}</span>
            <span className="block text-gray-500">Return</span>
          </div>
        </div>
      </section>
      <section className="bg-white shadow rounded-lg p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4"> Entree/Sortie</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PieChart
            series={[{ data: pieChartData }]}
            width={400}
            height={200}
          />
        </div>
      </section>
      {/* LineChart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 300 }}>
        <h2 className="text-xl font-semibold mb-4"> Nombre de vente par jour</h2>
          <LineChart
            dataset={lineChartData}
            margin={{
              top: 16,
              right: 35,
              left: 70,
              bottom: 45,
            }}
            xAxis={[
              {
                label: 'date',
                scaleType: 'point',
                dataKey: 'time',
                tickNumber: 10,
              },
            ]}
            yAxis={[
              {
                label: 'qte',
                max: 50,
                tickNumber: 5,
              },
            ]}
            series={[
              {
                dataKey: 'amount',
                showMark: false,
                color: '#1976d2', // Couleur personnalisée
              },
            ]}
          />
        </Paper>
      </Grid>
    </main>
  );
};

export default Dashboard;
