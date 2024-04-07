import React from "react";

const notFoundContact = () => {
  return (
    <div className="flex justify-center text-center h-[80vh] gap-4">
      <div>
        <img src="public\Hands Contact.png" alt="" />
      </div>{" "}
      <h3 className="text-white text-2xl font-semibold">Contact Not Found</h3>
    </div>
  );
};

export default notFoundContact;
