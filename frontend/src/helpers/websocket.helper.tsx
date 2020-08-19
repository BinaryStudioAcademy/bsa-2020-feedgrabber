import 'react-notifications/lib/notifications.css';
import {Client} from "@stomp/stompjs";
import {useEffect, useState} from "react";

// const socket = new SockJS("/ws");
// const stompClient = Stomp.over(socket);
// stompClient.connect({}, () => stompClient.subscribe("/user/topic/questions", m
// => console.log(m.binaryBody + "here")));
// stompClient.connect({}, () => stompClient.subscribe("/user2/topic/questions", m
// => console.log(m.binaryBody + "here")));

const client = new Client({
    brokerURL: "ws://localhost:5000/ws",
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
            client.onConnect = () => setConnected(true);
            return undefined;
        }

        const str = !forConcreteUser ? `/topic/${topic}` : `/user/topic/${topic}`;
        const s = client.subscribe(str, callback);
        return () => s.unsubscribe();
    }, [topic, callback, forConcreteUser, isConnected]);
};

export {useStomp};
