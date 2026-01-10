import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import ProgressStats from "../components/ProgressStats";
import "../styles/userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setUser({
      name: "Abhishek",
      email: "abhishek@gmail.com",
      phone: "9876543210",
    });

    setStats({
      totalScore: 920,
    });
  }, []);

  if (!user || !stats) return <h2>Loading...</h2>;

  return (
    <div className="profile-container">
      <ProfileCard user={user} />
      <ProgressStats stats={stats} />
    </div>
  );
};

export default UserProfile;
