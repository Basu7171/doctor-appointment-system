import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from '../../config/axios'
import moment from 'moment'
import { Table,message } from 'antd'

const DoctorAppointments = () => {
    const [appointments,setAppointments] = useState([])

    const getAppointments = async()=>{
        try {
            const res = await axios.get('/api/doctor/appointments',{headers:{Authorization:localStorage.getItem('token')}}) 
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

    const handleStatus = async(record,status)=>{
        try {
            const res = await axios.put(
              "/api/doctor/appointments",
              { appointmentsId: record._id, status },
              {
                headers: {
                  Authorization:localStorage.getItem("token"),
                },
              }
            );
            if (res.data.success) {
              message.success(res.data.message);
              getAppointments();
            }
          } catch (error) {
            console.log(error);
            message.error("Something Went Wrong");
          }
        };      

    const columns = [
        {
            title: "Appointment ID",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "User Name",
            key: "userName",
            render: (text, record) => (
                <span>
                    {record.userInfo?.name}
                </span>
            )
        },
        {
            title: "User Email",
            key: "userEmail",
            render: (text, record) => (
                <span>
                    {record.userInfo?.email}
                </span>
            )
        },
        {
            title: "Date",
            key: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')}
                </span>
            )
        },
        {
            title: "Time",
            key: "time",
            render: (text, record) => (
                <span>
                    {moment(record.time?.start, 'HH-mm').format('HH:mm')} - {moment(record.time?.end,'HH-mm').format('HH:mm')}
                </span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title:"Action",
            dataIndex:"actons",
            render:(text,record)=>{
                return(
                    <div className='d-flex'>
                    {record.status === 'pending' && (
                        <div className='d-flex'>
                            <button 
                            className='btn btn-success'
                            onClick={()=>handleStatus(record,"approved")}>
                                Approve
                            </button>
                            <button 
                            className='btn btn-danger ms-2'
                            onClick={()=>handleStatus(record,"rejected")}>
                                Reject
                            </button>
                        </div>
                    )}
                    </div>
                )       
            }
        }
    ];

    return (
        <Layout>
            <h1>Appointments-</h1>
            <Table columns={columns} dataSource={appointments} rowKey="_id" />
        </Layout>
    )
}

export default DoctorAppointments
