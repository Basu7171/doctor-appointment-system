import {Form, Input} from 'antd'
import '../styles/RegisterStyle.css'
import {Link,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from '../config/axios'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../Redux/features/alertSlice'
import { fetchUser } from '../Redux/features/userSlice'


export default function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onFinishHandler=async(values)=>{
        try{
            dispatch(showLoading())
            const response= await axios.post('/api/user/login',values)
            
            dispatch(hideLoading())
            console.log(response)
            localStorage.setItem('token',response.data.token)
            dispatch(fetchUser())
            navigate('/')
            toast('Succesfully Login')
        }catch(err){
            dispatch(hideLoading())
            console.log(err)
            toast.error(err.response?.data?.message || 'Login Failed');
        }
    }
    return(
        <>
             <div className='login-page'>
             <div className='form-container'>
                <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
                    <h3 className='text-center'>Login Form</h3>
                    <Form.Item label="Email" name="email">
                        <Input type="email" required autoComplete='email' />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" required autoComplete='password' />
                    </Form.Item>
                    <Link to="/register" className='m-2'>Register</Link>
                    <button className='btn btn-primary' type='submit'>Login</button>
                </Form>
             </div>
             </div>
        </>
    )
}