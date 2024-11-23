import Layout from '../components/Layout'
import React,{useEffect,useState} from 'react'
import axios from '../config/axios'
import moment from 'moment'
import { Table } from 'antd'

const Appointments = () => {
    const [appointments,setAppointments] = useState([])

    const getAppointments = async()=>{
        try {
            const res = await axios.get('/api/appointments',{headers:{Authorization:localStorage.getItem('token')}}) 
            if(res.data.success){
                setAppointments(res.data.data)
                console.log(res.data.data)
            }
        } catch (error) {
           console.log(error) 
        }
    }
    useEffect(()=>{
        getAppointments()
    },[])

    const columns = [
        {
          title: "Appointment ID",
          dataIndex: "_id",
          key: "_id",
        },
        {
          title: "Doctor Name",
          key: "doctorName",
          render: (text, record) => (
            <span>
              {record.doctorInfo?.firstName || "N/A"} {record.doctorInfo?.lastName || ""}
            </span>
          ),
        },
        {
          title: "Doctor Specialization",
          key: "specialization",
          render: (text, record) => (
            <span>
              {record.doctorInfo?.specialization || "N/A"}
            </span>
          ),
        },
        {
          title: "Date",
          key: "date",
          render: (text, record) => (
            <span>
              {record.date ? moment(record.date).format("MM-DD-YYYY") : "N/A"}
            </span>
          ),
        },
        {
          title: "Time",
          key: "time",
          render: (text, record) => {
            const startTime = record.time?.start;
            const endTime = record.time?.end;
            return (
              <span>
                {startTime && endTime
                  ? `${moment(startTime, "HH:mm").format("HH:mm")} - ${moment(endTime, "HH:mm").format("HH:mm")}`
                  : "N/A"}
              </span>
            );
          },
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        },
      ];
      
      
    return (
        <Layout>
            <h1>Appointments-</h1>
            <Table columns={columns} dataSource={appointments} rowKey="_id" />
        </Layout>
    )
}

export default Appointments
