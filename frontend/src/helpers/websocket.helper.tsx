import 'react-notifications/lib/notifications.css';
import {Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import {useEffect} from "react";

const stompClient = Stomp.over(new SockJS("/ws"));
stompClient.activate();

export function useStomp(topic: string, callback: () => void) {
    useEffect(() => {
        try {
            const s = stompClient.subscribe(`/topic/${topic}`, callback);
            return () => s.unsubscribe();
        } catch (e) {
            return undefined;
        }
    });
}
