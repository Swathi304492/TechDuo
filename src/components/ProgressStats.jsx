import React from "react";
import AnimatedStat from "./AnimatedStat";

const ProgressStats = ({ stats }) => {
  return (
    <div className="stats-container">
      <h2>Your Learning Progress</h2>

      <div className="progress-list">
        {/* 1️⃣ Learning / Overall Score */}
        <AnimatedStat
          label="Learning Completed"
          completed={stats.totalScore}
          showTotal={false}
        />

        {/* 2️⃣ Quizzes */}
        <AnimatedStat
          label="Quizzes Completed"
          completed={25}
          total={50}
        />

        {/* 3️⃣ Courses */}
        <AnimatedStat
          label="Courses Completed"
          completed={10}
          total={100}
        />
      </div>
    </div>
  );
};

export default ProgressStats;
