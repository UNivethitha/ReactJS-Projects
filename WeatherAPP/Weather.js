import React, { useState } from 'react'
import '../WeatherAPP/Weather.css'
import search from '../WeatherAPP/assets/search.png';
// import weather from '../WeatherAPP/assets/weather_small.png';
import hum from '../WeatherAPP/assets/img/humidity.png';
// import wi from '../WeatherAPP/assets/wind_small.png';
import cloudyicon from '../WeatherAPP/assets/cloudyIcon.png';


const WeatherDetails = ({ icon, temp, city, country, lat, lon, hum, wi, cloudyicon}) => {

  return (
    <>
      <div className='image'>
        <img src={icon} alt='img' />
        {/* <a href="https://www.w3schools.com" target="_top">w3schools</a> */}
      </div>
      <div className="temp">{temp}°C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>

      <div className='cord'>
        <div>
          <span className='latitude'>Latitude </span>
          <span>{lat}</span>


        </div>
        <div>
          <span className='longitude'>Longitude </span>
          <span>{lon}</span>

        </div>

      </div>
      <div className='data-container'>
        <div className='element'>
          {/* <img src={humidity} alt='' className='icon' /> */}
          <div className='data'>
            <div className='humidity-percent'>{hum}</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          {/* <img src={wi} alt='wind' className='icon' /> */}
          <div className='data'>
            <div className='wind-percent'>{wi}</div>
            <div className='text'>Wind speed</div>
          </div>
        </div>
      </div>


    </>
  )
}



const Weather = () => {

  let api_key ="1fb7a7364141fc14b32b2156c19efdb0";

  const[text, setText] = useState("Chennai");

  const [icon, setIcon] = useState(cloudyicon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("India");
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [humidity, setHumidity] =useState(0);
  const [wi, setWi] =useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const weatherIconMap ={
    // "01d": clearIcon,
    // "01n": clearIcon,
    "02d": cloudyicon,
    "02n": cloudyicon,
    // "03d": drizzleIcon,
    // "03n": drizzleIcon,
    // "04d": drizzleIcon,
    // "04n": drizzleIcon,
    // "09d": rainIcon,
    // "09n": rainIcon,
    // "10d": rainIcon,
    // "10n": rainIcon,
    "13d": wi,
    // "13n": snowIcon,
  };


  const search1 = async()=>{
    setLoading(true)

     
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {

      let res = await fetch(url);

      let data = await res.json();

      console.log(data);
      if(data.cod === "404"){
        console.error("City not Found");
        setCityNotFound(true);
        setLoading(false);
      }
     

      setHumidity(data.main.humidity);
      setWi(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || hum)
      setCityNotFound(false);
      
    } catch (error) {
      console.error("An error occured:", error.message);
    }finally{
      setLoading(false);
    }
  }


    const handlecity=(e) =>{

      setText(e.target.value);

    };

    const handlekeydown =(e) =>{
      if(e.key === "Enter"){
        search1();
      }
    }

  return (
    <>
      <h1>Weather APP</h1>
      <div className='container'>
        <div className='input-container'>
          <input type='text' className='cityInput' placeholder='Search City' onChange={handlecity} value={text} onKeyDown={handlekeydown}/>
          <div className='searchicon' onClick={() => search1()}>
            <img src={search} alt=''/>
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wi={wi}/>

        <p className='copyright'>
          Designed By <span>Nivethitha U</span>
        </p>
      </div>


    </>
  )
}

export default Weather