import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/Player";
import { useEffect } from "react";
import usePlayer from "@/hooks/usePlayer";

const Room = () => {
    const socket = useSocket();
    const { peer, myId } = usePeer();
    const { stream } = useMediaStream();
    const {players, setPlayers} = usePlayer();

    useEffect(() => {
        if (!socket || !peer || !stream) return;

        const handleUserConnected = (newUser) => {
            console.log(`User connected in room with userId ${newUser}`)
            const call = peer.call(newUser, stream);
            call.on('stream', (incomingStream) => {
                console.log(`Incoming stream from ${newUser}`)
                setPlayers((prev) => ({
                    ...prev,
                    [newUser]: {
                        url: incomingStream,
                        muted: false,
                        playing: true
                    }
                }))
            })
        }

        socket.on('user-connected', handleUserConnected)

        return () => {
            socket.off('user-connected', handleUserConnected)
        }
    }, [peer, socket, stream])

    useEffect(() => {
        if (!peer || !stream) return;
        peer.on('call', (call) => {
            const { peer: callerId } = call;
            call.answer(stream);

            call.on('stream', (incomingStream) => {
                console.log(`Incoming stream from ${callerId}`)

                setPlayers((prev) => ({
                    ...prev,
                    [callerId]: {
                        url: incomingStream,
                        muted: false,
                        playing: true
                    }
                }))
            })
        })
    }, [peer, stream])

    useEffect(() => {
        if (!stream || !myId) return;
        console.log(`Setting m y stream ${myId}`);
        setPlayers((prev) => ({
            ...prev,
            [myId]: {
                url: stream,
                muted: false,
                playing: true
            }
        }))
    }, [myId, setPlayers, stream])

    return (
        <div>
            {Object.keys(players).map((playerId) => {
                const {url, muted, playing} = players[playerId];
                return <Player key={playerId} url={url} muted={muted} playing={playing}/>
            })}
            
        </div>
    );
}

export default Room;