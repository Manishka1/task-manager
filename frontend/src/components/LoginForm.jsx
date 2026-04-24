import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login({ email, password: pw }));
    if (!res.error) history.push("/dashboard");
  };

  return (
    <>
     

      <div style={container}>
        <div style={wrapper}>
          
          <form onSubmit={handleSubmit} style={card}>
            <h2 style={heading}>Welcome Back</h2>
            <p style={subtext}>
              Manage your team, tasks, and workflow — all in one place.
            </p>

            <input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={input}
              onFocus={(e) => (e.target.style.border = "1px solid #a855f7")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255,255,255,0.15)")
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              style={input}
              onFocus={(e) => (e.target.style.border = "1px solid #a855f7")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255,255,255,0.15)")
              }
            />

            <button
              style={button}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.04)";
                e.target.style.boxShadow =
                  "0 0 50px rgba(171,0,255,0.8)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 0 25px rgba(171,0,255,0.4)";
              }}
            >
              {auth.status === "pending" ? "Logging in..." : "Login"}
            </button>
          </form>

        
          <div style={infoCard}>
            <h3 style={infoTitle}>Explore Role-Based Access</h3>
            <p style={infoText}>
              Try demo accounts to experience how permissions change
              between Admin and User roles.
            </p>

            <div style={roleBlock}>
              <span style={roleTitle}>Admin</span>
              <p style={cred}>admin@gmail.com</p>
              <p style={cred}>123456</p>
            </div>

            <div style={roleBlock}>
              <span style={roleTitle}>User</span>
              <p style={cred}>user@gmail.com</p>
              <p style={cred}>123456</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

//styles

const container = {
  minHeight: "100vh",
  background: `
    radial-gradient(circle at 20% 40%, rgba(171,0,255,0.2), transparent 40%),
    radial-gradient(circle at 80% 60%, rgba(120,0,255,0.15), transparent 40%),
    #0b040d
  `,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Inter, sans-serif",
};

const wrapper = {
  display: "flex",
  gap: 80,
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const card = {
  width: 420,
  padding: 40,
  borderRadius: 24,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(25px)",
  boxShadow: "0 0 15px rgba(171,0,255,0.2)",
};

const heading = {
  fontSize: 30,
  fontWeight: 700,
  background: "linear-gradient(90deg,#fff,#c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtext = {
  color: "rgba(255,255,255,0.6)",
  marginTop: 10,
  marginBottom: 20,
};

const input = {
  width: "100%",
  marginTop: 16,
  padding: "14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.03)",
  color: "#fff",
  outline: "none",
};

const button = {
  width: "100%",
  marginTop: 28,
  padding: "14px",
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(90deg,#7f00ff,#e100ff)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  transition: "0.3s",
};

const infoCard = {
  width: 420,
  padding: 40,
  borderRadius: 24,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(25px)",
};

const infoTitle = {
  fontSize: 22,
  fontWeight: 600,
  color: "#fff",
};

const infoText = {
  color: "rgba(255,255,255,0.6)",
  marginTop: 10,
};

const roleBlock = {
  marginTop: 20,
};

const roleTitle = {
  color: "#c084fc",
  fontWeight: 600,
};

const cred = {
  margin: 0,
  fontSize: 13,
  color: "#bbb",
};