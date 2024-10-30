//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  clothingItems,
  onAddClick,
  currentUser,
}) {
  const userClothingItems = clothingItems.filter(
    (item) => item?.owner === currentUser?._id
  );

  const clothesSectionClassName = `clothes-section__items ${
    userClothingItems?.length > 0
      ? "clothes-section__items_visible"
      : "clothes-section__items_hidden"
  }`;
  return (
    <div className="clothes-section">
      <div className="clothes-section__text">
        <p className="clothes-section__existed-items">Your items</p>
        <button onClick={onAddClick} className="clothes-section__add-button">
          {" "}
          + Add New
        </button>
      </div>
      <ul className={clothesSectionClassName}>
        {userClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
