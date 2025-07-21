export default function RoomCard({ room }) {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white">
      <img
        src={room.image}
        alt={room.name}
        className="rounded-md h-40 w-full object-cover"
      />

      <h2 className="text-lg font-semibold mt-2">{room.name}</h2>
      <p>{room.is_ac ? "AC" : "Non-AC"} · {room.beds} Beds · ₹{room.price}</p>
      <a
        href={`/rooms/${room.id}`}
        className="text-blue-600 hover:underline"
      >
        View Details
      </a>
    </div>
    
  );
}
