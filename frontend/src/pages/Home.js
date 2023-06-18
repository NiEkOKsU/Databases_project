import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';

const Home = () => {
    const [users, setUsers] = useState([]);
    const { setActiveUser } = useContext(UserContext);

    useEffect(() => {
        getAppUsers();
    }, []);

    const getAppUsers = async () => {
        try {
        const response = await fetch('http://localhost:8000/auth/user/');
        if (response.ok) {
            const data = await response.json();
            setUsers(data);
        } else {
            console.error('Request failed with status:', response.status);
        }
        } catch (error) {
            console.error('Request failed with error:', error);
        }
    };

    const rememberUser = (userId, userUsername) => {
        setActiveUser({ id: userId, username: userUsername });
    };

    return (
        <div>
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1 className="display-4">Użytkownicy:</h1>
                </div>
            </div>
            <div className="row">
                {users.map((user) => (
                    <div
                    key={user.id}
                    onClick={() => rememberUser(user.id, user.username)}
                    className="text-center col-12 col-sm-6 col-md-4 my-2 py-3 bg-light border">   
                        <p className="h2">{user.username}</p>
                        <p className="h4">{user.first_name + ' ' + user.last_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
