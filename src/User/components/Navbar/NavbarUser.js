import React, {Component, useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

import './NavbarUser.css';

export const NavbarUser = () => {

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
            case "/IpoDetails":
                setHighlight(0);
                break;
            case "/CompareCompanies":
                setHighlight(1);
                break;
            case "/CompareSecors":
                setHighlight(2);
                break;
        }
    }, []);

    return (
        <nav className="nav-admin">
            <ul className="nav-menu-admin">
                
                <li className={highlight === 0 ? "nav-item-admin active" : "nav-item-admin"} >
                    <Link to='/IpoDetails' style={{ textDecoration: 'none' }}>
                        <div onClick={() => handleNavClick(0)}>
                            Ipo Details
                        </div>
                    </Link>
                </li>
                
                <li className={highlight === 1 ? "nav-item-admin active" : "nav-item-admin"} >
                    <Link to='/CompareCompanies' style={{ textDecoration: 'none' }}>
                        <div style={{textDecoration:'none'}} onClick={() => handleNavClick(1)}>
                            Compare Companies
                        </div>
                    </Link>
                </li>

                <li className={highlight === 2 ? "nav-item-admin active" : "nav-item-admin"} >
                    <Link to='/CompareSecors' style={{ textDecoration: 'none' }}>
                        <div style={{textDecoration:'none'}} onClick={() => handleNavClick(2)}>
                            Compare Sectors
                        </div>
                    </Link>
                </li>
                
            </ul>
        </nav>
    )
}