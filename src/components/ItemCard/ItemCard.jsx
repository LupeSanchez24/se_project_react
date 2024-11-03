import "./ItemCard.css";
import { useContext } from "react";
import liked from "../../assets/like-active.svg";
import disliked from "../../assets/like.svg";
import CurrentUserContext from "../Contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked =
    currentUser &&
    Array.isArray(item.likes) &&
    item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleCardLike = (evt) => {
    evt.preventDefault();
    onCardLike({ id: item._id, isLiked });
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser && (
        <img
          className="card__like-btn"
          src={isLiked ? liked : disliked}
          alt={isLiked ? "liked" : "disliked"}
          onClick={handleCardLike}
        />
      )}

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
