import React, {useEffect,useState}from 'react'
import Layout from '../../components/Layout'
import axios from '../../config/axios'
import { Table,message } from 'antd'

const Doctors = () => {
    const[doctors,setDoctors] = useState([])
    
    const getDoctors = async()=>{
        try {
            const res = await axios.get('/api/doctors/',{headers:{Authorization:localStorage.getItem('token')}})
            console.log(res.data.data)
            if(res.data.success){
              if (Array.isArray(res.data.data)) {
                setDoctors(res.data.data);
            } else {
                console.error("Doctors data is not an array:", res.data.data);
                setDoctors([]);
            }
            } else {
                message.error(res.data.message || 'Failed to fetch doctors');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAccountStatus = async(record,status)=>{
        try {
            const payload = {
                doctorId: record._id,  // Use the record's _id
                userId: record.userId,  // Use the record's userId
                status: status           // Pass the status directly
            };
            const res = await axios.put('/api/doctor/status',payload,{headers:{Authorization:localStorage.getItem('token')}})
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
              }
        } catch (error) {
            message.error("Something Went Wrong"); 
        }
    }

    const handleReject = async(doctorId)=>{
      try {
        const res = await axios.put('/api/doctor-reject',{doctorId},{headers:{Authorization:localStorage.getItem('token')}})
        if(res.data.success){
          message.success('Doctor status set to pending')
          setDoctors((prevDoctors) =>
            prevDoctors.map((doctor) =>
                doctor._id === doctorId ? { ...doctor, status: "pending" } : doctor
            )
        );
        }else{
          message.error('failed to reject doctor')
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        getDoctors()
    },[])
  
  useEffect(() => {
      console.log("Current doctors state:", doctors);
  }, [doctors]);
  

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          render: (text, record) => (
            <span>
              {record.firstname} {record.lastname}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "phone",
          dataIndex: "phone",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              {record.status === "pending" ? (
                <button className="btn btn-success" onClick={()=>handleAccountStatus(record,'approved')}>Approve</button>
              ) : (
                <button className="btn btn-danger" onClick={()=>handleReject(record._id)}>Reject</button>
              )}
            </div>
          ),
        },
      ];
    return (
        <Layout>
            <h1>All Doctors</h1>
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    )
}

export default Doctors
