 // import { GoogleMap, Marker } from "react-google-maps"
 import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
 const URLexample = "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=YOUR_API_KEY"


///////////////////////////////////////////////////////////
// https://tomchentw.github.io/react-google-maps/  ///////
export const MyMapsComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))
///////////////////////////////////////////////////////////
//https://www.npmjs.com/package/react-google-maps-temp///////
// export const MyMapsComponent  = withGoogleMap(props => (
//   <GoogleMap
//     ref={props.onMapLoad}
//     defaultZoom={3}
//     defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
//     onClick={props.onMapClick}
//   >
//     {props.markers.map((marker, index) => (
//       <Marker
//         // {...marker}
//         onRightClick={() => props.onMarkerRightClick(index)}
//       />
//     ))}
//   </GoogleMap>
// ));
// Then, render it:
// render(
//   <MyMapsComponent
//     containerElement={
//       <div style={{ height: `100%` }} />
//     }
//     mapElement={
//       <div style={{ height: `100%` }} />
//     }
//     onMapLoad={_.noop}
//     onMapClick={_.noop}
//     markers={markers}
//     onMarkerRightClick={_.noop}
//   />,
//   document.getElementById('root')
// );
	