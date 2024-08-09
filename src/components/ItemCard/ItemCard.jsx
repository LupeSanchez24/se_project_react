import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div className="cards__list_container">
      <h2 className="cards__list_name">{item.name}</h2>
      <img className="cards__list_image" src={item.link} alt={item.name} />
    </div>
  );
}

export default ItemCard;
