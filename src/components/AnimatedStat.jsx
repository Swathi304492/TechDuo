import React, { useEffect, useState } from "react";

const AnimatedStat = ({ label, completed, total, showTotal = true }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.max(1, Math.ceil(completed / 40));
      if (current >= completed) {
        current = completed;
        clearInterval(interval);
      }
      setValue(current);
    }, 20);

    return () => clearInterval(interval);
  }, [completed]);

  const percentage = total
    ? Math.min((value / total) * 100, 100)
    : Math.min(value / 10, 100);

  return (
    <div className="progress-item">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-value">
          {showTotal ? `${value} / ${total}` : value}
        </span>
      </div>

      {/* NORMAL PROGRESS BAR */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default AnimatedStat;
