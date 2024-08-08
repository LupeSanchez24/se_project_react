import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards"></section>
      <p className="cards__text">Today is 75 &deg; F / You may want to wear:</p>
      {/*TODO + add the cards*/}
    </main>
  );
}

export default Main;
