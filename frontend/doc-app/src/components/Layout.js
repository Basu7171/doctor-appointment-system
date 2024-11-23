import React from 'react';
import '../styles/LayoutStyles.css';
import { AdminMenu, UserMenu } from '../data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, Dropdown, Avatar, message } from 'antd';

const Layout = (props) => {
    const { data: user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    // Doctor Menu
    const DoctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'fa-solid fa-house',
        },
        {
            name: 'Appointments',
            path: '/doctor/appointments',
            icon: 'fa-solid fa-calendar-check',
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: 'fa-solid fa-user',
        },
    ];

    // Select Navigation Menu
    const TopMenu =
        user?.role === 'admin'
            ? AdminMenu
            : user?.role === 'doctor'
            ? DoctorMenu
            : UserMenu;

    const handleLogout = () => {
        localStorage.removeItem('token');
        message.success('Logout Successfully');
        navigate('/login');
    };

    // Dropdown menu for profile actions
    const profileMenu = (
        <div className="profile-dropdown">
            <p onClick={() => navigate('/profile')} className="dropdown-item">
                View Profile
            </p>
            <p onClick={handleLogout} className="dropdown-item">
                Logout
            </p>
        </div>
    );

    return (
        <div className="main">
            <div className="layout">
                {/* Top Navigation Menu */}
                <div className="header">
                    <div className="nav-container">
                        {/* Logo */}
                        <div className="logo">
                            <h6>DOC APP</h6>
                        </div>
                        {/* Navigation Links */}
                        <div className="nav-links">
                            {TopMenu.map((menu) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    <Link
                                        key={menu.name}
                                        to={menu.path}
                                        className={`nav-link ${isActive && 'active'}`}
                                    >
                                        <i className={menu.icon}></i> {menu.name}
                                    </Link>
                                );
                            })}
                        </div>
                        {/* Profile and Notifications */}
                        <div className="header-actions">
                            <Badge
                                count={user && user.notification?.length}
                                onClick={() => navigate('/notification')}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="fa-solid fa-bell"></i>
                            </Badge>
                            <Dropdown overlay={profileMenu} placement="bottomRight">
                                <div className="profile-wrapper" style={{ cursor: 'pointer' }}>
                                    {user?.avatar ? (
                                        <Avatar src={`http://localhost:3050${user.avatar}`} />
                                    ) : (
                                        <Avatar style={{ backgroundColor: '#87d068' }}>
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </Avatar>
                                    )}
                                    <span>{user?.name}</span>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="content">{props.children}</div>
            </div>
        </div>
    );
};

export default Layout;
