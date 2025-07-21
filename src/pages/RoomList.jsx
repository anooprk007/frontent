import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/rooms/")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
        setFilteredRooms(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, []);

  // Filter rooms when searchTerm changes
  useEffect(() => {
    const filtered = rooms.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(filtered);
  }, [searchTerm, rooms]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by room name..."
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))
          ) : (
            <p>No rooms found.</p>
          )}
        </div>
      )}
    </div>
  );
}
