import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Logo from "../assets/Logo.svg";
import LoginService from "../Services/LoginService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  const slides = [
    {
      title: ["Secure &", "Intelligent", "Risk Monitoring"], // "&" stays with the previous word
      description:
        "Effortlessly monitor transactions, detect risks, and take immediate action with our advanced AML platform",
    },
    {
      title: ["AI-Powered", "Fraud", "Detection"],
      description:
        "Leverage cutting-edge AI technology to identify suspicious activities and prevent financial crimes in real-time.",
    },
    {
      title: ["Automated", "Compliance &", "Reporting"], // "&" stays with the previous word
      description:
        "Stay compliant with evolving regulations using automated reporting and real-time risk analysis.",
    },
  ];



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    try {
      const response = await LoginService.login({ username, password });
      sessionStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setError('');
  }, [username, password])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Main container with full height */}
      <div className="flex flex-col md:flex-row h-screen w-full">
        {/* Left side content */}
        {/* <div className="flex flex-col justify-center p-8 md:p-16 md:w-1/2 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Secure & <br />
            Intelligent <br />
            Risk Monitoring
          </h1>
          <p className="text-blue-100 mb-8 max-w-md">
            Effortlessly monitor transactions, detect risks, and take
            immediate action with our advanced AML platform
          </p>

          <div className="hidden md:block mt-16">
            <div className="w-16 h-1 bg-blue-300 mb-6"></div>
            <div className="flex space-x-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${activeIndex === index ? "bg-blue-300" : "bg-black"
                    } ${activeIndex !== index ? "opacity-60" : ""}`}
                ></div>
              ))}

            </div>
          </div>
        </div> */}

        <div className="flex flex-col justify-center p-8 md:p-16 md:w-1/2 text-white">
          {/* Set a minimum height to prevent content shifting */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 min-h-[140px] flex flex-col justify-center">
            {slides[activeIndex].title.map((line, index) => (
              <span key={index}>{line} <br /></span>
            ))}
          </h1>

          {/* <p className="text-blue-100 mb-4 max-w-md">{slides[activeIndex].description}</p> */}
          <p className="text-blue-100 mb-4 max-w-md line-clamp-2 overflow-hidden">
            {slides[activeIndex].description}
          </p>

          {/* Slider Indicators (Fixed Positioning) */}
          <div className="hidden md:block mt-8">
            <div className="w-16 h-1 bg-blue-300 mb-6"></div>
            <div className="flex space-x-4">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${activeIndex === index ? "bg-blue-300" : "bg-black opacity-60"
                    }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side login form - now with h-full to match parent height */}
        <div className="w-full md:w-1/2 h-full bg-white flex items-center justify-center relative">
          <div className="max-w-md mx-auto w-full">
            {/* <div className="absolute top-4 left-4 flex items-center">
              <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
              <span className="font-semibold text-gray-800">Secure Connect</span>
            </div> */}
            <div className="py-8 px-6 md:p-12">
              {/* <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2> */}
              <div className=" items-center flex mb-2">
                <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
                <span className="font-semibold text-gray-800">Secure Connect</span>
              </div>
              <p className="text-gray-500 mb-4">Please login to your account</p>
              {error && (
                <div className="mb-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-3" />
                    <input
                      id="username"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-3" />
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                </div>




                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a href="#" className="text-blue-600 font-medium hover:underline">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;