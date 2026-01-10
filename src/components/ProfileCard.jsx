import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="avatar">🧑‍💻</div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>📞 {user.phone}</p>
      <p>🎓 Fresher</p>
    </div>
  );
};

export default ProfileCard;
