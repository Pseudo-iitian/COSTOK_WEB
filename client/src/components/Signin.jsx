import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://costok-web-talh-5ez27bqpj-pseudo-iitians-projects.vercel.app/login",
        {
          username,
          password,
        }
      );
      console.log("Login response:", response.data); // Log the response
  
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        navigate("/dashboard");
      } else {
        setErrorMessage("No token received. Please try again.");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-saffron-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-krishna-blue-900">
            Sign in
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-krishna-blue-500 focus:border-krishna-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
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

          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-krishna-blue-900 hover:bg-krishna-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-krishna-blue-500"
              onClick={handleSignin}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color={"#fff"} /> : "Sign in"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link
            to="/"
            className="font-medium text-krishna-blue-900 hover:text-krishna-blue-800"
          >
            Already have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
