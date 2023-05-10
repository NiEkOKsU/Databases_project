import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
            <NavLink className="navbar-brand" role="button" to='/'>TrainEverywhere</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item" role="button">
                        <NavLink activeClassName="active" exact className="nav-link" to='/'>Home</NavLink>
                    </li>
                    <li className="nav-item" role="button">
                        <NavLink activeClassName="active" className="nav-link" to='/weights'>Cięzary</NavLink>
                    </li>
                    <li className="nav-item" role="button">
                        <NavLink activeClassName="active" className="nav-link" to='/reservations'>Twoje rezerwacje</NavLink>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    );
}

export default Navbar;