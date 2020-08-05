import { useEffect, useState } from "react";
// import openSocket from "socket.io-client";
import useInterval from "../lib/useInterval";

function broadcast() {
  const [enableBroadcast, setEnableBroadcast] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [locationData, setLocationData] = useState([]);

  useInterval(
    () => {
      getLocation();
    },
    enableBroadcast
      ? process.env.NEXT_PUBLIC_BROADCAST_FREQUENCY * 1000 || 5000
      : null
  );

  useEffect(() => {
    if (!socketConnected) {
      setSocketConnected(true);
      // const socket = openSocket(process.env.NEXT_PUBLIC_SERVER_URI);
      // const visitor = {
      //   ip: "geoplugin_request",
      //   city: "geoplugin_city",
      //   state: "geoplugin_region",
      // };
      // socket.emit("new_visitor", visitor);
      // socket.on("visitors", visitors => {
      //   console.info(visitors, "visitors visitors");
      //   // this.setState({
      //   //   visitors,
      //   // });
      // });
      // console.info("2st UseEffect");
    }
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocationData([...locationData, position]);
      });
    } else {
      console.info("Not supported");
    }
  };

  return (
    <div>
      <h1>Broadcast</h1>
      <p>
        This does not broadcast data, yet. This is only to test Geo Location
        accuracy.
      </p>
      <button onClick={() => setEnableBroadcast(!enableBroadcast)}>
        Toggle Enable Broadcast
      </button>{" "}
      &nbsp;: {enableBroadcast ? "Enabled" : "Disabled"}
      <br />
      <br />
      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table>
          <tbody>
            <tr>
              <th>longitude</th>
              <th>latitude</th>
              <th>accuracy</th>
              <th>altitude</th>
              <th>altitudeAccuracy</th>
              <th>heading</th>
              <th>speed</th>
              <th>timestamp</th>
            </tr>
            {locationData.map(location => {
              return (
                <tr key={Math.random()}>
                  <td>{location.coords.longitude}</td>
                  <td>{location.coords.latitude}</td>
                  <td>{location.coords.accuracy}</td>
                  <td>{location.coords.altitude}</td>
                  <td>{location.coords.altitudeAccuracy}</td>
                  <td>{location.coords.heading}</td>
                  <td>{location.coords.speed}</td>
                  <td>{location.timestamp}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        table {
          overflow-x: auto;
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          border: 1px solid #ddd;
        }

        th,
        td {
          text-align: left;
          padding: 8px;
        }
        button {
          display: inline-block;
          padding: 5px 12px;
          margin: 5px 10px;
          color: white;
          text-decoration: none;
          background: #06f;
        }
      `}</style>
    </div>
  );
}

export default broadcast;
