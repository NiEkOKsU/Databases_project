import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import '../css/style.css';

const YourReservations = () => {
    const [reservations, setReservations] = useState([]);

    const { activeUser } = useContext(UserContext);

    useEffect(() => {
        getReservations();
      }, []);

    const getReservations = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/reservations/${activeUser.id}/`);
          if (response.ok) {
            const data = await response.json();
            setReservations(data);
          } else {
            console.error('Request failed with status:', response.status);
          }
        } catch (error) {
          console.error('Request failed with error:', error);
        }
      };

      const deleteReservation = async (reservationId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/reservations/${reservationId}/remove/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.status === 200) {
                getReservations();
            } else if (response.status === 400) {
                alert('Failed to delete reservation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    return (
        <div>
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1 className="display-4">Tu są twoje rezerwacje:</h1>
                </div>
            </div>
            <div className="row">
                {reservations.map((reservation) => (
                    <div
                    key={reservation.id}
                    className="text-center col-12 col-sm-6 col-md-4 my-2 py-3 bg-light border reservation-div"
                    >
                    <p className="h2">{reservation.date}</p>
                    <p className="h4">{reservation.equipment + ': ' + reservation.quantity}</p>
                    <span
                        className="close-icon"
                        onClick={() => deleteReservation(reservation.reservationId)}
                    >
                        X
                    </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default YourReservations;