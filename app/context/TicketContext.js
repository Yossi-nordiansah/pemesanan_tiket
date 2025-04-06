"use client";

import { createContext, useContext, useRef } from "react";

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const ticketRef = useRef(null);

  const scrollToTickets = () => {
    if (ticketRef.current) {
      ticketRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <TicketContext.Provider value={{ ticketRef, scrollToTickets }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  return useContext(TicketContext);
}