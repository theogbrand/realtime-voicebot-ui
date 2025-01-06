// 'use client';
// import { useState, FormEvent } from 'react';

// export default function Form() {
//   const [inputValue, setInputValue] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (inputValue.trim().length === 0) {
//       setError('Please enter some text');
//       return;
//     }
//     setError('');
//     console.log('Form submitted with:', inputValue);
//     setInputValue('');
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder="Enter text..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Form() {
  const [chatroomUrl, setChatroomUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setChatroomUrl("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const ROOM_NAME = formData.get("roomName");

    try {
      const response = await fetch("/api/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ROOM_NAME }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred");
      } else {
        setChatroomUrl(data.chatroomUrl);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="roomName"
              className="block text-sm font-medium text-gray-700"
            >
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <ClipLoader size={24} color="#ffffff" /> : "Create Room"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {chatroomUrl && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              Chatroom URL:{" "}
              <a href={chatroomUrl} className="underline">
                {chatroomUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
