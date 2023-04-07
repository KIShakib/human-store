import React, { useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import heartStroke from "../../../assets/herat-stroke.png";
import heartFull from "../../../assets/heart-full.png";
import envelope from "../../../assets/envelope.png";
import phoneLogo from "../../../assets/phone-call.png";
import globe from "../../../assets/globe.png";
import Modal from '../../shared/Modal';
import { toast } from 'react-hot-toast';
import { useEditUserInfoMutation, useToggleLikeMutation } from '../../../features/users/usersSlice';

const User = ({ user, handleDeleteUser }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [like, setLike] = useState(false);
    const { name, mobileNumber, image } = user;

    const [editUser, { isSuccess: editSuccess }] = useEditUserInfoMutation();
    const [isLike, { isSuccess: toggleLikeSuccess }] = useToggleLikeMutation();


    const editUserInfo = updatedData => {
        editUser(updatedData)
        toast.success("User info updated")
    }

    const toggleLike = () => {

        let isLiked;
        if (user?.isLiked === true) {
            isLiked = false;
        }
        else {
            isLiked = true
        }

        const toggle = {
            _id: user._id,
            isLiked
        }
        isLike(toggle)
    }




    return (
        <div className='rounded-sm border'>
            <div className='bg-[#F5F5F5] flex justify-center'>
                <img className='w-52 h-52' src={image} alt="" />
            </div>
            <div className='p-6 flex flex-col gap-y-1 tracking-wide'>
                <h2 className='font-bold tracking-widest text-lg'>{name}</h2>
                <div className='flex items-center gap-x-2 text-sm'>
                    <img className='w-4' src={phoneLogo} alt="" />
                    <h4>{mobileNumber}</h4>
                </div>
            </div>
            <div className='bg-[#F5F5F5] flex justify-evenly py-3'>
                <div className='flex items-center'>
                    <button
                        onClick={toggleLike}
                    >
                        {
                            user?.isLiked ? <img className='w-4' src={heartFull} alt="" />
                                : <img className='w-4' src={heartStroke} alt="" />
                        }
                    </button>
                </div>
                <div className='opacity-25'>|</div>
                <div className='flex items-center'>
                    <button
                        onClick={() => setModalOpen(!modalOpen)} className=""
                    >
                        <FiEdit />
                    </button>
                </div>
                <div className='opacity-25'>|</div>
                <div className='flex items-center'>
                    <button
                        onClick={() => handleDeleteUser(user?._id)}
                    >
                        <RiDeleteBinLine />
                    </button>
                </div>
            </div>
            {
                modalOpen && <Modal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    user={user}
                    editUserInfo={editUserInfo}
                />
            }
        </div>
    );
};

export default User;