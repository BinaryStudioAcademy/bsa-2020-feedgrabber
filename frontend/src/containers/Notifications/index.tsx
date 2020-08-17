import {useCallback, useMemo, useRef} from 'react';
import {useWebSocket} from "react-use-websocket/dist/lib/use-websocket";

const Notifications = () => {
    const messageHistory = useRef([]);

    const {
        sendMessage,
        lastMessage,
        sendJsonMessage,
        getWebSocket,
        readyState
    } = useWebSocket('ws://localhost:5000/ws', {
        onOpen: () => console.log('opened websocket'),
        shouldReconnect: event => true
    });

    messageHistory.current = useMemo(() => messageHistory.current.concat(lastMessage), [lastMessage]);

};

export default Notifications;
