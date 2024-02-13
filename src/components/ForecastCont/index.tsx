import React from 'react'
import Image from 'next/image'

import Clear from '../../../public/Icons/Clear.svg'
import Cloud from '../../../public/Icons/Cloud.svg'
import Rain from '../../../public/Icons/Rain.svg'
import Snow from '../../../public/Icons/Snow.svg'
import Sun from '../../../public/Icons/Sun.svg'

export default function ForecastCont(
    props: { data: ForecastData[] }
) {
    const date = (timeStamp: string) => {
        const dateNum = new Date(timeStamp);
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
        return null
    }

    return (
        <div className={`w-4/5 flex-col items-center my-5`}>
            <h1 className={`mt-10 text-orange-900 text-4xl`}>Next week's Forecast</h1>
            {
                props.data && props.data.map(({
                    weather,
                    main,
                    dt_txt,
                    wind
                }: ForecastData, index: number) => {
                    if (index % 8 === 0) {
                        return (
                            <div key={index} className={`w-full flex justify-between items-center h-52 bg-orange-50 mt-16 rounded-full`}>
                                <div className={`flex items-center ml-24 gap-5`}>
                                    <Image src={weatherIcon(weather[0].main)} alt={weather[0].main} width={100} height={100} />
                                    <div className={`flex-col`}>
                                        <p className={`text-orange-900 text-2xl`}>{date(dt_txt)}</p>
                                        <p className={`text-orange-700 text-xl`}>{weather[0].description}</p>
                                    </div>
                                </div>
                                <div className={`flex-col items-center mr-32`}>
                                    <h1 className={`text-orange-950 text-3xl`}>{(main.temp - 273).toFixed(1)} &deg;C</h1>
                                    <p className={`text-orange-700 text-xl`}>{weather[0].main}</p>
                                    <p className={`text-orange-600 text-l`}>Wind Speed: {wind.speed} m/s</p>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div >
    )
}
