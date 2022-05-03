import React, { useEffect, useState } from 'react';
import { getWeather } from '../api/weatherAPI';
import { dateBuilder } from '../utils/date';
import { BsSearch } from 'react-icons/bs';
import './weather.css';

function Weather() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    useEffect(() => {
        getWeather('Tashkent').then((res) => setWeather(res));
    }, []);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeather(query).then((res) => setWeather(res));
    };

    return (
        <div className="main">
            <div className="weather-box">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={handleChange}
                        value={query}
                    />
                    <button className="btn" onClick={handleSubmit}>
                        <BsSearch/>
                    </button>
                </div>
                {weather && (
                    <div>
                        <div className="location-box">
                            <div className="location">
                                {weather.location?.name},{' '}
                                {weather.location?.country}
                            </div>
                            <div className="time">
                                {dateBuilder(weather.current?.last_updated)}
                            </div>
                        </div>
                        <div className="temp-box">
                            <div className="temp">
                                {weather.current?.temp_c}°C
                            </div>
                            <br />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={weather.current?.condition?.icon}
                                    alt="icon"
                                />
                                <div className="weather">
                                    {weather.current?.condition?.text}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
