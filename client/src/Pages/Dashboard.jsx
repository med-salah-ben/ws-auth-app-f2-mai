import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.authReducer.user);
  const loadingUser = useSelector((state) => state.authReducer.isLoading);
  return (
    <div>
      <h2>Welcome To dashboard</h2>
      {loadingUser ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3> {user.name} </h3>
          <h3> {user.lastName} </h3>
          <h3> {user.email} </h3>
        </>
      )}
    </div>
  );
};

export default Dashboard;
