import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/user/login`, { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };
    

    return (
        <div className="font-[sans-serif] bg-[#1C1C1E] md:h-screen text-gray-300">
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                
                {/* Form Section */}
                <div className="flex items-center md:p-8 p-6 bg-[#121212] h-full lg:w-11/12 lg:mr-auto rounded-lg shadow-lg">
                    <form className="max-w-lg w-full mx-auto">
                        <div className="mb-12">
                            <h3 className="text-3xl font-bold text-cyan-500">Welcome Back!</h3>
                            <p className="text-gray-400 mt-2 text-sm">Login to access your account</p>
                        </div>

                        {/* Email Input */}
                        <div>
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

                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between items-center mt-8">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 rounded bg-[#1C1C1E] border-gray-600" />
                                <label htmlFor="remember-me" className="text-gray-400 ml-3 block text-sm">
                                    Remember Me
                                </label>
                            </div>
                            <a href="javascript:void(0);" className="text-cyan-400 text-sm hover:underline">Forgot Password?</a>
                        </div>

                        {/* Login Button */}
                        <div className="mt-12">
                            <button onClick={handleLogin} type="button" className="w-max shadow-lg py-3 px-6 text-sm text-gray-900 font-semibold rounded-md bg-cyan-500 hover:bg-cyan-600 focus:outline-none">
                                Login
                            </button>
                            <p className="text-sm text-gray-400 mt-8">Don't have an account? <a href="/register" className="text-cyan-500 font-semibold hover:underline ml-1">Register here</a></p>
                        </div>

                    </form>
                </div>

                {/* Image Section */}
                <div className="max-md:order-1 p-4">
                    <img 
                        src="https://readymadeui.com/login-image.webp" 
                        className="lg:max-w-[85%] w-full h-full object-contain block mx-auto" 
                        alt="login-image" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
