import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL
function Register() {
    const [name ,setName] = useState("");
    const [email , setEmail] = useState("");
    const [password, setPassword]  = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post( `${BASE_URL}/api/user/register`,{name,email,password})
        .then((result) => {
            console.log(result)
            navigate("/login")
        })
        .catch((err) => console.log(err))
    }

  return (

    <div className="font-[sans-serif] bg-[#121212] md:h-screen text-gray-300">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        
        {/* Image Section */}
        <div className="max-md:order-1 p-4">
          <img 
            src="https://readymadeui.com/signin-image.webp" 
            className="lg:max-w-[85%] w-full h-full object-contain block mx-auto" 
            alt="login-image" 
          />
        </div>

        {/* Form Section */}
        <div className="flex items-center md:p-8 p-6 bg-[#1C1C1E] h-full lg:w-11/12 lg:ml-auto rounded-lg shadow-lg">
          <form className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-cyan-500">Create an account</h3>
            </div>

            {/* Full Name Input */}
            <div>
              <label className="text-gray-400 text-xs block mb-2">Full Name</label>
              <div className="relative flex items-center">
                <input 
                  name="name" 
                  type="text" 
                  onChange={(e) => setName(e.target.value)}
                  required 
                  className="w-full bg-transparent text-sm text-gray-200 border-b border-gray-600 focus:border-cyan-500 px-2 py-3 outline-none" 
                  placeholder="Enter name" 
                />
                {/* SVG Icon for Full Name */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  {/* SVG path */}
                </svg>
              </div>
            </div>

            {/* Email Input */}
            <div className="mt-8">
              <label className="text-gray-400 text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input 
                  name="email" 
                  type="text" 
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="w-full bg-transparent text-sm text-gray-200 border-b border-gray-600 focus:border-cyan-500 px-2 py-3 outline-none" 
                  placeholder="Enter email" 
                />
                {/* SVG Icon for Email */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                  {/* SVG path */}
                </svg>
              </div>
            </div>

            {/* Password Input */}
            <div className="mt-8">
              <label className="text-gray-400 text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input 
                  name="password" 
                  type="password"
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full bg-transparent text-sm text-gray-200 border-b border-gray-600 focus:border-cyan-500 px-2 py-3 outline-none" 
                  placeholder="Enter password" 
                />
                {/* SVG Icon for Password */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  {/* SVG path */}
                </svg>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center mt-8">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 rounded bg-[#1C1C1E] border-gray-600" />
              <label htmlFor="remember-me" className="text-gray-400 ml-3 block text-sm">
                I accept the <a href="javascript:void(0);" className="text-cyan-400 font-semibold hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div>

            {/* Register Button */}
            <div className="mt-12">
              <button onClick={handleSubmit} type="button" className="w-max shadow-lg py-3 px-6 text-sm text-gray-900 font-semibold rounded-md bg-cyan-500 hover:bg-cyan-600 focus:outline-none">
                Register
              </button>
              <p className="text-sm text-gray-400 mt-8">Already have an account? <a href="javascript:void(0);" className="text-cyan-500 font-semibold hover:underline ml-1">Login here</a></p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
