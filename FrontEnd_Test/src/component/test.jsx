import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
//   const [greeting, setGreeting] = useState('');
const [greeting, setGreeting] = useState('');

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/greeting', {
      withCredentials: true, // Send cookies along with the request
    });
    setGreeting(response.data.message);
    console.log('FD: res:', response.data);
  } catch (error) {
    console.error('Error fetching greeting:', error);
  }
};
  useEffect(() => {
    fetchData();

  }, []); // Empty dependency array means this effect will run once after the component mounts

  return (
    <div>
      <h1>Greeting</h1>
      <p>{greeting}</p>
    </div>
  );
};


export default Test;