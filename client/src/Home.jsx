import React, { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket';
import throttle from 'lodash.throttle';

const Home = ({username}) => {

    const WS_URL = "ws://localhost:8000";
    const { sendJsonMessage } = useWebSocket(WS_URL, {
        queryParams: { username }
    })

    const THROTTLE_RATE = 50;
    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE_RATE));

    useEffect(()=>{
        window.addEventListener("mousemove", e => {
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY
            })
        })
    }, [])
    
  return (
    <div>Hello {username}</div>
  )
}

export default Home; 