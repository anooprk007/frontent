import { Link } from "react-router-dom";

export default function Home() {
  return (
      
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-cover bg-center h-[400px] flex items-center justify-center text-white" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?hotel,room")' }}>
        <div className="bg-black bg-opacity-60 p-6 rounded-xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Book My Room</h1>
          <p className="text-lg mb-6">Find your perfect stay — affordable, clean, and cozy!</p>
          <Link to="/rooms" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white font-semibold transition">
            View Rooms
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-12 text-center">
        <h2 className="text-2xl font-bold mb-8">Why Book With Us?</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Clean & Safe Rooms</h3>
            <p>All our rooms are cleaned thoroughly with regular sanitization for your safety.</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
            <p>We offer budget-friendly options for every kind of traveler without compromising quality.</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p>Simple and quick booking process with instant confirmation. Pay online or on arrival.</p>
          </div>
        </div>
      </section>
    </div>
    
  );
}
