// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function BookVaccine() {
//     const [children, setChildren] = useState([]);
//     const [selectedChild, setSelectedChild] = useState('');
//     const [vaccines, setVaccines] = useState([]);
//     const [selectedVaccine, setSelectedVaccine] = useState('');
//     const [appointmentDate, setAppointmentDate] = useState('');
//     const [hospitals, setHospitals] = useState([]);
//     const [selectedHospital, setSelectedHospital] = useState('');
//     const [errors, setErrors] = useState({});
    
//     const location = useLocation();
//     const { cid, vid } = location.state || {};  // Get the cid and vid from the state passed via navigation

//     const parentId = JSON.parse(localStorage.getItem('loggedparent'))?.pid;

//     useEffect(() => {
//         if (!parentId) {
//             console.error("Parent ID is not available. Please check the loggedUser object.");
//             return;
//         }

//         fetch(`http://localhost:8080/getchildsbypid/${parentId}`)
//             .then(response => response.json())
//             .then(data => setChildren(data))
//             .catch(error => console.error("Error fetching children:", error));

//             fetch(`http://localhost:8080/getvaccinesbyweek/${calculateWeeksDifference(selectedChild.dateOfBirth)}`)
//             .then(response => response.json())
//             .then(data => setVaccines(data))
//             .catch(error => console.error("Error fetching vaccines:", error));

//         fetch('http://localhost:8080/gethospitals')
//             .then(response => response.json())
//             .then(data => setHospitals(data))
//             .catch(error => console.error("Error fetching hospitals:", error));
//     }, [parentId]);

//     useEffect(() => {
//         if (cid) setSelectedChild(cid);  // Automatically set selected child if cid is passed
//         if (vid) setSelectedVaccine(vid);  // Automatically set selected vaccine if vid is passed
//     }, [cid, vid]);

//     const validateForm = () => {
//         const newErrors = {};
//         if (!selectedChild) newErrors.selectedChild = 'Please select a child.';
//         if (!selectedVaccine) newErrors.selectedVaccine = 'Please select a vaccine.';
//         if (!appointmentDate) newErrors.appointmentDate = 'Please select an appointment date.';
//         if (!selectedHospital) newErrors.selectedHospital = 'Please select a hospital.';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
//     const calculateWeeksDifference = (dob) => {
//         if (!dob) return 'Invalid date';

//         const currentDate = new Date();
//         const dobDate = new Date(dob);

//         if (isNaN(dobDate.getTime())) return 'Invalid date';

//         const millisecondsPerDay = 24 * 60 * 60 * 1000;
//         const daysDifference = Math.floor((currentDate - dobDate) / millisecondsPerDay);
//         const weeksDifference = Math.floor(daysDifference / 7);

//         return weeksDifference;
//     };

//     const handleBooking = () => {
//         if (!validateForm()) {
//             return;
//         }

//         const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in yyyy-mm-dd format

//         const bookingData = {
//             hid: selectedHospital,
//             vid: selectedVaccine,
//             pid: parentId,
//             cid: selectedChild.id,
//             bookingDate: currentDate,  // Set current date as booking date
//             appointmentDate: appointmentDate,
//             status: 'Pending'
//         };

//         fetch('http://localhost:8080/bookvaccine', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(bookingData),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 alert("Appointment booked successfully!");
//             })
//             .catch(error => console.error("Error booking appointment:", error));
//     };

//     const handleReset = () => {
//         setSelectedChild('');
//         setSelectedVaccine('');
//         setAppointmentDate('');
//         setSelectedHospital('');
//         setErrors({});
//     };

//     return (
//         <div className="container mt-3">
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card shadow-sm">
//                         <div className="card-body">
//                             <div className='card-header' style={{ backgroundColor: "#20c997" }}>
//                                 <h3>Book Vaccine</h3>
//                             </div>
//                             <div className='card-body'>
//                                 <div className='mb-3'>
//                                     <label className='form-label'>Select Child:</label>
//                                     <select
//                                     className='form-select'
//                                     value={selectedChild ? selectedChild.cid : ''}
//                                     onChange={(e) => {
//                                         const selected = children.find(child => child.cid === parseInt(e.target.value));
//                                         setSelectedChild(selected);
//                                     }}
//                                 >
//                                         <option value="">Select a child</option>
//                                         {children.map(child => (
//                                             <option key={child.id} value={child.id}>
//                                                 {child.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {errors.selectedChild && <div className="text-danger">{errors.selectedChild}</div>}
//                                 </div>

//                                 <div className='mb-3'>
//                                     <label className='form-label'>Select Vaccine:</label>
//                                     <select 
//                                         className='form-select' 
//                                         value={selectedVaccine} 
//                                         onChange={(e) => setSelectedVaccine(e.target.value)}
//                                         disabled={vid ? true : false}  // Disable if vid is pre-selected
//                                     >
//                                         <option value="">Select a vaccine</option>
//                                         {vaccines.map(vaccine => (
//                                             <option key={vaccine.vid} value={vaccine.vid}>
//                                                 {vaccine.vaccineName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {errors.selectedVaccine && <div className="text-danger">{errors.selectedVaccine}</div>}
//                                 </div>

//                                 <div className='mb-3'>
//                                     <label className='form-label'>Select Appointment Date:</label>
//                                     <input
//                                         type="date"
//                                         className='form-control'
//                                         value={appointmentDate}
//                                         onChange={(e) => setAppointmentDate(e.target.value)}
//                                         min={new Date().toISOString().split("T")[0]} // Disable past dates
//                                     />
//                                     {errors.appointmentDate && <div className="text-danger">{errors.appointmentDate}</div>}
//                                 </div>

//                                 <div className='mb-3'>
//                                     <label className='form-label'>Select Hospital:</label>
//                                     <select className='form-select' value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
//                                         <option value="">Select a hospital</option>
//                                         {hospitals.map(hospital => (
//                                             <option key={hospital.hid} value={hospital.hid}>
//                                                 {hospital.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {errors.selectedHospital && <div className="text-danger">{errors.selectedHospital}</div>}
//                                 </div>

//                                 <button className='btn btn-primary me-2' onClick={handleBooking}>Book Vaccine</button>
//                                 <button className='btn btn-secondary' onClick={handleReset}>Reset</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }






import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function BookVaccine() {
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState('');
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState('');
    const [errors, setErrors] = useState({});
    
    const location = useLocation();
    const { cid, vid } = location.state || {};  // Get the cid and vid from the state passed via navigation

    const parentId = JSON.parse(localStorage.getItem('loggedparent'))?.pid;

    useEffect(() => {
        if (!parentId) {
            console.error("Parent ID is not available. Please check the loggedUser object.");
            return;
        }

        fetch(`http://localhost:8080/getchildsbypid/${parentId}`)
            .then(response => response.json())
            .then(data => setChildren(data))
            .catch(error => console.error("Error fetching children:", error));

        fetch(`http://localhost:8080/gethospitals`)
            .then(response => response.json())
            .then(data => setHospitals(Array.isArray(data) ? data : []))
            .catch(error => console.error("Error fetching hospitals:", error));
    }, [parentId]);

    useEffect(() => {
        if (cid) setSelectedChild(cid);  // Automatically set selected child if cid is passed
        if (vid) setSelectedVaccine(vid);  // Automatically set selected vaccine if vid is passed

        // Fetch vaccines when a child is selected
        if (selectedChild) {
            const weeksDifference = calculateWeeksDifference(selectedChild.dateOfBirth);
            fetch(`http://localhost:8080/getvaccinesbyweek/${weeksDifference}`)
                .then(response => response.json())
                .then(data => setVaccines(Array.isArray(data) ? data : []))
                .catch(error => console.error("Error fetching vaccines:", error));
        }
    }, [cid, vid, selectedChild]);

    const calculateWeeksDifference = (dob) => {
        if (!dob) return 'Invalid date';

        const currentDate = new Date();
        const dobDate = new Date(dob);

        if (isNaN(dobDate.getTime())) return 'Invalid date';

        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysDifference = Math.floor((currentDate - dobDate) / millisecondsPerDay);
        const weeksDifference = Math.floor(daysDifference / 7);

        return weeksDifference;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedChild) newErrors.selectedChild = 'Please select a child.';
        if (!selectedVaccine) newErrors.selectedVaccine = 'Please select a vaccine.';
        if (!appointmentDate) newErrors.appointmentDate = 'Please select an appointment date.';
        if (!selectedHospital) newErrors.selectedHospital = 'Please select a hospital.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBooking = () => {
        if (!validateForm()) {
            return;
        }

        const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in yyyy-mm-dd format

        const bookingData = {
            hid: selectedHospital,
            vid: selectedVaccine,
            pid: parentId,
            cid: selectedChild.id,
            bookingDate: currentDate,  // Set current date as booking date
            appointmentDate: appointmentDate,
            status: 'Pending'
        };

        fetch('http://localhost:8080/bookvaccine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
            .then(response => response.json())
            .then(data => {
                alert("Appointment booked successfully!");
            })
            .catch(error => console.error("Error booking appointment:", error));
    };

    const handleReset = () => {
        setSelectedChild('');
        setSelectedVaccine('');
        setAppointmentDate('');
        setSelectedHospital('');
        setErrors({});
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className='card-header' style={{ backgroundColor: "#20c997" }}>
                                <h3>Book Vaccine</h3>
                            </div>
                            <div className='card-body'>
                                <div className='mb-3'>
                                    <label className='form-label'>Select Child:</label>
                                    <select
                                    className='form-select'
                                    value={selectedChild ? selectedChild.cid : ''}
                                    onChange={(e) => {
                                        const selected = children.find(child => child.id === parseInt(e.target.value));
                                        setSelectedChild(selected);
                                    }}
                                >
                                        <option value="">Select a child</option>
                                        {children.map(child => (
                                            <option key={child.id} value={child.id}>
                                                {child.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.selectedChild && <div className="text-danger">{errors.selectedChild}</div>}
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label'>Select Vaccine:</label>
                                    <select 
                                        className='form-select' 
                                        value={selectedVaccine} 
                                        onChange={(e) => setSelectedVaccine(e.target.value)}
                                        disabled={vid ? true : false}  // Disable if vid is pre-selected
                                    >
                                        <option value="">Select a vaccine</option>
                                        {vaccines.map(vaccine => (
                                            <option key={vaccine.vid} value={vaccine.vid}>
                                                {vaccine.vaccineName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.selectedVaccine && <div className="text-danger">{errors.selectedVaccine}</div>}
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label'>Select Appointment Date:</label>
                                    <input
                                        type="date"
                                        className='form-control'
                                        value={appointmentDate}
                                        onChange={(e) => setAppointmentDate(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]} // Disable past dates
                                    />
                                    {errors.appointmentDate && <div className="text-danger">{errors.appointmentDate}</div>}
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label'>Select Hospital:</label>
                                    <select className='form-select' value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
                                        <option value="">Select a hospital</option>
                                        {hospitals.map(hospital => (
                                            <option key={hospital.hid} value={hospital.hid}>
                                                {hospital.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.selectedHospital && <div className="text-danger">{errors.selectedHospital}</div>}
                                </div>

                                <button className='btn btn-primary me-2' onClick={handleBooking}>Book Vaccine</button>
                                <button className='btn btn-secondary' onClick={handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
