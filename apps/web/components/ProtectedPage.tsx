"use client";
import { useEffect, useState, ReactNode } from "react";

interface ProtectedPageProps {
  children: ReactNode;
}

const PASSWORD = "breathtesteeer";

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedPassword = localStorage.getItem("production_auth");
    if (storedPassword === PASSWORD) {
      setAuthorized(true);
    }
  }, []);

  const handleLogin = () => {
    if (input === PASSWORD) {
      localStorage.setItem("production_auth", PASSWORD);
      setAuthorized(true);
      setError("");
    } else {
      setError("Неверный пароль. Попробуйте снова.");
    }
  };

  if (process.env.NODE_ENV !== "production" || authorized) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Please enter the password to access the app
        </h2>
        <input
          type="password"
          placeholder="Enter the password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-150"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
