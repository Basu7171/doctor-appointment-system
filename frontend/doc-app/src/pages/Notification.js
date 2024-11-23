import React from 'react';
import Layout from '../components/Layout';
import { Tabs,message } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../Redux/features/alertSlice';
import axios from '../config/axios';

const Notification = () => {
    const { data:user } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const handleMarkAllRead = async() => {
       try{
        dispatch(showLoading())
        const res = await axios.post(
            "/api/notification",
            {
              userId: user._id,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error("Something went wrong while marking notifications as read.")
        }
      };
    

    const handleDeleteAllRead = async() => {
        try {
            dispatch(showLoading());
            const res = await axios.delete(
              "/api/notification",
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
                data: {
                    userId: user._id, // Send userId in the data field
                },
              }
            );
            dispatch(hideLoading());
            if (res.data.success) {
              message.success(res.data.message);
            } else {
              message.error(res.data.message);
            }
          } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Somthing Went Wrong In Notifications");
          }
    };

    const items = [
        {
            label: 'Unread',
            key: '1',
            children: (
                <>
                    <div className='d-flex justify-content-end' style={{cursor:"pointer"}}>
                        <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
                    </div>
                    {user?.notification?.map((notificationMsg, index) => (
                        <div className='card' style= {{cursor:"pointer"}}key={index} onClick={() => window.location.href = notificationMsg.onclickPath}>
                            <div className='card-text'>
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))}
                </>
            ),
        },
        {
            label: 'Read',
            key: '2',
            children: (
                <>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>Delete All Read</h4>
                    </div>
                    {user?.seennotification?.map((notificationMsg, index) => (
                        <div className='card' style= {{cursor:"pointer"}}key={index} onClick={() => window.location.href = notificationMsg.onclickPath}>
                            <div className='card-text'>
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))}
                </>
            ),
        }
    ];

    return (
        <Layout>
            <h4 className='p-3 text-center'>Notification</h4>
            <Tabs items={items} />
        </Layout>
    );
};

export default Notification;
