// src/pages/ConfirmDeleteAccount.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ConfirmDeleteAccount = () => {
  const { token } = useParams(); // Get the token from the URL
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const confirmAccountDeletion = async () => {
      setLoading(true); // Set loading to true when request is being made
      try {
        const response = await axios.get(`https://posterback.onrender.com/api/users/confirm-delete-account/${token}`);

        if (response.status === 200) {
          setMessage(response.data.message);
          // Redirect user after successful deletion (optional)
          setTimeout(() => {
            navigate('/delete-account'); // Redirect to home or login page after 2 seconds
          }, 2000);
        } else {
          setMessage('Unexpected response from the server.');
        }
      } catch (error) {
        if (error.response) {
          // Backend error
          setMessage(error.response.data.message || 'An error occurred');
        } else if (error.request) {
          // No response received
          setMessage('No response from the server. Please try again later.');
        } else {
          // Other errors
          setMessage('An error occurred while processing the request.');
        }
      } finally {
        setLoading(false); // Set loading to false once the request is completed
      }
    };

    confirmAccountDeletion();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Confirm Account Deletion</h1>
        <p className="text-gray-700 mb-4">
          {loading ? 'Processing your request...' : message}
        </p>
      </div>
    </div>
  );
};

export default ConfirmDeleteAccount;
