"use client"

import Hero from '../components/Hero';
import HomeSubAction from '../components/HomeSubAction';
import Catalog from '../components/Catalog';


import HeroInspiration from '../components/HeroInspiration';

export default function Home() {
  return (
    <>
    <Hero/>
    <Catalog/>
    <HomeSubAction/>
    <HeroInspiration/>
    <HomeSubAction/>
    </>
  )
}
