import { useSocket } from '@/context/socket';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

const usePlayer = () => {
  const [players, setPlayers] = useState({});

  return {players, setPlayers};

}

export default usePlayer;