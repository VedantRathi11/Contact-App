import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BiSearch } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { onClose, onOpen, isOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsLists);
          return contactsLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const search = e.target.value;
    console.log(search);
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactsLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactsLists.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex">
          <div className="flex relative items-center flex-grow">
            <BiSearch className="text-white text-3xl absolute ml-1" />

            <input
              onChange={filterContacts}
              className="pl-10 text-white h-10 bg-transparent flex border border-white rounded-md flex-grow"
              type="text"
              placeholder="Search..."
            />
            <AiFillPlusCircle
              onClick={onOpen}
              className="text-4xl ml-2 text-white cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col">
          {contacts.length <= 0 ? (
            <notFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact isUpdate={false} isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
