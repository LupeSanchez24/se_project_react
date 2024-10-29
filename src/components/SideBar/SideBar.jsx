import avatar from "../../assets/avatar.png";
import "./SideBar.css";
function SideBar({ currentUser }) {
  return (
    <div className="sidebar">
      <img
        src={currentUser?.avatar}
        alt={currentUser?.name}
        className="sidebar__avatar"
      ></img>
      <p className="sidebar__username">{currentUser?.name}</p>
    </div>
  );
}

export default SideBar;
