import React, { useState, useEffect } from "react";
import Image from "next/image";

import CurrentWeather from "@/components/CurrentWeather";
import Footer from "@/components/Footer";
import ForecastCont from "@/components/ForecastCont";

import Logo from '../../public/Icons/Logo.svg';

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_APIKEY
  const [currentData, setCurrentData] = useState<any>([]);
  const [forecast, setForecast] = useState<ForecastData[]>([])
  const [city, setCity] = useState<string>('');
  const [lat, setLat] = useState<number>(0);
  const [lon,setLon] = useState<number>(0);

  const [type, setType] = useState<string>('');

  const getCoords = (city: string) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setLat(data[0].lat);
        setLon(data[0].lon);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const currentWeather = (lat: number, lon: number) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        setCurrentData([data.name, data.weather[0]?.decription, data.main?.temp, data.weather[0]?.main, data.sys?.country, data.wind.speed, data.dt]);
        setType(data.weather[0].main);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const forecastWeather = (lat: number, lon: number) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data.list);
        setForecast(data.list);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between`}
    >
      <div className={`flex justify-between w-screen h-20 items-center bg-orange-100 sticky top-0`}>
        <div className={`flex ml-24 items-center gap-5`}>
          <Image src={Logo} alt="" width={50} height={50}/>
          <h1 className={`text-xl text-orange-900`}>Meteor Master</h1>
        </div>
        <div className={`flex justify-between w-4/12 mr-5`}>
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            className={`text-slate-950 w-72 h-11 px-5 py-2 rounded-full border-2 border-orange-900`}
          />
          <button 
            className={`bg-orange-900 hover:bg-orange-800 w-40 h-11 text-white px-5 py-2 rounded-full transition-colors`} 
            onClick={() => {
              getCoords(city);
              setTimeout(() => {
                currentWeather(lat, lon);
              }, 1000)
              setTimeout(() => {
                forecastWeather(lat, lon);
              }, 1000)
            }}
          >Submit</button>
        </div>
      </div>
      <CurrentWeather data={currentData}/>
      <ForecastCont data={forecast}/>
      <Footer />
    </main>
  );
}
