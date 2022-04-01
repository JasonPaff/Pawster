import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import getUserById from "../../services/user/getUserById";
import getHostById from "../../services/host/getHostById";
import DisplayServices from "../../components/HostProfile/DisplayServices";
import SendMessage from "../../parts/Messages/SendMessage";
import HostProfilePic from "../../components/HostProfile/HostProfilePic";
import DisplayHostPets from "../../components/HostProfile/DisplayHostPets";
import { parseAndCheckHttpResponse } from "@apollo/client";

// const card = "bg-white border border-slate-200 shadow-sm rounded-md p-5 ";

function HostProfile() {
  const params = useParams();
  const [host, setHost] = useState({});
  const [user, setUser] = useState({});
  const [isNotLoggedInUser, setIsNotLoggedInUser] = useState(true);

  useEffect(() => {
    getUserById(params.userId).then((result) => {
      setUser(result.data.getUserById.user);
    });
    getHostById(params.userId).then((result) => {
      setHost(result.data.getHostById.host);
    });
    checkLoggedInUser();
  }, []);

  // so we don't show the message component on our own host profile
  function checkLoggedInUser() {
    if (params.userId === localStorage.getItem("id")) {
      setIsNotLoggedInUser(false);
    }
  }

  return (
    <div className=" container mx-auto grid grid-rows-2 grid-flow-col gap-4 p-10 h-full">
      <div className={`row-span-2`}>
        <HostProfilePic hostId={params.userId}/>
      </div>

      {isNotLoggedInUser && (
        <div className="card row-span-1">
          <span>
            Contact {user.firstName} {user.lastName}
          </span>
          <SendMessage hostId={params.userId} />
        </div>
      )}

      <div className="card row-span-1 flex-row">
        <div className="text-2xl font-medium mb-2">Services</div>
        <DisplayServices hostId={params.userId} />
      </div>

      <div className="card row-start-1 row-end-6 col-span-5">
        <div>
          {user.firstName} {user.lastName}
        </div>

        <div>About me?</div>

        <NavLink to={`/book-host/${params.userId}`}>Book Appointment</NavLink>

        <div>Host Info</div>

        <DisplayHostPets userId={params.userId} />
      </div>
    </div>
  );
}

export default HostProfile;
