import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from '../../config/axios'
import "../../styles/images/profile.css"

const AdminProfile = () => {
    const [user,setUser] = useState(null)
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');
    const getUserProfile = async()=>{
        try {
            const res = await axios.get('/api/profile',{headers:{Authorization:localStorage.getItem('token')}})
            setUser(res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getUserProfile()
    },[])

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };
    
      const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!file) {
          setStatus('Please select a file.');
          return;
        }
    
        const formData = new FormData();
        formData.append('avatar', file);
    
        try {
          const response = await axios.post('/api/profile', formData, {
            headers: {
                Authorization:localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data)
          setStatus('File uploaded successfully!');
          getUserProfile();
        } catch (error) {
          setStatus('File upload failed.');
          console.error(error);
        }
      };
    return (
        <Layout>
            <h2 className='text-center'>{user && user.name}</h2>
            <div className="profile-container">
        {/* Profile Picture */}
        <div className="profile-picture">
          {user && user.avatar ? (
            <img
            src={`http://localhost:3050${user.avatar}`} // Replace with dynamic base URL
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
          ) : (
            <img
              src="/placeholder-basu.png" // Replace with a placeholder image URL
              alt="Placeholder"
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
          )}
        </div>
            <div>
        {user && !user.avatar && 
        <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" ><i class="fa-solid fa-camera"></i></button>
    </form>}
        <p>{status}</p>
        </div>
        </div>
        </Layout>
    )
}

export default AdminProfile
