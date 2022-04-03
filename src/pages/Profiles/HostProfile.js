import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import getUserById from "../../services/user/getUserById";
import getHostById from "../../services/host/getHostById";
import DisplayServices from "../../components/HostProfile/DisplayServices";
import SendMessage from "../../parts/Messages/SendMessage";
import HostProfilePic from "../../components/HostProfile/HostProfilePic";
import DisplayHostPets from "../../components/HostProfile/DisplayHostPets";
import { AiOutlineCheck } from 'react-icons/ai'


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
      <div className={`row-span-1 h-20`}>
        <HostProfilePic hostId={params.userId}/>
        <div className="card row-span-1 flex-row mt-5">
          <div className="text-2xl font-medium mb-2">Services</div>
          <DisplayServices hostId={params.userId} />
        </div>
      {isNotLoggedInUser && (
        <div className="card row-span-1 mt-2">
          <span>
            Contact {user.firstName} {user.lastName}
          </span>
          <SendMessage hostId={params.userId} />
        </div>
      )}
      </div>



      <div className="card row-start-1 row-end-6 col-span-5 p-10">
        <div className="text-4xl font-medium">
          {user.firstName} {user.lastName}
        </div>
        <div className="mt-10">
          <NavLink to={`/book-host/${params.userId}`}><button className="rounded-full w-44">Book a Service</button></NavLink>
        </div>

        <div className="mt-10 p-5">
          <p className="font-medium text-2xl">About Me</p>
          <div className="p-2">{host.aboutMe}</div>
        </div>


        <div className="mt-10 underline font-medium">About the Host's Home</div>
        <div className="flex flex-wrap mt-2 justify-evenly w-4/5">
          {host.doesCat ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Can Host Cats</div> : null}
          {host.doesDog ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Can Host Dogs</div> : null}
          {!host.isSmoking ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Non-Smoking Household</div> : null}
          {!host.hasChildren ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>No Children Present</div> : null}
          {host.isHomeFullTime ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Home Full Time</div> : null}
          {host.canHostGiantPet ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Giant Pets</div> : null}
          {host.canHostLargePet ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Large Pets</div> : null}
          {host.canHostMediumPet ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Medium Pets</div> : null}
          {host.canHostSmallPet ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Small Pets</div> : null}
          {host.canHostMultiplePets ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Multiple Pets</div> : null}
          {host.canHostUnspayedFemales ? <div className="flex justify-center text-slate-500 mr-5"><AiOutlineCheck size="1.3em" className="mr-1"/>Can Host Unspayed Females</div> : null}
        </div>

        <div className="p-5 mt-10">
          <p className="font-medium text-lg">Type of Home</p>
          <div className="p-2">{host.typeOfHome}</div>
        </div>

        <div className="p-5">
          <p className="font-medium text-lg">Type of Yard</p>
          <div className="p-2">{host.typeOfYard}</div>
        </div>

        <div className="p-5">
          <p className="font-medium text-lg">Days Available</p>
          <div className="p-2">{host.daysAvailable}</div>
        </div>

        <div className="p-5">
          <p className="font-medium text-lg">Cancellation Policy</p>
          <div className="p-2">{host.cancellationPolicy}</div>
        </div>


        <div className="mt-1">
          {user.firstName}'s Pets
          <DisplayHostPets userId={params.userId} />
        </div>
      </div>
    </div>
  );
}

export default HostProfile;
