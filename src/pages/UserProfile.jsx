import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfileCard from "../components/ProfileCard";
import ProgressStats from "../components/ProgressStats";
import "../styles/userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // MOCK DATA (UI ONLY)
    setUser({
      name: "Abhishek",
      email: "abhishek@gmail.com",
      phone: "9876543210",
    });

    setStats({
      courseCompletion: 75,
      quizCompletion: 60,
      totalScore: 920,
    });
  }, []);

  if (!user || !stats) return <h2 style={{ color: "white" }}>Loading...</h2>;

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ProfileCard user={user} />
      <ProgressStats stats={stats} />
    </motion.div>
  );
};

export default UserProfile;
