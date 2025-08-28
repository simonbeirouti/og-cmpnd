"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import dynamic from "next/dynamic";

import "./Navbar.css";

// const MusicToggle = dynamic(() => import("../MusicToggle/MusicToggle"), {
//   ssr: false,
// });

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  // const [time, setTime] = useState("");
  // const pathname = usePathname();
  // const router = useRouter();
  // const isHomePage = pathname === "/";

  // useEffect(() => {
  //   const updateTime = () => {
  //     const now = new Date();
  //     const timeString = now.toLocaleTimeString("en-US", {
  //       hour: "numeric",
  //       minute: "2-digit",
  //       second: "2-digit",
  //       hour12: true,
  //     });
  //     setTime(timeString);
  //   };

  //   updateTime();
  //   const interval = setInterval(updateTime, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const handleNavigation = (event, sectionId) => {
  //   event.preventDefault();

  //   if (isHomePage) {
  //     const lenis = window.lenis;
  //     if (lenis) {
  //       const element = document.getElementById(sectionId);
  //       if (element) {
  //         lenis.scrollTo(element, {
  //           offset: 0,
  //           immediate: false,
  //           duration: 1.5,
  //         });
  //       }
  //     }
  //   } else {
  //     router.push(`/#${sectionId}`);
  //   }
  // };

  return (
    <div className={`navbar ${!isVisible ? 'navbar--hidden' : ''}`}>
      <div className="navbar-col">
        <div className="navbar-sub-col logo">
          <Link href="/">
            <h3>Compound</h3>
          </Link>
        </div>
        {/* turn the timer into a CO2 counter */}
        {/* <div className="navbar-sub-col time">
          <p>{time}</p>
        </div> */}
      </div>
      {/* <div className="navbar-col">
        <div className="navbar-sub-col nav-items">
          <a href="#intro" onClick={(e) => handleNavigation(e, "intro")}>
            <p>The Origins</p>
          </a>
          <a
            href="#case-studies"
            onClick={(e) => handleNavigation(e, "case-studies")}
          >
            <p>Highlights</p>
          </a>
          <a href="#works" onClick={(e) => handleNavigation(e, "works")}>
            <p>Innovations</p>
          </a>
        </div>
        <div className="navbar-sub-col music-toggle-wrapper">
          <MusicToggle />
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
