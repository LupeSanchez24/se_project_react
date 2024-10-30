import avatar from "../../assets/avatar.png";
import "./SideBar.css";
function SideBar({ currentUser }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="sidebar__user_avatar"
        ></img>
        <p className="sidebar__user_username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__options">
        <p className="sidebar__options_profile">Change profile data</p>
        <p className="sidebar__options_logout">Log out</p>
      </div>
    </div>
  );
}

export default SideBar;
