"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function GuestForm() {
    const [form, setForm] = useState({
        name: "",
        event: "",
        detail_guest: "",
        logo: null,
        image: null,
    });
    const [preview, setPreview] = useState({ logo: null, image: null });
    const [guests, setGuests] = useState([]);
    const [editingGuest, setEditingGuest] = useState(null);

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    useEffect(() => {
        fetchGuests();
        // console.log(guests)
    }, []);

    const fetchGuests = async () => {
        try {
            const { data } = await axios.get("/api/guests");
    
            if (!data || data.message === "No guests found") {
                setGuests([]);
            } else {
                setGuests(data);
            }
    
            console.log("Guest Data:", data);
        } catch (error) {
            console.error("Error fetching guests:", error);
        }
    };
    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;

        if (file && allowedTypes.includes(file.type)) {
            setForm({ ...form, [name]: file });

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview((prev) => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            alert("Format gambar harus JPEG, PNG, GIF, atau WebP!");
            e.target.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingGuest) {
            await axios.put(`/api/guests/${editingGuest.id}`, {
                name: form.name,
                event: form.event,
                detail_guest: form.detail_guest,
            });
            setEditingGuest(null);
        } else {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("event", form.event);
            formData.append("detail_guest", form.detail_guest);
            if (form.logo) formData.append("logo", form.logo);
            if (form.image) formData.append("image", form.image);

            await axios.post("/api/guests", formData);
        }
        fetchGuests();
        setForm({ name: "", event: "", detail_guest: "", logo: null, image: null });
        setPreview({ logo: null, image: null });
    };

    const handleEdit = (guest) => {
        setForm({
            name: guest.name,
            event: guest.event,
            detail_guest: guest.detail_guest,
        });
        setEditingGuest(guest);
    };

    const handleDelete = async (id) => {
        if (confirm("Yakin ingin menghapus?")) {
            await axios.delete(`/api/guests/${id}`);
            fetchGuests();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nama" className="border p-2 w-full" />
                <input type="text" name="event" value={form.event} onChange={handleChange} placeholder="Event" className="border p-2 w-full" />
                <textarea name="detail_guest" value={form.detail_guest} onChange={handleChange} placeholder="Detail Guest" className="border p-2 w-full" />

                {!editingGuest && (
                    <>
                        <label>Logo:</label>
                        <input type="file" name="logo" accept="image/*" onChange={handleFileChange} className="border p-2 w-full" />
                        {preview.logo && <img src={preview.logo} alt="Preview Logo" className="mt-2 w-24 h-24 object-cover rounded" />}

                        <label>Image:</label>
                        <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="border p-2 w-full" />
                        {preview.image && <img src={preview.image} alt="Preview Image" className="mt-2 w-24 h-24 object-cover rounded" />}
                    </>
                )}

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {editingGuest ? "Update" : "Submit"}
                </button>
            </form>

            <h2 className="text-lg font-bold mt-6">List Guests</h2>
            {guests.map((guest) => (
                <div key={guest.id} className="border p-4 rounded mt-2 flex justify-between">
                    <div>
                        <p>{guest.name} - {guest.event}</p>
                        <button onClick={() => handleEdit(guest)} className="text-blue-500">Edit</button>
                        <button onClick={() => handleDelete(guest.id)} className="text-red-500 ml-2">Hapus</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
