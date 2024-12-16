import { useState } from "react";
import Button from "../ui/Button";
import Header from "../ui/Header";
import InputBox from "../ui/InputBox";
import SubHeading from "../ui/SubHeading";
import WarningBottom from "../ui/WarningBottom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // Only one name field now
  const [username, setUsername] = useState(""); // Username input
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [loading, setLoading] = useState(false);

  // Signup function
  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/user/signup", {
        name, // Using 'name' instead of first and last name
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Save token on successful signup
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-400 relative">
      <div className="rounded-lg flex flex-col items-center my-14 mx-6 sm:mx-10 sm:m-2 p-6 bg-white shadow-xl w-full max-w-lg gap-4 h-full sm:h-[75%] overflow-y-auto">
        <Header label="Sign up" />
        <SubHeading label="Enter your information to create an account" />

        {/* Name input */}
        <InputBox
          onChange={(e) => setName(e.target.value)}
          label="Name"
          placeholder="John Doe"
          type="text"
        />

        {/* Username input */}
        <InputBox
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          placeholder="1234567890"
          type="text"
        />

        {/* Email input */}
        <InputBox
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="john.doe@example.com"
          type="email" // Email input type
        />

        {/* Password input */}
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="password123"
          type="password" // Password input type
        />

        {/* Sign up button */}
        <Button
          onClick={handleSignup}
          label={loading ? <ClipLoader size={20} color={"#fff"} /> : "Sign up"}
          disabled={loading}
        />

        <div className="mt-auto">
          {/* Warning bottom, link to sign in page */}
          <WarningBottom
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
}
