"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ name: "", price: "", discountPercentage: "", totalTickets: "" });

  useEffect(() => {
    fetchTickets();
  }, []);

  // 🔹 Fetch Tickets
  const fetchTickets = async () => {
    const res = await axios.get("/api/tickets");
    setTickets(res.data);
  };

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  // 🔹 Create Ticket
  const handleCreate = async () => {
    await axios.post("/api/tickets", newTicket);
    fetchTickets();
  };

  // 🔹 Delete Ticket
  const handleDelete = async (id) => {
    await axios.delete(`/api/tickets/${id}`);
    fetchTickets();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Tickets</h1>

      {/* Form Create Ticket */}
      <div className="mb-4">
        <input type="text" name="name" placeholder="Ticket Name" onChange={handleChange} className="border p-2 m-2" />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} className="border p-2 m-2" />
        <input type="number" name="discountPercentage" placeholder="Discount %" onChange={handleChange} className="border p-2 m-2" />
        <input type="number" name="totalTickets" placeholder="Total Tickets" onChange={handleChange} className="border p-2 m-2" />
        <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2">Add Ticket</button>
      </div>

      {/* Table Tickets */}
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Discount</th>
            <th className="p-2">Total</th>
            <th className="p-2">Remaining</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-b">
              <td className="p-2">{ticket.name}</td>
              <td className="p-2">Rp {ticket.price}</td>
              <td className="p-2">{ticket.discountPercentage}%</td>
              <td className="p-2">{ticket.totalTickets}</td>
              <td className="p-2">{ticket.remainingTickets}</td>
              <td className="p-2">
                <button onClick={() => handleDelete(ticket.id)} className="bg-red-500 text-white px-3 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
