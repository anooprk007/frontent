import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/rooms/${roomId}/`)
      .then((res) => res.json())
      .then((data) => setRoom(data))
      .catch((err) => console.error("Error loading room:", err));
  }, [roomId]);

  const handleProceed = () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates before continuing.");
      return;
    }

    // ✅ Navigate only when button is clicked
    navigate(`/payment/${room.id}`, {
      state: {
        room,
        checkIn: checkIn instanceof Date ? checkIn.toISOString() : null,
        checkOut: checkOut instanceof Date ? checkOut.toISOString() : null,
      },
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Booking Page</h1>
      {!room ? (
        <p>Loading room info...</p>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p className="text-gray-700">{room.description}</p>
            <p className="text-green-600 font-bold mt-2">₹{room.price} / night</p>
          </div>

          <div className="mt-6 border rounded p-4">
            <h3 className="font-semibold text-lg mb-4">Select Your Dates</h3>
            <div className="flex flex-col gap-4 max-w-sm">
              <div>
                <label className="block text-sm font-medium">Check-In Date</label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={new Date()}
                  className="w-full p-2 border rounded mt-1"
                  placeholderText="Select check-in date"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Check-Out Date</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn || new Date()}
                  className="w-full p-2 border rounded mt-1"
                  placeholderText="Select check-out date"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleProceed}
            className={`mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
              !checkIn || !checkOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!checkIn || !checkOut}
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}
