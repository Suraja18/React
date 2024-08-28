import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [dayData, setDayData] = useState([]); // Renamed for clarity

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://working-days.p.rapidapi.com/1.3/get_array_info_day',
        params: {
          start_date: '2013-01-01',
          end_date: '2013-01-31',
          country_code: 'US'
        },
        headers: {
          'x-rapidapi-key': '2f1331616bmshb1ae86f6e757d48p19c8d8jsna0b090ad57d1',
          'x-rapidapi-host': 'working-days.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        setDayData(response.data.days);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Working Days</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Afternoon Start & End</th>
            <th>Date</th>
            <th>Morning Start & End</th>
            <th>Public Holiday</th>
            <th>Type & Comment</th>
            <th>Wages</th>
            <th>Others</th>
          </tr>
        </thead>
        <tbody>
          {dayData.length > 0 ? (
            dayData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.afternoon_start} - {item.afternoon_end}</td>
                <td>{item.date}</td>
                <td>{item.morning_start} - {item.morning_end}</td>
                <td>{item.public_holiday_description}</td>
                <td>{item.type_comment}</td>
                <td>{item.wages}</td>
                <td>Weekend Day: {item.weekend_day}<br />Work Hours: {item.work_hours}<br />Working Day: {item.working_day}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
