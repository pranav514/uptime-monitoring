import React, { useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL

function SubmitUrl() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}}/api/user/submit`, 
        { url }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.msg);
      setUrl('');
    } catch (error) {
      setMessage(error.response?.data.msg || 'Failed to submit URL');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C172C] px-4">
      <form 
        onSubmit={handleSubmit} 
        className="max-w-md w-full p-8 bg-gray-900 rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:scale-105"
      >
        <h3 className="text-3xl font-extrabold text-cyan-400 text-center mb-8">Submit URL</h3>
        
        <div className="mb-6">
          <label className="text-gray-300 text-sm mb-1 block">URL</label>
          <input 
            type="url" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            required 
            className="w-full bg-transparent text-base text-white border border-gray-700 focus:border-cyan-400 px-4 py-3 rounded-md outline-none transition-all duration-300"
            placeholder="https://example.com"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full py-3 px-6 text-base font-semibold text-gray-900 bg-cyan-400 rounded-md shadow-md hover:bg-cyan-500 focus:outline-none transition-all duration-300 transform hover:-translate-y-1"
        >
          Submit
        </button>
        
        {message && (
          <p className="text-cyan-400 text-center mt-6 animate-bounce">{message}</p>
        )}
      </form>
    </div>
  );
}

export default SubmitUrl;
