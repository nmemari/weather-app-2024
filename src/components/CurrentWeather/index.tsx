import React from 'react'
import Image from 'next/image'

import Clear from '../../../public/Icons/Clear.svg'
import Cloud from '../../../public/Icons/Cloud.svg'
import Rain from '../../../public/Icons/Rain.svg'
import Snow from '../../../public/Icons/Snow.svg'
import Sun from '../../../public/Icons/Sun.svg'

export default function CurrentWeather(props: { data: any }) {
  const date = (timeStamp: number) => {
    const dateNum = new Date(timeStamp * 1000);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[dateNum.getMonth()];
    const day = dateNum.getDate();
    const year = dateNum.getFullYear();

    return `${month} ${day}, ${year}`
  }

  const weatherIcon = (image: string) => {
    switch (image) {
      case "Clear":
        return Clear;
      case "Clouds":
        return Cloud;
      case "Rain":
        return Rain;
      case "Snow":
        return Snow;
      case "Mist":
        return Cloud;
      default:
        return Sun;
    }
  }


  if (!props.data?.length) {
    return <div className='text-center flex-col items-center'>
      <h1 className='text-4xl text-orange-700'>Welcome to Meteor Master</h1>
      <h3 className='text-2xl text-orange-900 mb-5'>The weather forcasting app!</h3>
      <p className='text-xl text orange-950'>Enter the name of the city in the search bar and check the weather!</p>
    </div>
  }

  return (
    <>
      <h1 className={`mt-10 text-orange-900 text-4xl w-4/5 mt-24`}>Today's Weather</h1>
      <div className={`w-4/5 flex justify-between items-center h-96 bg-orange-50 mt-16 rounded-full flex-wrap`}>
        {
          props.data && <>
            <div className={`flex items-center ml-24 gap-5`}>
              <Image src={weatherIcon(props.data[3])} alt={props.data[3]} width={200} height={200} />
              <div className={`flex-col`}>
                <h1 className={`text-orange-950 text-3xl`}>{props.data[0]}, {props.data[4]}</h1>
                <p className={`text-orange-700 text-xl`}>{date(props.data[6])}</p>
              </div>
            </div>
            <div className={`flex-col items-center mr-32 min-w-52`}>
              <h1 className={`text-orange-950 text-3xl`}>{(props.data[2] - 273).toFixed(1)} &deg;C</h1>
              <p className={`text-orange-700 text-xl`}>{props.data[3]}</p>
              <p className={`text-orange-600 text-l`}>Wind Speed: {props.data[5]} m/s</p>
            </div>
          </>
        }
      </div>
    </>
  )
}
