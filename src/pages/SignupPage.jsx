import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
  const res = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok) {
    setMessage("✅ Account created! Redirecting to login...");
    setError("");
    setTimeout(() => navigate("/login"), 2000);  // 👈 Delay redirect for 2 seconds
  } else {
    setError(data.error || "❌ Signup failed");
    setMessage("");
  }
};

  return (
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div className="p-4 max-w-md mx-auto">
       <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <input className="w-full p-2 border rounded mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="w-full p-2 border rounded mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup} className="w-full bg-green-600 text-white py-2 rounded">Sign Up</button>
      {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

    </div>
    </div>
  );
}
