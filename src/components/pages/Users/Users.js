import React, { useEffect, useState } from 'react';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../features/users/usersSlice';
import User from '../User/User';
import Loader from '../../shared/Loader';
import { toast } from 'react-hot-toast';


const Users = () => {
    const [users, setUsers] = useState([]);
    const { data, isLoading, isError, error } = useGetUsersQuery(null, { refetchOnMountOrArgChange: true });
    const [deleteUser, { isSuccess }] = useDeleteUserMutation();


    useEffect(() => {
        setUsers(data?.data)
    }, [data?.data])

    if (isLoading) {
        return <div className='h-screen flex justify-center items-center'>
            <Loader />
        </div>
    }

    if (isError) {
        return <div className='h-screen flex justify-center items-center'>
            <h3 className="font-bellefair font-bold text-xl tracking-wider text-red">{error?.error}</h3>
        </div>
    }



    const handleSearch = key => {
        console.log(key);
        const filtered = users?.filter((user) => {

            const userName = (user.name).toLowerCase();
            const lowerCaseKey = key.toLowerCase();

            return userName.includes(lowerCaseKey);
        })

        if (key === "") {
            setUsers(data?.data)
        }
        setUsers(filtered)

    }

    const handleAscending = value => {
        if (value === "all") {
            setUsers(data.data)
        }
        else if (value === "byMobileNumber") {
            const usersArray = [...users];
            const ascendingByNumber = usersArray?.sort((a, b) => a.mobileNumber - b.mobileNumber);
            setUsers(ascendingByNumber);
        }
        else if (value === "byName") {
            const usersArray = [...users];
            const ascendingByName = usersArray.sort((a, b) => a.name.localeCompare(b.name));
            console.log(ascendingByName);
            setUsers(ascendingByName);
        }
    }


    const handleDeleteUser = _id => {
        deleteUser(_id)
        toast.success("User deleted successfully")
    }



    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex lg:flex-row md:flex-row flex-col justify-between px-3 mt-4 gap-y-4'>
                <input
                    onChange={(e) => handleSearch(e.target.value)}
                    type='text'
                    id='search'
                    name='search'
                    className='p-2 focus:outline-primary bg-gray-light'
                    required={true}
                    placeholder='Search By Name'
                />
                <div>
                    <select
                        onChange={(e) => handleAscending(e.target.value)}
                        className='p-2 focus:outline-primary bg-gray-light w-full'
                        name="ascending"
                        id=""
                    >
                        <option value="all">All</option>
                        <option value="byName">Ascending By Name</option>
                        <option value="byMobileNumber">Ascending By Mobile Number</option>
                    </select>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-3'>
                {
                    users?.map((user, index) =>
                        <User
                            index={index}
                            key={index}
                            user={user}
                            handleDeleteUser={handleDeleteUser}
                        />)
                }
            </div>
        </div>
    );
};

export default Users;