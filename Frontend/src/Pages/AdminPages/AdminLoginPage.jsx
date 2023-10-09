import React from "react";
import AdminLogin from "../../Components/AdminComponents/AdminLogin";
import AdminNavBar from "../../Components/AdminComponents/AdminNavBar";

function AdminLoginPage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AdminNavBar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminLogin />
      </div>
    </div>
  );
}

export default AdminLoginPage;
