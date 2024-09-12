import React from "react";
import { LoginComponents } from "../../components/auth/Login";

export default function Login() {
  return (
    <>
      <LoginComponents />
    </>
  );
}

// // src/pages/Login.js
// import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/auth/login", { email, password });
//       console.log(res.data);
//       // Handle successful login
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = "/api/auth/google";
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl mb-4">Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="mb-4">
//           <label className="block mb-2">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="p-2 border border-gray-300 rounded w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="p-2 border border-gray-300 rounded w-full"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Login
//         </button>
//       </form>
//       <button
//         onClick={handleGoogleLogin}
//         className="bg-red-500 text-white p-2 rounded mt-4"
//       >
//         Login with Google
//       </button>
//     </div>
//   );
// };

// export default Login;
