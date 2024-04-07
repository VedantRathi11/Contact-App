import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { ToastContainer, toast } from 'react-toastify';

const ContactCard = ({ contact }) => {
  const { onClose, onOpen, isOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
    } catch (error) {}
  };
  return (
    <>
      <div
        className="flex items-center gap-5 bg-gradient-to-r from-green-500 rounded-lg p-2 mt-4"
        key={contact.id}
      >
        <HiOutlineUserCircle className="text-4xl text-[#e6dc5c]" />
        <div className="text-white w-[200px]">
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-sm">{contact.email}</p>
        </div>

        <div className="flex gap-2 cursor-pointer">
          <RiEditCircleLine onClick={onOpen} className="text-3xl text-purple-400" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-3xl text-red-500"
          />
        </div>
      </div>
      <AddAndUpdateContact contact={contact} isUpdate={true} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;
