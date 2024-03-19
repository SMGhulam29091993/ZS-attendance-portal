import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user/userSlice';
import { useParams } from 'react-router-dom';

const AttendanceCalendar = () => {
  const {currentUser, token} = useSelector(userSelector);
  const [error,setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState('');
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
      console.log("Get Attendance :",responseData.attendance);
      // Example hardcoded data for marked dates with their status

      // const attendanceDate = responseData.attendance.date;
      // const attendanceStatus = responseData.attendance.status;

      const attendanceArray = responseData.attendance;

    // Create the attendanceData object using map function
      const attendanceData = {};
      attendanceArray.map(item => {
        attendanceData[item.date] = item.status;
      });

      const dates = Object.keys(attendanceData);
      const attendanceStatuses = Object.values(attendanceData);

      // Set marked dates with their respective attendance status
      setMarkedDates(dates);
      setAttendanceStatusByDate(attendanceData);
    } catch (error) {
      console.error('Error fetching marked dates:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
    const formattedDate = formatDate(date);
    // If the selected date has no attendance status, set it to an empty string
    if (!attendanceStatusByDate[formattedDate]) {
      setAttendanceStatus('');
    } else {
      // If the selected date has an existing attendance status, set it to that status
      setAttendanceStatus(attendanceStatusByDate[formattedDate]);
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const formattedDate = formatDate(selectedDate);
      console.log(formattedDate);
      const data = {
        userID : currentUser._id,
        date: formattedDate,
        status: attendanceStatus
      }
      // Example POST request to mark attendance for the selected date
      const res = await axios.post(`http://localhost:8000/api/v1/attendance/post-attendance/${currentUser._id}`,data,{
        headers :{
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`
        }
      });
      const responseData = res.data;
      if(!responseData.success){
        setError(responseData.message);
        return;
      }
      // Update marked dates array and attendance status by date
      setMarkedDates([...markedDates, formattedDate]);
      setAttendanceStatusByDate({ ...attendanceStatusByDate, [formattedDate]: attendanceStatus });
      // alert('Attendance marked successfully!');
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance. Please try again.');
    }
  };

  const handleEditAttendance = (date) => {
    const newStatus = window.prompt('Enter attendance status (present/absent):');
    if (newStatus && (newStatus === 'present' || newStatus === 'absent')) {
      // If a valid status is entered, update the attendance status for the specific date
      const formattedDate = formatDate(date);
      setAttendanceStatusByDate({ ...attendanceStatusByDate, [formattedDate]: newStatus });
      updateAttendanceRecord(formattedDate, newStatus);
      console.log(attendanceStatusByDate);
    } else {
      // Handle invalid input or cancel action
      alert('Invalid input or action canceled.');
    }
  };

  const updateAttendanceRecord = async (date, status) => {
      try {
        const data = {
          date, 
          status
        }
        // Example PUT request to update attendance record
        await axios.post(`http://localhost:8000/api/v1/attendance/update-attendance/${currentUser._id}`, data,{
          headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
          }
        });
        alert('Attendance record updated successfully!');
      } catch (error) {
        console.error('Error updating attendance record:', error);
        alert('Failed to update attendance record. Please try again.');
      }
  };

  const tileContent = ({ date }) => {
    const formattedDate = formatDate(date);
    // If the date is in the markedDates array, render a dot as content
    if (markedDates.includes(formattedDate)) {
      return (
        <div>
          <div className={`dot ${attendanceStatusByDate[formattedDate]}`} ></div>
          <button onClick={() => handleEditAttendance(date)}>Edit</button>
        </div>
      );
    }
    return null;
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <div>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>
      <div>
         <label>
           Attendance Status:
           <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
             <option value="">Select Status</option>
             <option value="present">Present</option>
             <option value="absent">Absent</option>
           </select>
         </label>
        <button onClick={handleMarkAttendance}>Mark Attendance</button>
       </div>
    </div>
  );
};

export default AttendanceCalendar;
