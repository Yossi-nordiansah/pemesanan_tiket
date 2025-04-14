"use client"

import { useTicket } from "./context/TicketContext.js";
import Hero from "./_components/hero.jsx";
import Faq from "./_components/FAQPage.jsx";
import Title from "./_components/title.jsx";
import RegularTicket from "./_components/regularTicket.jsx";
import EventHighlights from "./_components/eventHighlights.jsx";
import TicketPurchaseModal from "./_components/TicketPurchaseModal.jsx";
import GuestContainer from "./_components/GuestContainer.jsx";
import Guests from "./_components/guestReq";
import PartnerContainer from "./_components/PartnerContainer.jsx";
import { useEffect } from "react";

export default function Home() {
  
  useEffect(()=>{
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;
    const script = document.createElement('script');
    script.src = snapScript
    script.setAttribute('data-cient-key', clientKey);
    script.async = true

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [])
  const { ticketRef } = useTicket();

  return (
    <div className="h-full">
      <Hero/>
      <EventHighlights/>
      <Title/>
      <div ref={ticketRef}>
        <RegularTicket />
      </div>
      <GuestContainer/>
      <Guests/>
      <PartnerContainer/>
      <Faq/>
      <TicketPurchaseModal/>
    </div>
  );
}
