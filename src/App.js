import React,{useState,useEffect} from 'react'
import "./component/style.css"
import Weathercard from "./component/Weathercard"

const App = () => {
  const [searchValue,setSearchValue] = useState("patna");
  const [tempInfo, setTempInfo] = useState({});

const getWeatherInfo = async () => {
  try{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=91994e7d4b7b7fe15c2fc674ae8ff5fc`;
    let res = await fetch(url);
    let data = await res.json();

    const {temp,humidity,pressure} = data.main;
    const {main: weathermood} = data.weather[0];
    const {name} = data;
    const {speed} = data.wind;
    const {country,sunset} = data.sys;

    const myNewWeatherInfo = {
      temp,
      humidity,
      pressure,
      weathermood,
      name,
      speed,
      country,
      sunset,
    };
    setTempInfo(myNewWeatherInfo);
  }
  catch (error){
    console.log(error);
  }
};

useEffect(() => {
  getWeatherInfo();
});

  return (
    <>
    <div className="wrap">
      <div className="search">
        <input 
        type="search"
        placeholder="Search..."
        autoFocus
        id="search"
        className="searchTerm"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        />

        <button
        className="searchButton"
        type="button"
        onClick={getWeatherInfo}>
          Search
        </button>
      </div>
      
    </div>
    <Weathercard {...tempInfo} />
    </>
  )
}

export default App

