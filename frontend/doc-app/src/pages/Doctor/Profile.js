import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from '../../config/axios'
import {useParams,useNavigate} from 'react-router-dom'
import { Col, Form, Input, Row, TimePicker, message,Checkbox,Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../Redux/features/alertSlice";
import moment from "moment";

const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Profile = () => {
    const {data:user} = useSelector((state)=>state.user)
    const [doctor,setDoctor] = useState(null)
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const params = useParams()
    const [loading, setLoading] = useState(true);

    const handleFinish = async (values) => {
        if (!user || !user._id) {
            message.error("User is not logged in.");
            return;
          }
        
        try {
          dispatch(showLoading());
          const res = await axios.put(
            `/api/doctor/profile`,
            {
              ...values,
              userId: user._id,
              availability: {
                days: values.availability.days,
                time: {
                    start: values.availability.time[0].format("HH:mm"),
                    end: values.availability.time[1].format("HH:mm")
                }
            },
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }

          );
          console.log('Doctor data:', res.data.data);
          dispatch(hideLoading());
          console.log(res.data.data)
          if (res.data.success) {
            message.success(res.data.message);
            navigate("/");
          } else {
            message.error(res.data.success);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error("Somthing Went Wrong ");
        }
      };
    const getDoctorInfo = async()=>{
        try {
           const res = await axios.get(`/api/doctor/profile/${params.id}`,{headers:{Authorization:localStorage.getItem('token')}}) 
           if(res.data.success){
            const { availability } = res.data.data;
            
            setDoctor(res.data.data)
            form.setFieldsValue({
                ...res.data.data,
                availability: {
                    days: availability.days || [],
                    time: availability.time
                        ? [
                            moment(availability.time.start, "HH:mm"),
                            moment(availability.time.end, "HH:mm")
                          ]
                        : []
                }
            });
            setLoading(false);
           }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    useEffect(()=>{
        getDoctorInfo()
        //es-lint-disable-next-line
    },[])
    return (
        <Layout>
            <h2>Doctor Profile</h2>
            {loading ? (
                <Spin size="large" /> // Show spinner while loading
            ) : (
            doctor && (
        <Form
        form={form}  // Pass the form instance here
        layout="vertical"
        onFinish={handleFinish}
        className="m-3"
        >
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8} key='firsname'>
              <Form.Item
                label="First Name"
                name="firstname"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} key="lastname">
              <Form.Item
                label="Last Name"
                name="lastname"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} key="phone">
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} key="email">
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} key="address">
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8} key="specialization">
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} key="experience">
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>
            <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                label="Days Available"
                                name={['availability', 'days']}
                                required
                                rules={[{ required: true, message: 'Please select available days' }]}
                            >
                                <Checkbox.Group options={daysOptions} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                label="Available Time"
                                name={['availability', 'time']}
                                required
                                rules={[{ required: true, message: 'Please select available time' }]}
                            >
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
            )
            
        )}
        </Layout>
    )
}

export default Profile
