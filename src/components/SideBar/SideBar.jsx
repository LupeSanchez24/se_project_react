import avatar from "../../assets/avatar.png";
import "./SideBar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <img
        src={avatar}
        alt="Terrence Tegegne"
        className="sidebar__avatar"
      ></img>
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
