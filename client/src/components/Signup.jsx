import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/user/signup", {
        name,
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-saffron-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-krishna-blue-900">
            Sign up
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your information to create an account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-krishna-blue-500 focus:border-krishna-blue-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-krishna-blue-500 focus:border-krishna-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-krishna-blue-500 focus:border-krishna-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-krishna-blue-500 focus:border-krishna-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-krishna-blue-900 hover:bg-krishna-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-krishna-blue-500"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color={"#fff"} /> : "Sign up"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <a
            href="/signin"
            className="font-medium text-krishna-blue-900 hover:text-krishna-blue-800"
          >
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
