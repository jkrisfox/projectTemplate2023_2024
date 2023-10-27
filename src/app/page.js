'use client'

import Image from 'next/image'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useRef, useEffect } from 'react';


const MyApp = () => (
  <Wrapper apiKey={process.env.MAPS_KEY}>
    <MyMapComponent />
  </Wrapper>
);


export default function Home() {
  const ref = useRef();

  useEffect(() => {
    debugger;
    new window.google.maps.Map(ref.current, {
      center: {lat: 30, lng: 30},
      zoom: 100,
    });
    debugger;
  });

  return (
    <>
      <h1>Welcome to CSC 307</h1>
      <Wrapper apiKey={process.env.MAPS_KEY}>
        <div ref={ref} id="map">aaaaaaaa</div>
      </Wrapper>
      <p>
        This application is a Next.js application. It already contains a way to login and sign-up as well as a rough ToDo list application as a way to demonstrate create and update of a todo. 
      </p>
      <h2>Documentation</h2>
      <ul>
        <li>NextJS: <a href="https://nextjs.org/docs">https://nextjs.org/docs</a></li>
        <li>Material UI: <a href="https://mui.com/material-ui/getting-started/">https://mui.com/material-ui/getting-started/</a></li>
        <li>Prisma: <a href="https://www.prisma.io/docs/getting-started">https://www.prisma.io/docs/getting-started</a></li>
      </ul>
      <h2></h2>
    </>
  )
}
