import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useHistory, Link } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div
      style={{
        height: 80,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 50px",
        background: "linear-gradient(135deg, #5a2d86, #883992)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(43, 4, 48, 0.05)",
      }}
    >
      {/* LOGO */}
      <a href="/" style={{ textDecoration: "none" }}>
        <img src="/logo.png" alt="MiniTeam" style={{ height: 45 }} />
      </a>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {user && (
          <button style={ghostBtn} onClick={() => history.push("/pie-chart")}>
            Pie Chart
          </button>
        )}

        {user?.role === "admin" && (
          <button style={ghostBtn} onClick={() => history.push("/users")}>
            Users
          </button>
        )}

        {user ? (
          <button style={outlineBtn} onClick={handleLogout}>
            Logout →
          </button>
        ) : (
          <>
            {/* REGISTER */}
            <Link to="/register" style={btnOuter}>
              <div style={btnInnerDark}>
                Register
                <span style={circleLight}>→</span>
              </div>
            </Link>

            {/* LOGIN */}
            <Link to="/login" style={btnOuterLight}>
              <div style={btnInnerLight}>
                Login
                <span style={circlePurple}>→</span>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

/* STYLES */

const ghostBtn = {
  background: "transparent",
  border: "none",
  color: "#ddd",
  cursor: "pointer",
  fontSize: 14,
};

const outlineBtn = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
};

const btnOuter = {
  textDecoration: "none",
  padding: "0.5px",
  borderRadius: 999,
  background: "#ffffff",
  boxShadow: "0 0 15px rgba(171,0,255,0.25)",
};

const btnInnerDark = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 20px",
  borderRadius: 999,
  background: "linear-gradient(135deg,#020202,#383538)",
  color: "#dfd3e2",
  fontWeight: 600,
};

const btnOuterLight = {
  textDecoration: "none",
  padding: "0.5px",
  borderRadius: 999,
  background: "rgba(10,0,0,0.08)",
  boxShadow: "0 0 25px rgba(171,0,255,0.25)",
};

const btnInnerLight = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 20px",
  borderRadius: 999,
  background: "#fff",
  color: "#0b040d",
  fontWeight: 600,
};

const circleLight = {
  width: 26,
  height: 26,
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#7f00ff",
};

const circlePurple = {
  width: 26,
  height: 26,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#7f00ff,#e100ff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};