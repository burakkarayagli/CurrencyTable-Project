import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Button from "@mui/material/Button";
import CurrencyTable from "./components/CurrencyTable";

//Command for checking the version of the installed packages
//npm ls --depth=0

function App() {
    const [data, setData] = useState([]);

    function connect() {
        // create a new WebSocket connection
        const socket = new SockJS("http://localhost:8080/broadcasts");

        // create a new STOMP client over the WebSocket connection
        const stompClient = Stomp.over(socket);

        // connect to the WebSocket endpoint
        stompClient.connect({}, function (frame) {
            // subscribe to the "/broadcast" destination
            stompClient.subscribe("/broadcast", function (message) {
                // parse the JSON message
                const json = JSON.parse(message.body)
                
                setData(json);
                
            });
        });
    }

    

    return (
        <div className="App">
            <Button variant="contained" onClick={connect}>
                Connect
            </Button>
            <br></br>
            <CurrencyTable data={data}></CurrencyTable>
            <br></br>
        </div>
    );
}

export default App;
