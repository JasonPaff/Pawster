import React, { useEffect, useState } from "react";
import ClientProfilePic from "../../components/ClientProfile/ClientProfilePic";
import DisplayHostPets from "../../components/HostProfile/DisplayHostPets";
import getAddress from "../../services/address/getAddress";

const userFullName = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");

export default function AccountInfo(props) {
  const [address, setAddCheck] = useState({
    street: "none",
    city: "none",
    state: "none",
    zipcode: "none",
  });

  useEffect(() => {
    getAddress().then((result) => {
      if (result.data.getAddress.address) {
        setAddCheck(result.data.getAddress.address);
      }
    });
  }, []);
  const userId = localStorage.getItem("id");

  return (
    <div className="flex flex-col justify-center md:px-10 gap-10">
      <div className="flex-shrink-0">
        <h3 className="text-lg font-medium text-center">{userFullName}</h3>
        <div className="flex flex-col lg:flex-row m-4 gap-6 flex-shrink-0 justify-center ">
          <div className="f p-4 border mx-auto lg:mx-0 rounded-lg bg-background-light border-slate-300">
            <ClientProfilePic styleImg={"h-56 w-56 rounded-lg object-cover flex-shrink-0 "} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid-address">
              <span className=" col-span-2 mb-3 text-lg font-medium text-center">Address</span>
              <span className="text-right text-gray-500">Street:</span> <span>{address.street}</span>
              <span className="text-right text-gray-500">City:</span> <span>{address.city} </span>
              <span className="text-right text-gray-500">State:</span> <span> {address.state}</span>
              <span className="text-right text-gray-500">Zipcode:</span> <span>{address.zipcode}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-center">My Pets</h3>
        <DisplayHostPets userId={userId} />
      </div>
    </div>
  );
}
