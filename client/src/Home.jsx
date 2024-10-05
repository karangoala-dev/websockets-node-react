import React, { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket';
import throttle from 'lodash.throttle';
import { Cursor } from './components/Cursor';

const Home = ({username}) => {

    const WS_URL = "ws://localhost:8000";
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        queryParams: { username }
    })

    const renderCursors = users => {
        return Object.keys(users).map(uniqueId => {
            const user = users[uniqueId];
            return(<Cursor key={uniqueId} point={[user.state.x, user.state.y]}/>);
        })
    }

    const THROTTLE_RATE = 50;
    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE_RATE));

    useEffect(()=>{
        sendJsonMessage({
            x: 0,
            y: 0
        })
        window.addEventListener("mousemove", e => {
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY
            })
        })

        return () => {
            window.removeEventListener("mousemove", () => {});
          };
    }, [])
    
    if(lastJsonMessage){
        <div>
            {renderCursors(lastJsonMessage)}
        </div>
    }
  return (
    <div>Hello {username}</div>
  )
}

export default Home; 