import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { useAuth } from "../config/AuthContext";
import useApi from '../customHooks/useApiPost'

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const { triggerPost } = useApi()
  

  const [user, setUser] = useState({

    email: "",
    password: ""

  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setUser({ ...user, [name]: value });

    // Clear error on input
    setErrors({ ...errors, [name]: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};

    const mail = user.email.trim()

    // Validate the email and password
    if (!mail) newErrors.email = "Email is required.";
    else if(!mail.includes('@gmail.com')) newErrors.email = "Email should have @gmail.com.";
    else if(mail.indexOf('@gmail.com') === 0) newErrors.email = "Email should have the domain name."

    const pass = user.password.trim();

    if (!pass) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(user.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include upper and lower case letters, a number, and a special character.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const url = "http://localhost:5050/api/user/login";

    const res = await triggerPost(url,user)
    
    login( res );

    navigate("/");

  };

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-gray-100 p-4">

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full p-3 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            onChange={handleChange}
            value={user.email}
          />

          {
            errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full p-3 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            onChange={handleChange}
            value={user.password}
          />

          {
            errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="text-center text-sm text-gray-600 mt-4">
            Not a user?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

      </form>
      
    </div>
  );
};

export default Login;