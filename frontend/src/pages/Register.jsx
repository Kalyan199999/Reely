import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { useAuth } from "../config/AuthContext";
import useApi from "../customHooks/useApiPost"; 

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Register = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const { triggerPost } = useApi();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleRegister = async (e)=>{
    e.preventDefault();

    const newErrors = {};

    if(user.username === ""){
       newErrors.username = "User name require";
    }

    const pass = user.password.trim();

    if (!pass) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(user.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include upper and lower case letters, a number, and a special character.";
    }

    const mail = user.email.trim()

    // Validate the email and password
    if (!mail) newErrors.email = "Email is required.";
    else if(!mail.includes('@gmail.com')) newErrors.email = "Email should have @gmail.com.";
    else if(mail.indexOf('@gmail.com') === 0) newErrors.email = "Email should have the domain name."

    const phone = user.phone.trim();
    const phoneRegex = /^\d+$/; // Regular expression to match only digits
    
    if( phone !== "" && !phoneRegex.test(phone)) newErrors.phone = "Phone number should be digits only."
    else if( phone !== "" && phone.length !== 10) newErrors.phone = "Phone number should be 10 digits long."

    
    if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
    }

    const res = await triggerPost( "http://localhost:5050/api/user" , user);

    login(res);
    navigate("/");
    
  }

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleRegister} 
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

        <div className="space-y-4">
          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={`w-full p-3 border rounded ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
              value={user.username}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Email */}
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={`w-full p-3 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
              value={user.name}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className={`w-full p-3 border rounded ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
              value={user.phone}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
  Already registered?{" "}
  <span
    className="text-blue-600 hover:underline cursor-pointer"
    onClick={() => navigate("/login")}
  >
    Login
  </span>
</div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>

        </div>      
        
        </form>
    </div>
  );
};

export default Register;
