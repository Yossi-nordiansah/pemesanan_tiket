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

export default function Home() {

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
