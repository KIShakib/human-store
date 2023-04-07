import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {


    return (
        <nav className='bg-bgColor lg:px-28 md:px-24 sm:px-12 px-8 flex items-center justify-between py-4 font-barlow'>
            <Link to="/" className='text-2xl font-medium'>human.store</Link>
            <div className='flex gap-x-4 font-medium'>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? `text-blue text-lg`
                            : ` text-lg`
                    }
                >
                    Users
                </NavLink>
                <NavLink
                    to="add-user"
                    className={({ isActive }) =>
                        isActive
                            ? `text-blue text-lg`
                            : ` text-lg`
                    }
                >
                    Add User
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;