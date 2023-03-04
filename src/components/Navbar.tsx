import React from "react";

interface NavbarProps {
    isLoggedIn: boolean;
    handleLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleLogin }) => {
    return (
        <nav>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    {isLoggedIn ? (
                        <a href="/api/auth/logout" onClick={handleLogin} className="logButton">
                            Logout
                        </a>
                    ) : (
                        <a href="/api/auth/login" className="logButton">
                            Login
                        </a>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;