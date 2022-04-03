import React, { useEffect, useState } from "react";
import ClientProfilePic from "../../components/ClientProfile/ClientProfilePic";
import DisplayHostPets from "../../components/HostProfile/DisplayHostPets";
import getAddress from "../../services/address/getAddress";

const userFullName = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");

export default function AccountInfo(props) {
  const [address, setAddCheck] = useState({});

  useEffect(() => {
    getAddress().then((result) => {
      setAddCheck(result.data.getAddress.address);
    });
  }, []);
  const userId = localStorage.getItem("id");

  return (
    <div className="flex flex-col xl:flex-row justify-center px-10 gap-10">
      <div className="flex-shrink-0">
        <h3 className="text-lg font-medium text-center">{userFullName}</h3>
        <div className="flex xl:items-center flex-row xl:flex-col m-4 gap-6 flex-shrink-0 ">
          <div className="profile-img">
            <ClientProfilePic />
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid-address">
              <span className=" col-span-2">Address :</span>
              <span className="text-right">street:</span> <span>{address.street} very long address</span>
              <span className="text-right">city:</span> <span>{address.city} </span>
              <span className="text-right">state:</span> <span> {address.state}</span>
              <span className="text-right">zip:</span> <span>{address.zipcode}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-center">Pets I have:</h3>
        <DisplayHostPets userId={userId} />
      </div>
    </div>
  );
}
