import React from "react";

const AgentDashboard = React.lazy(() =>
  import("../../components/agent/dashboard/AgentDashboard.jsx")
);

const Dashboard = () => {
  return (
    <div className="row g-3 mb-3">
      <AgentDashboard />
    </div>
  );
};

export default Dashboard;
