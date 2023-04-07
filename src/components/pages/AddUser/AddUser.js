import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import "react-phone-number-input/style.css";
import { useAddUserMutation } from '../../../features/users/usersSlice';
import Loader from '../../shared/Loader';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SmallSpinner from '../../shared/SmallSpinner';

const AddUser = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [postUser, { data, isError, error, isLoading, isSuccess }] = useAddUserMutation();

    const navigate = useNavigate();

    const addUser = data => {
        setLoading(true)
        const image = data.image[0];
        // Upload Image Into Cloudinary
        const imageData = new FormData();
        imageData.append("file", image);
        imageData.append("upload_preset", "Deshi_Vibes");
        imageData.append("cloud_name", "dou96vwyp");

        fetch("https://api.cloudinary.com/v1_1/dou96vwyp/image/upload", {
            method: "post",
            body: imageData
        })
            .then(res => res.json())
            .then(result => {
                if (result.asset_id) {
                    const user = {
                        name: data.name,
                        image: result.secure_url,
                        mobileNumber: data.mobileNumber
                    }
                    postUser(user)
                        .then(data => {
                            setLoading(false)
                            console.log(data.data.message);
                            if (data?.data?.data?.insertedId) {
                                toast.success("User Added");
                                reset();
                                navigate("/")
                            }
                            if (data.data.message === "Already stored. Please try different.") {
                                toast.error("Already In Database");
                            }
                        })
                }
            })
    }
    return (
        <div className='max-w-7xl  mx-auto mt-20 px-4'>
            <div className='border border-primary shadow lg:w-1/2 md:1/2 w-full mx-auto'>
                <h3 className='text-center font-barlow text-xl tracking-wide border-b text-white py-2 font-medium w-full bg-primary'>Add User</h3>
                <div className="p-10">
                    <form
                        onSubmit={handleSubmit(addUser)}
                        className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <label htmlFor='name' className='block mb-2 text-sm text-primary font-barlow font-medium'>
                                    Name
                                </label>
                            </div>
                            <input
                                {...register("name", { required: true })}
                                name="name"
                                id="name"
                                type="name"
                                className='w-full py-2 px-4 focus:outline-primary bg-gray-light'
                                placeholder="Name"
                                required={true}
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm text-primary font-barlow font-medium'>
                                Image
                            </label>
                            <input
                                {...register("image", { required: true })}
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                                className='w-full p-2 focus:outline-primary bg-gray-light'
                                required={true}
                            />
                        </div>
                        <div>
                            <label htmlFor='mobileNumber' className='block mb-2 text-sm text-primary font-barlow font-medium'>
                                Mobile Number
                            </label>
                            <input
                                {...register("mobileNumber", { required: true })}
                                type='number'
                                id='mobileNumber'
                                name='mobileNumber'
                                className='w-full p-2 focus:outline-primary bg-gray-light'
                                required={true}
                            />
                        </div>
                        <button
                            type='submit'
                            className="bg-primary hover:bg-secondary active:bg-opacity-80 py-2 px-4 cursor-pointer font-medium text-white transition-all duration-300 flex justify-center items-center"
                        >
                            {
                                (isLoading || loading) ? <SmallSpinner /> : "Add User"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;