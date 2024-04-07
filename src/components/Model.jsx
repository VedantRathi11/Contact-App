import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Model = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="backdrop-blur top-0 h-screen w-screen absolute z-40 grid place-items-center">
          <div className="relative min-h-[200px] min-w-[50%] bg-white p-4 z-50 m-auto">
            <div className="flex justify-end ">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl cursor-pointer"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Model;
