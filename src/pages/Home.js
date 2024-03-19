import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user/userSlice';

const Home = () => {
  const {currentUser, token} = useSelector(userSelector);
  const [error,setError] = useState("");
  const [markedDates, setMarkedDates] = useState([]);
  const [attendanceStatusByDate, setAttendanceStatusByDate] = useState({});

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/attendance/get-attendance/${currentUser._id}`,{
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`
        }
      })
      const responseData = res.data;
      if(!responseData.success){
        setError(responseData.message);
        return;
      }
      console.log("Get Attendance :",responseData.attendance);

      const attendanceArray = responseData.attendance;

    // Create the attendanceData object using map function
      const attendanceData = {};
      attendanceArray.map(item => {
        attendanceData[item.date] = item.status;
      });

      const dates = Object.keys(attendanceData);
      

      // Set marked dates with their respective attendance status
      setMarkedDates(dates);
      setAttendanceStatusByDate(attendanceData);
    } catch (error) {
      console.error('Error fetching marked dates:', error);
    }
  };

  const tileContent = ({ date }) => {
    const formattedDate = formatDate(date);
    // If the date is in the markedDates array, render a dot as content
    if (markedDates.includes(formattedDate)) {
      return (
        <div>
          <div className={`dot ${attendanceStatusByDate[formattedDate]}`} ></div>
        </div>
      );
    }
    return null;
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex flex-col items-center justify-center gap-4 my-6 p-2 w-full'>
        <h2 className='text-center font-semibold text-orange-600 text-3xl'>Mark Attendance</h2>
        {error && <p className='text-red-700'>{error}</p>}
        <div className=''>
          <Calendar
           tileContent={tileContent}
          />
        </div>
   
        
      </div>
    </div>
  );
}

export default Home