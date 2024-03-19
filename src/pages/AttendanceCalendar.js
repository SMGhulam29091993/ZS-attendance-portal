import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const AttendanceCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [markedDates, setMarkedDates] = useState([]);
  const [attendanceStatusByDate, setAttendanceStatusByDate] = useState({});

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      // Example hardcoded data for marked dates with their status
      const attendanceData = {
        "2024-03-18": "present",
        "2024-03-17": "absent",
        "2024-03-15": "present"
      };

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
      // // Example POST request to mark attendance for the selected date
      // await axios.post('/api/attendance', {
      //   date: formattedDate,
      //   status: attendanceStatus
      // });
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
      // try {
      //   // Example PUT request to update attendance record
      //   await axios.put(`/api/attendance/${date}`, { status });
      //   alert('Attendance record updated successfully!');
      // } catch (error) {
      //   console.error('Error updating attendance record:', error);
      //   alert('Failed to update attendance record. Please try again.');
      // }
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
