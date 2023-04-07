import React from 'react';
import { useForm } from 'react-hook-form';

const Modal = ({ setModalOpen, modalOpen, user, editUserInfo }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const updatedUserInfo = data => {

        const updatedData = {
            _id: user._id,
            name: data.name,
            mobileNumber: data.mobileNumber
        }

        editUserInfo(updatedData);
        setModalOpen(!modalOpen)
    }


    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
            <div onClick={() => setModalOpen(!modalOpen)} className="absolute w-full h-full opacity-60 bg-blend-overlay bg-black"></div>
            <div className="modal-container bg-bgColor w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left">
                    <div className="flex justify-between items-center pb-3 px-6">
                        <p className="text-2xl font-semibold font-barlow tracking-wide">Edit Details</p>
                        <div className="modal-close cursor-pointer z-50">
                            <button className='w-8 h-8 border flex justify-center items-center rounded-full border-gray-400 hover:bg-red/50 duration-200' onClick={() => setModalOpen(!modalOpen)}>
                                <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">
                                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='px-6 py-6'>
                        <form onSubmit={handleSubmit(updatedUserInfo)} className="flex flex-col gap-y-8">
                            <label className='flex justify-center items-center gap-x-2'>
                                <h5><span className='text-red-500'>*</span> Name:</h5>
                                <input
                                    {...register("name", { required: true })}
                                    className='border px-2' name='name'
                                    defaultValue={user?.name}
                                    required
                                    type="text"
                                />
                            </label>
                            <label className='flex justify-center items-center gap-x-2'>
                                <h5><span className='text-red-500'>*</span> Mobile:</h5>
                                <input
                                    {...register("mobileNumber", { required: true })}
                                    className='border px-2'
                                    name='mobileNumber'
                                    defaultValue={user?.mobileNumber}
                                    required
                                    type="tel"
                                />
                            </label>
                            <hr className='' />
                            <div className="flex justify-center">
                                <button
                                    type='submit'
                                    className="border px-8 font-semibold rounded-sm hover:bg-primary duration-200 hover:text-white">
                                    Edit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Modal;