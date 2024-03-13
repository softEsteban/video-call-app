import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const router = useRouter();

  const [roomId, setRoomId] = useState('');

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`)
  }

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`)
    else {
      alert("Please provide room id")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-11/12 md:w-8/12 lg:w-6/12 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Meet app</h1>
        <div className="flex flex-col items-center">
          <input placeholder="Enter Room ID" value={roomId} onChange={(e) => setRoomId(e?.target?.value)} className="w-full md:w-9/12 lg:w-8/12 px-4 py-2 mb-4 bg-gray-700 text-white placeholder-gray-400 border border-transparent rounded focus:outline-none focus:ring focus:ring-indigo-400" type="text" />
          <button onClick={joinRoom} className="w-full md:w-9/12 lg:w-8/12 px-4 py-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring focus:ring-blue-400 transition duration-300 ease-in-out">Join room</button>
          <span className="text-white mb-4">-----OR------</span>
          <button onClick={createAndJoin} className="w-full md:w-9/12 lg:w-8/12 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded focus:outline-none focus:ring focus:ring-green-400 transition duration-300 ease-in-out">Create a new room</button>
        </div>
      </div>
    </div>


  );
}
