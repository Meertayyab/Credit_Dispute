// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { Eye, EyeOff } from "lucide-react";
// import {axiosinstance} from "../components/AxiosInstance"

// export default function AuthPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { token } = useParams();
//   const [mode, setMode] = useState("login");

//   // ✅ Detect route mode
//   useEffect(() => {
//     if (location.pathname.includes("signup")) setMode("signup");
//     else if (location.pathname.includes("forgot-password")) setMode("forgot-password");
//     else if (location.pathname.includes("reset-password")) setMode("reset-password");
//     else setMode("login");
//   }, [location.pathname]);

//   // ✅ If token already exists and not expired, redirect to dashboard
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const expiry = localStorage.getItem("tokenExpiry");
//     if (token && expiry && Date.now() < Number(expiry)) {
//       navigate("/dashboard");
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
//     return regex.test(password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (mode === "forgot-password") {
//         const { data } = await axiosinstance.post("http://localhost:5000/api/auth/forgot-password", {
//           email: formData.email,
//         });
//         toast.success("📧 Reset link sent to your email");
//         navigate("/auth/login");

//       } else if (mode === "reset-password") {
//         const { data } = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
//           newPassword: formData.password,
//         });
//         toast.success(data.message);
//         navigate("/auth/login");

//       } else {
//         if (mode === "signup") {
//           if (!validatePassword(formData.password)) {
//             toast.error("Password must include uppercase, lowercase, number & symbol");
//             return;
//           }
//           if (formData.password !== formData.confirmPassword) {
//             toast.error("Passwords do not match.");
//             return;
//           }
//         }

//         const endpoint =
//           mode === "signup"
//             ? "http://localhost:5000/api/auth/signup"
//             : "http://localhost:5000/api/auth/login";

//         const body =
//           mode === "signup"
//             ? formData
//             : { email: formData.email, password: formData.password };

//         const { data } = await axios.post(endpoint, body);

//         if (mode === "signup") {
//           toast.success("✅ Signup successful. Please check your email.");
//         } else {
//           toast.success("✅ Login successful");

//           // ✅ Store token and 1-hour expiry
//           const oneHourFromNow = Date.now() + 3600 * 1000;
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("tokenExpiry", oneHourFromNow.toString());

//           navigate("/dashboard");
//         }
//       }
//     } catch (error) {
//       const msg =
//         error.response?.data?.message || error.response?.data?.error || "Something went wrong";
//       toast.error("❌ " + msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderForm = () => {
//     if (mode === "forgot-password") {
//       return (
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="Enter your registered email"
//             required
//             onChange={handleChange}
//           />
//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Sending..." : "Send Reset Link"}
//           </Button>
//         </form>
//       );
//     }

//     if (mode === "reset-password") {
//       return (
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <Label htmlFor="password">New Password</Label>
//           <Input
//             id="password"
//             name="password"
//             type="password"
//             placeholder="Enter new password"
//             required
//             onChange={handleChange}
//           />
//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Resetting..." : "Reset Password"}
//           </Button>
//         </form>
//       );
//     }

//     return (
//       <Tabs
//         value={mode}
//         onValueChange={(val) => {
//           setMode(val);
//           navigate(`/auth/${val}`);
//         }}
//         className="w-full"
//       >
//         <TabsList className="grid w-full grid-cols-2 mb-6">
//           <TabsTrigger value="login">Login</TabsTrigger>
//           <TabsTrigger value="signup">Signup</TabsTrigger>
//         </TabsList>

//         <TabsContent value="login">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="you@example.com"
//               required
//               onChange={handleChange}
//             />
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               required
//               onChange={handleChange}
//             />
//             <div className="text-right">
//               <button
//                 type="button"
//                 onClick={() => navigate("/auth/forgot-password")}
//                 className="text-sm text-blue-500 hover:underline"
//               >
//                 Forgot Password?
//               </button>
//             </div>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//         </TabsContent>

//         <TabsContent value="signup">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               id="name"
//               name="name"
//               placeholder="John Doe"
//               required
//               onChange={handleChange}
//             />
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" name="email" type="email" required onChange={handleChange} />
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               required
//               onChange={handleChange}
//             />
//             <Label htmlFor="confirmPassword">Confirm Password</Label>
//             <Input
//               id="confirmPassword"
//               name="confirmPassword"
//               type={showConfirm ? "text" : "password"}
//               placeholder="••••••••"
//               required
//               onChange={handleChange}
//             />
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Signing up..." : "Signup"}
//             </Button>
//           </form>
//         </TabsContent>
//       </Tabs>
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
//       <Card className="w-full max-w-md shadow-2xl border border-gray-200">
//         <CardContent className="p-8">
//           <h1 className="text-2xl font-bold text-center mb-6">
//             {mode === "signup"
//               ? "Create an Account"
//               : mode === "forgot-password"
//               ? "Forgot Password"
//               : mode === "reset-password"
//               ? "Reset Password"
//               : "Welcome Back"}
//           </h1>
//           {renderForm()}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// 📁 src/app/AuthPage.jsx
"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../components/AxiosInstance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useParams();
  const [mode, setMode] = useState("login");

  useEffect(() => {
    if (location.pathname.includes("signup")) setMode("signup");
    else if (location.pathname.includes("forgot-password"))
      setMode("forgot-password");
    else if (location.pathname.includes("reset-password"))
      setMode("reset-password");
    else setMode("login");
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");
    if (token && expiry && Date.now() < Number(expiry)) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "forgot-password") {
        const { data } = await axiosInstance.post("/auth/forgot-password", {
          email: formData.email,
        });
        toast.success("📧 Reset link sent to your email");
        navigate("/auth/login");
      } else if (mode === "reset-password") {
        const { data } = await axiosInstance.post(
          `/auth/reset-password/${token}`,
          {
            newPassword: formData.password,
          }
        );
        toast.success(data.message);
        navigate("/auth/login");
      } else {
        if (mode === "signup") {
          if (!validatePassword(formData.password)) {
            toast.error(
              "Password must include uppercase, lowercase, number & symbol"
            );
            return;
          }
          if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
          }
        }

        const endpoint = mode === "signup" ? "/auth/signup" : "/auth/login";

        const body =
          mode === "signup"
            ? formData
            : { email: formData.email, password: formData.password };

        const { data } = await axiosInstance.post(endpoint, body);

        if (mode === "signup") {
          toast.success(data.message);
        } else {
          toast.success(data.message);

          const oneHourFromNow = Date.now() + 3600 * 1000;
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("tokenExpiry", oneHourFromNow.toString());

          navigate("/dashboard");
        }
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong";
      toast.error("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    if (mode === "forgot-password") {
      return (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your registered email"
            required
            onChange={handleChange}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      );
    }

    if (mode === "reset-password") {
      return (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              required
              onChange={handleChange}
              className="pr-10"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      );
    }

    return (
      <Tabs
        value={mode}
        onValueChange={(val) => {
          setMode(val);
          navigate(`/auth/${val}`);
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              onChange={handleChange}
            />
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                onChange={handleChange}
                className="pr-10"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/auth/forgot-password")}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              onChange={handleChange}
            />
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                onChange={handleChange}
                className="pr-10"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                required
                onChange={handleChange}
                className="pr-10"
              />
              <div
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            {mode === "signup"
              ? "Create an Account"
              : mode === "forgot-password"
              ? "Forgot Password"
              : mode === "reset-password"
              ? "Reset Password"
              : "Welcome Back"}
          </h1>
          {renderForm()}
        </CardContent>
      </Card>
    </div>
  );
}
