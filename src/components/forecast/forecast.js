import React from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import "./forecast.css";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data }) => {
  const dayInaWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInaWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInaWeek));


  return (
    <div>
      <label className='title'>Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((dayData, idx) => {
          const description = dayData.weather[0].description;
          const temp_mn = dayData.main.temp_min;
          const temp_mx = dayData.main.temp_max;
          const feels_like = dayData.main.feels_like;
          const windSpeed = dayData.wind.speed;
          const humidity = dayData.main.humidity;
          const visibility = dayData.visibility;
          const weatherIcon = dayData.weather[0].icon; // Get the weather icon for the current day
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className='daily-item'>
                    {/* Use the weather icon dynamically */}
                    <img
                      alt='weather'
                      className='icon-small'
                      src={`icons/${weatherIcon}.png`}
                    />
                    <label className='day'>{forecastDays[idx]}</label>
                    <label className='description'>{description}</label>
                    <label className='min-max'>{Math.round(temp_mn)}°C / {Math.round(temp_mx)}°C</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className='daily-details-grid'><div className="daily-details-grid-item">
                  <label>Feels like</label>
                  <label>{Math.round(feels_like)}°C</label>
                </div>
                  <div className="daily-details-grid-item">
                    <label>Wind</label>
                    <label>{windSpeed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity</label>
                    <label>{humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Visibility</label>
                    <label>{Math.round(visibility / 1000)} Kms </label>
                  </div></div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default Forecast;
