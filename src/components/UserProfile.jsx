
import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import ProgressStats from "../components/ProgressStats";

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
      totalScore: 920, // overall points or % depending on your AnimatedStat
    });
  }, []);

  if (!user || !stats) return <h2>Loading...</h2>;

  return (
    <>
      {/* Inline pastel theme (same tokens as Hero/Login) */}
      <style>{`
        :root{
          --bg: #f0fbff;
          --bg-soft: #e8f9f1;
          --card: #e6f2ff;
          --accent: #9be7d9;      /* mint green */
          --accent-2: #a3c4f3;    /* soft blue */
          --text: #0e2a36;
          --muted: #50708a;
          --success: #94e2c6;
          --danger: #f59fb0;
          --warning: #ffd6a5;
          --chip: #eafaf5;
          --chip-border: #cdeee2;
          --border: #d9e9ff;
          --input-border: #cfe1ff;
          --shadow: 0 8px 24px rgba(20, 52, 76, .12);
          --radius: 24px;
          --radius-sm: 14px;
          --radius-xs: 10px;
        }
        html, body, #root { height: 100% }
        body{
          margin:0;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue","Noto Sans", Arial;
          color: var(--text);
          background:
            radial-gradient(1100px 700px at 8% -10%, var(--bg-soft) 0%, transparent 60%),
            var(--bg);
        }
        /* Layout */
        .profile-container{
          max-width: 1100px;
          margin: 24px auto;
          padding: 16px;
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 24px;
        }
        @media (max-width: 980px){
          .profile-container{ grid-template-columns: 1fr }
        }

        /* Shared card look */
        .card-like{
          background: linear-gradient(180deg, var(--card), #f1fbf7);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 20px;
        }

        /* ProfileCard styles */
        .profile-card{
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .profile-card::before{
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(600px 240px at 120% -10%, rgba(163,196,243,.25), transparent 60%),
            radial-gradient(600px 240px at -20% 110%, rgba(155,231,217,.25), transparent 60%);
        }
        .avatar{
          width: 90px; height: 90px;
          margin: 6px auto 12px;
          display: grid; place-items: center;
          font-size: 42px;
          border-radius: 50%;
          color: #063a36;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          box-shadow: 0 8px 18px rgba(20, 52, 76, .10);
          border: 2px solid rgba(255,255,255,.7);
        }
        .profile-card h2{
          margin: 6px 0 4px;
          font-size: 22px;
          font-weight: 800;
          color: #1e293b;
        }
        .profile-card p{
          margin: 4px 0;
          color: var(--muted);
          font-size: 14px;
        }
        .profile-badges{
          margin-top: 10px;
          display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;
        }
        .badge{
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          background: var(--chip);
          color: #075a4e;
          border: 1px solid var(--chip-border);
          font-size: 12px;
        }

        /* ProgressStats styles */
        .stats-container h2{
          margin: 0 0 10px;
          font-size: 20px;
          font-weight: 800;
          color: #1e293b;
        }
        .progress-list{
          display: grid;
          gap: 12px;
        }

        /* Optional generic stat row (if you need it inside AnimatedStat) */
        .stat-row{
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px;
          display: grid;
          gap: 8px;
        }
        .progress-outer{
          width: 100%;
          height: 10px;
          background: #e9f6ff;
          border: 1px solid var(--border);
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-inner{
          height: 100%;
          background: linear-gradient(90deg, var(--success), var(--accent-2));
          width: 0%;
          transition: width .4s ease;
        }

        /* Buttons (if needed) */
        .btn{
          appearance:none; border:0; padding:12px 16px; border-radius:12px; font-weight:700; cursor:pointer;
          transition: transform .06s ease, box-shadow .2s ease, background .2s ease;
          background: linear-gradient(135deg, var(--accent), var(--accent-2)); color:#063a36; box-shadow: var(--shadow);
        }
        .btn:active{ transform: scale(.98) }

        /* Focus visibility */
        :focus-visible{ outline: 3px solid rgba(163,196,243,.45); outline-offset: 2px; }
      `}</style>

      <div className="profile-container">
        {/* Left: Profile */}
        <div className="profile-card card-like">
          <ProfileCard user={user} />
        </div>

        {/* Right: Stats */}
        <div className="stats-container card-like">
          <ProgressStats stats={stats} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
