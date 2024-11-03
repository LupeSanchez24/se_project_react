import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onAddClick,
  currentUser,
  handleProfileChangeClick,
  handleCardLike,
  handleSignout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          handleProfileChangeClick={handleProfileChangeClick}
          handleSignout={handleSignout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
          currentUser={currentUser}
          onCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
