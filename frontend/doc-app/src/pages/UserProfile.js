import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from '../config/axios'
import "../styles/images/profile.css"

const UserProfile = () => {
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
         {/* File Upload Form */}
            <form onSubmit={handleFileUpload} style={{ marginBottom: '20px' }}>
                <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Upload
                </button>
            </form>

            {/* Status Message */}
            {status && <p style={{ color: 'green' }}>{status}</p>}
        </div>
        </div>
        </Layout>
    )
}

export default UserProfile
