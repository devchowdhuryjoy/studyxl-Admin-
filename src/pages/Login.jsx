// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "../Api/ApiBaseUrl";
// import Swal from "sweetalert2";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("email", email);
//       formData.append("password", password);

//       const res = await fetch(`${BASE_URL}/admin/login`, {
//         method: "POST",
//         headers: { Accept: "application/json" },
//         body: formData,
//       });

//       const result = await res.json();
//       console.log("login result", result);

//       if (result.status && result.token) {
//         //Save token for API calls
//         localStorage.setItem("auth", JSON.stringify({ user: result.user }));
//         localStorage.setItem("admin_token", result.token);

//         Swal.fire("Success", result.message || "Login successful!", "success").then(() => {
//           navigate("/dashboard");
//         });
//       } else {
//         Swal.fire("Error", result.message || "Invalid credentials", "error");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       Swal.fire("Error", "Something went wrong. Try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "../Api/ApiBaseUrl";
// import Swal from "sweetalert2";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("email", email);
//       formData.append("password", password);

//       // প্রথমে main admin হিসেবে login চেষ্টা করবে
//       const response = await fetch(`${BASE_URL}/admin/login`, {
//         method: "POST",
//         headers: { Accept: "application/json" },
//         body: formData,
//       });

//       let result = await response.json();
      
//       // যদি main admin login fail করে, তাহলে sub-admin হিসেবে চেষ্টা করবে
//       if (!result.status || !result.token) {
//         const subAdminResponse = await fetch(`${BASE_URL}/admin/admin-user/login`, {
//           method: "POST",
//           headers: { Accept: "application/json" },
//           body: formData,
//         });
        
//         result = await subAdminResponse.json();
//       }

//       if (result.token) {
//         // টোকেন এবং ইউজার তথ্য সেভ করি
//         localStorage.setItem("admin_token", result.token);
//         localStorage.setItem("admin_user", JSON.stringify(result.user));
        
//         // পারমিশনগুলো fetch করে সেভ করি
//         const token = result.token;
//         const permResponse = await fetch(`${BASE_URL}/admin/my-permissions`, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         const permResult = await permResponse.json();
//         if (permResult.permissions) {
//           localStorage.setItem("admin_permissions", JSON.stringify(permResult.permissions));
//         }

//         Swal.fire("Success", "Login successful!", "success").then(() => {
//           navigate("/dashboard");
//         });
//       } else {
//         Swal.fire("Error", result.message || "Invalid credentials", "error");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       Swal.fire("Error", "Something went wrong. Try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded shadow-md w-80"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Api/ApiBaseUrl"; //
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      // 
      const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      let result = await response.json();
      
      // 
      if (!result.status || !result.token) {
        const subAdminResponse = await fetch(`${BASE_URL}/admin/admin-user/login`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        
        result = await subAdminResponse.json();
      }

      if (result.token) {
        // 
        localStorage.setItem("admin_token", result.token);
        if (result.user) {
          localStorage.setItem("admin_user", JSON.stringify(result.user));
        }
        
        // 
        const token = result.token;
        const permResponse = await fetch(`${BASE_URL}/admin/my-permissions`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const permResult = await permResponse.json();
        if (permResult.permissions) {
          localStorage.setItem("admin_permissions", JSON.stringify(permResult.permissions));
        } else {
          // 
          localStorage.setItem("admin_permissions", JSON.stringify([]));
        }

        Swal.fire("Success", "Login successful!", "success").then(() => {
          navigate("/dashboard");
        });
      } else {
        Swal.fire("Error", result.message || "Invalid credentials", "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;