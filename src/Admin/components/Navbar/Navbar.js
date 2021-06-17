import React, {Component, useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Navbar.css';

export const Navbar = () => {

    const [highlight, setHighlight] = useState(0);
    const location = useLocation();

    const handleNavClick = (i) => {
        switch(i) {
            case 0:
                setHighlight(0);
                break;
            case 1:
                setHighlight(1)
                break;
            case 2:
                setHighlight(2)
                break;
        }
    };

    useEffect(() => {
        switch(location.pathname){
            case "/ImportData":
                setHighlight(0);
                break;
            case "/ManageCompanies":
                setHighlight(1);
                break;
            case "/ManageExchange":
                setHighlight(2);
                break;
        }
    }, []);

    return (
        <nav className="nav-admin">
            <ul className="nav-menu-admin">
                
                <li className={highlight === 0 ? "nav-item-admin active" : "nav-item-admin"} onClick={() => handleNavClick(0)}>
                    <Link to='/ImportData' style={{ textDecoration: 'none' }}>
                        <div>
                            Import Data
                        </div>
                    </Link>
                </li>
                
                <li className={highlight === 1 ? "nav-item-admin active" : "nav-item-admin"} onClick={() => handleNavClick(1)}>
                    <Link to='/ManageCompanies' style={{ textDecoration: 'none' }}>
                        <div style={{textDecoration:'none'}}>
                            Manage Companies
                        </div>
                    </Link>
                </li>

                <li className={highlight === 2 ? "nav-item-admin active" : "nav-item-admin"} onClick={() => handleNavClick(2)}>
                    <Link to='/ManageExchange' style={{ textDecoration: 'none' }}>
                        <div style={{textDecoration:'none'}}>
                            Manage Exchange
                        </div>
                    </Link>
                </li>
                
            </ul>
        </nav>
    )
}