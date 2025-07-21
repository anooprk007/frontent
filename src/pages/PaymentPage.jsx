import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");
  
  const location = useLocation();
  const { room, checkIn, checkOut } = location.state || {};

  // ✅ Convert checkIn and checkOut strings to Date objects
  const formattedCheckIn = checkIn ? new Date(checkIn) : null;
  const formattedCheckOut = checkOut ? new Date(checkOut) : null;

  useEffect(() => {
    if (!room || !formattedCheckIn || !formattedCheckOut) {
      alert("Missing booking info. Redirecting...");
      navigate("/"); // Redirect to homepage or fallback
    }
  }, [room, formattedCheckIn, formattedCheckOut, navigate]);

  const handleProceed = async () => {
    if (!formattedCheckIn || !formattedCheckOut) {
      alert("Please select both check-in and check-out dates before continuing.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/api/rooms/book-room/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room: room.id,
          check_in: formattedCheckIn.toISOString().split("T")[0],
          check_out: formattedCheckOut.toISOString().split("T")[0],
          guests: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaid(true);
        alert("Booking successful!");
      } else {
        alert(data.detail || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment Page</h1>

      {!paid ? (
        <>
          <p className="mb-4">You are about to make payment for Room #{roomId}</p>

          {room && (
            <>
              <h2>{room.name}</h2>
              <p>Check-in: {formattedCheckIn?.toLocaleDateString()}</p>
              <p>Check-out: {formattedCheckOut?.toLocaleDateString()}</p>
            </>
          )}

          <button
            onClick={handleProceed}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Confirm Payment
          </button>
        </>
      ) : (
        <div className="mt-4 p-4 border border-green-500 rounded bg-green-100 text-green-800">
          ✅ Payment successful! Your booking is being processed...
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
