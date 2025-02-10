"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = (e) => {
    e.preventDefault();
    // Add sign-in logic here
    console.log("Email:", email);
    console.log("Password:", password);
    // Redirect to /dashboard after sign-in
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 sm:p-20">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-4 p-8 bg-white shadow-lg border border-gray-300 rounded-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
