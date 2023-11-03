import Image from 'next/image'
import Map from './map'


export default function Home() {
  return (
    <>
      <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
      <h1>Welcome to CSC 307</h1>
      <div>
        <Map></Map> WHAT IS HAPPENING??????
      </div>
    </>
  )
}
