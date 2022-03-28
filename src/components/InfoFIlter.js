import React from "react";

export default function InfoFIlter() {
  return (
    <>
      <div className="container mx-auto flex  justify-center py-8 px-4">
        <ul className="flex  flex-row flex-wrap justify-around">
          <li className="flex items-center w-100 sm:w-[48%] border  border-slate-300 rounded-md p-4 bg-white  mb-[2%]">
            <img className="h-20 float-left mr-4" src={require("../img/icons/travel-color.png")} alt="img" />
            <div>
              <h3 className="text-lg font-medium">Boarding</h3>
              <p className="text-sm">Your pets stay overnight in your sitter’s home. They’ll be treated like part of the family in a comfortable environment.</p>
            </div>
          </li>
          <li className="flex items-center w-100 sm:w-[48%] border  border-slate-300 rounded-md p-4 bg-white mb-[2%]">
            <img className="h-20 float-left mr-4" src={require("../img/icons/house-color.png")} alt="img" />
            <div>
              <h3 className="text-lg font-medium">House Sitting</h3>
              <p className="text-sm">Your sitter takes care of your pets and your home. Your pets will get all the attention they need without leaving home.</p>
            </div>
          </li>
          <li className="flex items-center w-100 sm:w-[48%] border  border-slate-300 rounded-md p-4 bg-white mb-[2%]">
            <img className="h-20 float-left mr-4" src={require("../img/icons/dog-walking-color.png")} alt="img" />
            <div>
              <h3 className="text-lg font-medium">Dog Walking</h3>
              <p className="text-sm">Your dog gets a walk around your neighborhood. Perfect for busy days and dogs with extra energy to burn</p>
            </div>
          </li>
          <li className="flex items-center w-100 sm:w-[48%] border  border-slate-300 rounded-md p-4 bg-white mb-[2%]">
            <img className="h-20 float-left mr-4" src={require("../img/icons/daycare-color.png")} alt="img" />
            <div>
              <h3 className="text-lg font-medium">Doggy Day Care</h3>
              <p className="text-sm">Your dog spends the day at your sitter’s home. Drop them off in the morning and pick up a happy pup in the evening</p>
            </div>
          </li>
          <li className="flex items-center w-100 sm:w-[48%] border  border-slate-300 rounded-md p-4 bg-white mb-[2%]">
            <img className="h-20 float-left mr-4" src={require("../img/icons/pet-bowl-color.png")} alt="img" />
            <div>
              <h3 className="text-lg font-medium">Drop-In Visits</h3>
              <p className="text-sm">Your sitter drops by your home to play with your pets, offer food, and give potty breaks or clean the litter box</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
