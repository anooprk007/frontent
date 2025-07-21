import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8000/api/rooms/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setRoom(data);
        setLoading(false);
        console.log("Room fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching room:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!room) return <div className="p-4">Room not found.</div>;


  

  const handleBooking = () => {
    const isLoggedIn = localStorage.getItem("access") !== null;
    
    if (!isLoggedIn) {
      alert("Please login to book a room!");
      navigate("/login");
      return;
    }

    // If logged in, go to booking page
    navigate(`/booking/${room.id}`);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h2 className="text-3xl font-bold">{room.name}</h2>
      <p className="mt-2 text-gray-600">{room.description}</p>
      <p className="mt-2">Beds: {room.beds}, Capacity: {room.capacity}</p>
      <p className="mt-2 text-lg font-semibold">₹{room.price}</p>

     

<Link
  to={`/booking/${room.id}`}
  className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
  onClick={handleBooking}
>
  Booking
</Link>

    </div>
  );
}
