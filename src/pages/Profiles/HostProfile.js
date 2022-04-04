import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import getUserById from "../../services/user/getUserById";
import getHostById from "../../services/host/getHostById";
import DisplayServices from "../../components/HostProfile/DisplayServices";
import SendMessage from "../../parts/Messages/SendMessage";
import HostProfilePic from "../../components/HostProfile/HostProfilePic";
import DisplayHostPets from "../../components/HostProfile/DisplayHostPets";
import { AiOutlineCheck } from "react-icons/ai";

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
    <div className="flex flex-col  md:flex-row container mx-auto  gap-4 py-4 px-2 lg:px-10 h-full xl:px-20 ">
      <div className="flex flex-wrap md:flex-col md:w-64 md:shrink-0 gap-2 ">
        <div className="card flex items-center min-h-[256px]">
          <HostProfilePic hostId={params.userId} imgStyle={"object-cover border border-slate-300 rounded-lg mx-auto"} />
        </div>

        <div className="card w-full">
          <div>
            <div className="  text-center text-lg font-medium underline mb-3">Services:</div>
            <DisplayServices hostId={params.userId} />
          </div>
          <NavLink to={`/book-host/${params.userId}`}>
            <button className=" w-full mt-6 mb-6 bg-accent-green text-white ">Book a Service</button>
          </NavLink>
        </div>
      </div>

      <div className="card p-6  xl:px-10 w-full">
        <div className=" text-2xl font-medium">
          {user.firstName} {user.lastName}
        </div>

        <div className=" xl:flex xl:gap-8 p-6 my-5 border rounded-lg ">
          <div className=" flex-shrink-0 xl:w-[28%]  ">
            {host.doesCat ? (
              <div className="flex  mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1 text-slate-500" />
                <span> Can Host Cats</span>
              </div>
            ) : null}
            {host.doesDog ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1  text-slate-500" />
                <span> Can Host Dogs</span>
              </div>
            ) : null}
            {!host.isSmoking ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1  text-slate-500" />
                <span> Non-Smoking Household</span>
              </div>
            ) : null}
            {!host.hasChildren ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1  text-slate-500" />
                <span> No Children Present</span>
              </div>
            ) : null}
            {host.isHomeFullTime ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1  text-slate-500" />
                <span> Home Full Time</span>
              </div>
            ) : null}
            {host.canHostGiantPet ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1  text-slate-500" />
                <span> Giant Pets</span>
              </div>
            ) : null}
            {host.canHostLargePet ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1  text-slate-500" />
                <span> Large Pets</span>
              </div>
            ) : null}
            {host.canHostMediumPet ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1  text-slate-500" />
                <span> Medium Pets</span>
              </div>
            ) : null}
            {host.canHostSmallPet ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1  text-slate-500" />
                <span> Small Pets</span>
              </div>
            ) : null}
            {host.canHostMultiplePets ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1  text-slate-500" />
                <span> Multiple Pets</span>
              </div>
            ) : null}
            {host.canHostUnspayedFemales ? (
              <div className="flex mr-5">
                <AiOutlineCheck size="1.3em" className="mr-1 text-slate-500" />
                <span> Can Host Unspayed Females</span>
              </div>
            ) : null}
          </div>
          <div>
            <ul className="flex flex-col gap-1 min-w-fit">
              <li className="flex gap-2 items-center w-fit">
                <label className="text-sm text-gray-500">My place: </label>
                <span className="">{host.typeOfHome}</span>
              </li>
              <li className="flex gap-2 items-center w-fit">
                <label className="text-sm text-gray-500">My of Yard: </label>
                <span className="">{host.typeOfYard}</span>
              </li>
              <li className="flex gap-2 items-center w-fit">
                <label className="text-sm text-gray-500">Days Available:</label>
                <span className="p">{host.daysAvailable}</span>
              </li>
            </ul>
            <div className="my-5">
              <p className="text-sm text-gray-500">About Me:</p>
              <p className="">{host.aboutMe}</p>
            </div>
          </div>
        </div>

        {isNotLoggedInUser && (
          <div className="card">
            <span>send a message:</span>
            <SendMessage hostId={params.userId} />
          </div>
        )}

        <div className="mt-10">
          {user.firstName}'s Pets:
          <DisplayHostPets userId={params.userId} />
        </div>

        <div className="pt-10 px-5">
          <p className="font-medium text-lg">Cancellation Policy:</p>
          <div className="p-2">
            {host.cancellationPolicy} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque quibusdam molestias suscipit corrupti illum quam aspernatur harum incidunt facere earum, enim,
            esse ad! Possimus eius perferendis necessitatibus sit maiores? Perferendis, error necessitatibus Hardcoded in HostProfile.js.
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostProfile;
