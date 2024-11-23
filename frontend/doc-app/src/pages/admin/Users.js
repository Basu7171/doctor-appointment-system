import React, {useEffect,useState}from 'react'
import Layout from '../../components/Layout'
import axios from '../../config/axios'
import { Table,message } from 'antd'

const Users = () => {
    const[users,setUsers] = useState([])
    
    const getUsers = async()=>{
        try {
            const res = await axios.get('/api/users/',{headers:{Authorization:localStorage.getItem('token')}})
            if(res.data.success){
                setUsers(res.data.data)
            } else {
                message.error(res.data.message || 'Failed to fetch users');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleBlock = async(userId)=>{
      try {
        const res = await axios.put('/api/user-block',{userId},{headers:{Authorization:localStorage.getItem('token')}})
        if (res.data.success) {
          message.success("User blocked successfully");
          setUsers((prevUsers) => prevUsers.map(user => user._id === userId ? { ...user, status: 'blocked' } : user));
      } else {
          message.error(res.data.message || "Failed to block user");
      }
      } catch (error) {
        console.log(error)
        message.error("Error blocking user");
      }
    }

    const handleUnblock = async(userId)=>{
      try {
        const res = await axios.put('/api/user-unblock', { userId }, { headers: { Authorization: localStorage.getItem('token') } });
        if (res.data.success) {
            message.success("User unblocked successfully");
            // Optionally update your state to reflect the changes
            setUsers((prevUsers) => prevUsers.map(user => user._id === userId ? { ...user, status: 'active' } : user));
        } else {
            message.error(res.data.message || "Failed to unblock user");
        }
    } catch (error) {
        console.log(error);
        message.error("Error unblocking user");
    }
    }
    useEffect(()=>{
        getUsers()
    },[])

    // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{(record.role === "doctor")? "Yes" : "No"}</span>,
    },
    {
      title:"Status",
      dataIndex:"status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
        {record.role === 'admin' ? (
            <span>You can't block your account</span>
        ) : (
            record.status === 'blocked' ? (
                <button className="btn btn-success" onClick={() => handleUnblock(record._id)}>Unblock</button>
            ) : (
                <button className="btn btn-danger" onClick={() => handleBlock(record._id)}>Block</button>
            )
        )}
    </div>
      ),
    },
  ];
    return (
        <Layout>
            <h1>All Users</h1>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default Users
