import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from './Inputs';
import axiosInstance from '../utils/axiosInstance';
import { API_PATH } from '../utils/apiPath';

export default function CreateResumeForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter title");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATH.RESUME.CREATE, {
        title,

      });

      if (response.data?._id) {
        navigate(`/resume/${response.data._id}`)
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong. Please try again lately.");
      }

    }

  }

  return (
    <div className='w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 shadow-lg'>
      <h3 className='text-2xl font-bold text-gray-500 mb-2'>Create new resume</h3>
      <p className='text-gray-600 mb-8'>Give your resume a title to get started. You can customize everything later.</p>
      <form onSubmit={handleCreateResume}>
        <Input value={title} onChange={({ target }) => setTitle(target.value)}
          label="Resume title" placeholder="e.g. John Doe - Software Engineer" />
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button type='submit' className='w-full py-3 bg-linear-to-r from-rose-500 to-pink-600 text-white font-black
        rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 transition-all'>Create resume</button>
      </form>
    </div>
  )
}
