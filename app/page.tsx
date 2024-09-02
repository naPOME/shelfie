import Image from "next/image";
import '../styles/globals.css';
import  NavBar  from "./components/common/navBar";
import Hero from "./components/dashboard/hero";

export default function Home() {
  return (
   <>
   <NavBar/>
   <Hero/>
   </>
  );
}
