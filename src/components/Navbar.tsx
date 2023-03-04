import React from "react";

interface NavbarProps {
    isLoggedIn: boolean;
    handleLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleLogin }) => {
    return (
        <nav style={{display: 'flex', alignItems:'center', justifyContent:"center"}}>
            <ul>
                <li style={{listStyle:"none", }}>
                    {isLoggedIn ? (
                        <a href="/api/auth/logout"  className="logButton">
                            <div onClick={handleLogin}>Logout</div>
                        </a>
                    ) : (
                        <a href="/api/auth/login" className="logButton">
                            <div> Login</div>
                        </a>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
