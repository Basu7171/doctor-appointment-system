import {Form, Input} from 'antd'
import '../styles/RegisterStyle.css'
import {Link,useNavigate} from 'react-router-dom'
import axios from '../config/axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../Redux/features/alertSlice'


export default function Register(){
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinishHandler=async(values)=>{
        try{
            dispatch(showLoading())
            const response= await axios.post("/api/user/register",values)
            dispatch(hideLoading())
            console.log(response.data)
            toast("Successfully Registered",{autoClose:2000})
            navigate('/login')
        }catch(err){
            dispatch(hideLoading())
            console.log(err)
        }
    }
    return(
        <>
            <div className='form-container'>
                <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
                    <h3 className='text-center'>Register Form</h3>
                    <Form.Item label="Name" name="name">
                        <Input type="text" required autoComplete='name'/>
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" required autoComplete='email' />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" required autoComplete='password'/>
                    </Form.Item>
                    <Link to="/login" className='m-2'>Login</Link>
                    <button className='btn btn-primary' type='submit'>Register</button>
                </Form>
            </div>
        </>
    )
}