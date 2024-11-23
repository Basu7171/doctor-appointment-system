import React, { useState, useEffect } from 'react';
import { TimePicker, Button, message } from 'antd';
import moment from 'moment';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from '../config/axios';

const BookingPage = () => {
  const { data: user } = useSelector((state) => state.user);

  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchDoctorData = async () => {
        try {
            const res = await axios.get('/api/doctor', {
                headers: { Authorization: localStorage.getItem('token') },
                params: { doctorId: params.doctorId },
            });

            if (res.data.success) {
                setDoctor(res.data.data);
            } else {
                message.error('Doctor not found.');
            }
        } catch (error) {
            console.error("Error fetching doctor data:", error);
            message.error('Failed to fetch doctor data.');
        }
    };

    fetchDoctorData();
}, [params.doctorId]);


  const handleTimeChange = (time) => {
    setSelectedTime(time ? time.format("HH:mm") : null);
  };

  const checkAvailability = async () => {
    if (!selectedDate || !selectedTime) {
      message.warning("Please select both date and time.");
      return;
    }

    const timeRange = {
      start: selectedTime,
      end: moment(selectedTime, "HH:mm").add(30, 'minutes').format("HH:mm"),
    };

    const requestBody = {
      doctorId: params.doctorId,
      date: selectedDate,
      time: timeRange,
    };

    try {
      setLoading(true);
      const response = await axios.post('/api/appointment/checkavailability', requestBody, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setAvailability(response.data.available);
      setLoading(false);
    } catch (error) {
      console.error("Error checking availability:", error);
      message.error("Failed to check availability.");
      setLoading(false);
    }
  };

  const bookAppointment = async () => {
    if (!doctor) {
        // If doctor data is not loaded, show an error message
        message.error('Doctor data not loaded properly. Please try again.');
        return;
    }

    if (!doctor.firstname || !doctor.lastname || !doctor.specialization) {
        // If doctor data is missing essential fields, show an error message
        message.error('Doctor information is incomplete.');
        return;
    }

    const timeRange = {
        start: selectedTime,
        end: moment(selectedTime, "HH:mm").add(30, 'minutes').format("HH:mm")
    };

    const requestBody = {
        doctorId: params.doctorId,
        userId: user._id,
        doctorInfo: {
            firstName: doctor.firstname,
            lastName: doctor.lastname,
            specialization: doctor.specialization,
        },
        userInfo: {
            name: user.name,
            email: user.email,
        },
        date: selectedDate,
        time: timeRange,
    };

    console.log("Booking Request Data:", requestBody);  // Log request data

    try {
        const response = await axios.post('/api/appointment/book', requestBody, {
            headers: { Authorization: localStorage.getItem('token') },
        });
        message.success('Appointment booked successfully!');
    } catch (error) {
        message.error(
            'Error booking appointment: ' +
            (error.response ? error.response.data.message : error.message)
        );
    }
};

const todayDate = moment().format('YYYY-MM-DD'); 

  return (
    <Layout>
      <h1>Book Appointment</h1>
      <div>
      <input
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}
        min={todayDate}  // Restrict selection to today's date or later
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <TimePicker onChange={handleTimeChange} format="HH:mm" />
      </div>
      <Button onClick={checkAvailability} style={{ marginTop: '10px' }} loading={loading}>
        Check Availability
      </Button>
      {availability !== null && (
        <div style={{ marginTop: '10px' }}>
          {availability ? 'Slot is available' : 'Slot is not available'}
          {availability && (
            <Button onClick={bookAppointment} style={{ marginLeft: '10px' }} loading={loading}>
              Book Appointment
            </Button>
          )}
        </div>
      )}
    </Layout>
  );
};

export default BookingPage;

