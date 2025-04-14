"use client"

import { usePathname } from "next/navigation";
import WelcomePopup from "./welcomePopUp";
import Navbar from "./navbar";
import Footer from "./footer";
import Navtop from "./navtop";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTicket } from "../context/TicketContext";

export default function LayoutWrapper({ children }) {
  const { scrollToTickets } = useTicket();
  
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname.startsWith("/auth/login");
  const isForm = pathname.startsWith("/form");
  const isTicket = pathname.startsWith("/ticket");
  const shouldHideLayout = isAdminPage || isLoginPage || isForm || isTicket;

  {/** AOS ANIMATIONS*/}
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {!shouldHideLayout && <WelcomePopup onGetTickets={scrollToTickets} />}
      {!shouldHideLayout && <Navtop />}
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}