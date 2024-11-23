import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => {
    const navigate = useNavigate()
    return (
        <>
            <div className='card m-2'
            style={{cursor:"pointer"}} 
            onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
                <div className='card-header'>
                    Dr. {doctor.firstname} {doctor.lastname}
                </div>
                <div className='card-body'>
                    <p>
                        <b>Specialization</b> {doctor.specialization}
                    </p>
                    <p>
                        <b>Experience</b> {doctor.experience}
                    </p>
                    <p>
                        <b>Qualification</b> {doctor.qualification}
                    </p>
                    <p>
                        <b>Availability</b> {doctor.availability?.days && doctor.availability.days.length > 0
                        ? doctor.availability.days.join(', ')
                        : 'Not specified'} 
                    {doctor.availability?.time 
                        ? ` (from ${doctor.availability.time.start} to ${doctor.availability.time.end})`
                        : ''}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DoctorList
