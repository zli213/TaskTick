// components/Navbar/index.js
import './index.scss';
import Link from "next/link";

function Navbar() {
    return (
        <nav className="navbarContainer">
            <div className="logo">LOGO</div>
            <div className="navLinks">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/today">Todo List</Link>
                <Link href="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;

