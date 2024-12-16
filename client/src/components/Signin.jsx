import { useState } from "react";
import Button from "../ui/Button";
import Header from "../ui/Header";
import InputBox from "../ui/InputBox";
import SubHeading from "../ui/SubHeading";
import WarningBottom from "../ui/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Username
  const [password, setPassword] = useState(""); // Password
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  const handleSignin = async () => {
    setLoading(true);
    setErrorMessage(""); // Clear previous error
    try {
      // Send username and password to the backend
      const response = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });

      // Assuming the response contains the token
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Set the token in axios default headers for subsequent requests
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during signin:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200 px-4 sm:px-8">
      <div className="rounded-lg flex flex-col p-6 w-full max-w-md space-y-4 bg-white shadow-xl">
        <Header label="Sign in" />
        <SubHeading label="Enter your credentials to access your account" />

        {/* Username input field */}
        <InputBox
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          placeholder="Enter your username (e.g., phone number)"
        />

        {/* Password input field */}
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="********"
          type="password"
        />

        {/* Error message */}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSignin}
          label={loading ? <ClipLoader size={20} color={"#fff"} /> : "Sign in"}
          disabled={loading}
        />

        {/* Warning for users who don't have an account */}
        <WarningBottom
          label="Don't have an account?"
          buttonText="Sign up"
          to="/signup"
        />
      </div>
    </div>
  );
}
