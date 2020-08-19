import 'react-notifications/lib/notifications.css';
import {Client} from "@stomp/stompjs";
import {useEffect, useState} from "react";
import tokenProvider from "../security/tokenProvider";

const client = new Client({
    brokerURL: "ws://localhost:5000/ws",
    connectHeaders: {auth: tokenProvider.getToken()},
    debug: str => console.log(str),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});

client.activate();

const useStomp = (
    topic: string,
    callback: (payload: any) => void,
    forConcreteUser = false) => {
    const [isConnected, setConnected] = useState(client.connected);

    useEffect(() => {
        if (!isConnected) {
            client.onConnect = frame => {
                frame.headers = {auth: tokenProvider.getToken()};
                setConnected(true);
            };
            return undefined;
        }

        const str = !forConcreteUser ? `/topic/${topic}` : `/user/topic/${topic}`;
        const s = client.subscribe(str, callback);
        return () => s.unsubscribe();
    }, [topic, callback, forConcreteUser, isConnected]);
};

export {useStomp};
