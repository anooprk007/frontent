import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      alert("Please login to access the dashboard");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/api/my-bookings/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => {
        console.error("Error:", err);
        // navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-3 rounded shadow">
              <p><strong>Room:</strong> {booking.room}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Booked On:</strong> {new Date(booking.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
