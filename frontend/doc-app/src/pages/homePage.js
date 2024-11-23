import Layout from "../components/Layout";
import { useEffect,useState } from "react";
import axios from "../config/axios";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

export default function Home(){

    const[doctors,setDoctors] = useState([])

    const getDoctorsData = async()=>{
        try {
           const res = await axios.get('/api/doctors',{headers:{Authorization:localStorage.getItem('token')}})
           console.log(res.data.data)
           const approvedDoctors = res.data.data.filter(doctor => doctor.status === "approved");
           setDoctors(approvedDoctors);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    return(
        <Layout>
             <h2 className="text-center">Home Page</h2>
             <Row>
                {doctors && doctors.map((doctor)=><DoctorList doctor={doctor}/>)}
             </Row>
        </Layout>
    )
}