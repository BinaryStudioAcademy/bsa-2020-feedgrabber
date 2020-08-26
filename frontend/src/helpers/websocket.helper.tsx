import 'react-notifications/lib/notifications.css';
import {Client} from "@stomp/stompjs";
import {useCallback, useEffect, useState} from "react";
import tokenProvider from "../security/tokenProvider";
import {messageCallbackType} from "@stomp/stompjs/esm5/types";
import {env} from "../env";

const client = new Client({
    brokerURL: env.wsUlr,
    connectHeaders: {auth: tokenProvider.getToken()},
    // debug: str => console.log(str),
    reconnectDelay: 5000,
    onStompError: () => client.connectHeaders = {auth: tokenProvider.getToken()},
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});

client.activate();

const useStomp = (
    topic: string,
    callback: messageCallbackType,
    forConcreteUser = false) => {
    const [isConnected, setConnected] = useState(client.connected);
    client.onConnect = () => setConnected(v => ++v);
    const cb = useCallback(callback, [topic, forConcreteUser]);

    useEffect(() => {
        if (isConnected) {
            const str = !forConcreteUser ? `/topic/${topic}` : `/user/queue/${topic}`;
            const s = client.subscribe(str, cb);
            return () => !client.active && s.unsubscribe();
        }
        return undefined;

    }, [topic, isConnected, forConcreteUser, cb]);
};

export {useStomp};
