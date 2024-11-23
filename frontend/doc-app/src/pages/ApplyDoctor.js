import { Col, Form, Input, Row, TimePicker,Checkbox } from 'antd'
import Layout from '../components/Layout'
import React from 'react'
import { useDispatch } from 'react-redux'

import { createDoctor } from '../Redux/features/doctorSlice'

const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ApplyDoctor = () => {
    
    const dispatch = useDispatch()
    
    const handleFinish  = (values)=>{
        dispatch(createDoctor(values))
    }
    return (
        <Layout>
            <h2 className='text-center'>Apply Doctor</h2>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
                <h4>Personal Details :</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="FirstName" name="firstname" rules={[{required:true}]}>
                            <Input type='text' placeholder='your name'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="LastName" name="lastname" rules={[{required:true}]}>
                            <Input type='text' placeholder='your name'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone" name="phone" rules={[{required:true},{ pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number'}]}>
                            <Input type='text' placeholder='enter mobile number'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" rules={[{required:true}]}>
                            <Input type='email' placeholder='enter email'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={16}>
                        <Form.Item label="Address" name="address" rules={[{required:true}]}>
                            <Input type='text' placeholder='enter address' rows={3}/>
                        </Form.Item>
                    </Col>
                </Row>
                <h4>Professional Details :</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Specialization" name="specialization" rules={[{required:true}]}>
                            <Input type='text' placeholder='your specialization'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience" name="experience" rules={[{required:true}]}>
                            <Input type='Number' placeholder='your experience'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Qualification" name="qualification" rules={[{required:true}]}>
                            <Input type='text' placeholder='enter qualification'/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Available Days" name={['availability', 'days']} rules={[{ required: true, message: 'Please select available days' }]}>
                        <Checkbox.Group options={daysOptions} />
                    </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Availability" name={["availability",'time']}rules={[{required:true}]}>
                            <TimePicker.RangePicker format="HH-mm" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </Col>
                </Row>
            </Form>  
    </Layout>    
    )
}

export default ApplyDoctor
