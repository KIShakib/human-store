import React from 'react';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../features/users/usersSlice';
import User from '../User/User';
import Loader from '../../shared/Loader';
import { toast } from 'react-hot-toast';


const Users = () => {
    const { data, isLoading, isError, error } = useGetUsersQuery(null, { refetchOnMountOrArgChange: true });
    const [deleteUser, { isSuccess }] = useDeleteUserMutation();

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

    let users = data?.data;

    const handleSearch = key => {
        const filtered = users?.filter(user => user.name.includes(key))

    }


    const handleDeleteUser = _id => {
        deleteUser(_id)
        toast.success("User deleted successfully")
    }



    return (
        <div className='max-w-7xl mx-auto'>
            <input
                onChange={(e) => handleSearch(e.target.value)}
                type='text'
                id='search'
                name='search'
                className='w-full p-2 focus:outline-primary bg-gray-light'
                required={true}
            />
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