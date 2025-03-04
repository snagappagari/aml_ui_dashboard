import { useState } from "react";
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center mb-6">
        <img src={Logo} alt="Logo" className="w-10 h-10 mr-2" />
        <span className="font-semibold text-gray-800">Secure Connect</span>
      </div>

      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold text-gray-800">Welcome</h2>
        <small className="text-gray-500 mb-6">Enter your credentials to access your account.</small>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-lg bg-[#3B82F6] text-white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <div className="text-center mt-4">
        <a href="#" className="text-sm text-black-500 hover:underline">
          Forgot Your Password?
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
