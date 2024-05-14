import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../provides/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    const navLinks = <>
        <NavLink to='/'><li><a>Home</a></li></NavLink>
        <NavLink to='/availableFoods'><li><a>Available Foods</a></li></NavLink>
        <NavLink to='/add'><li><a>Add a Food</a></li></NavLink>
        <NavLink to='/manage'><li><a>Manage My Foods</a></li></NavLink>
        <NavLink to='/myRequest'><li><a>My Food Request</a></li></NavLink>
    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className=" gap-0 inline-flex">
                        <span className=""><img className=" w-10 " src='logo.png' alt="" /></span>
                        <a className="btn btn-ghost text-xl gap-0 px-1">
                            <span className=" text-orange-400">R</span>Fooddsfsafs
                        </a>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <NavLink onClick={handleLogOut} to='/login'><a className="btn btn-accent btn-outline">Logout</a></NavLink> :
                            <NavLink to='/login'><a className="btn btn-accent btn-outline">Login</a></NavLink>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;