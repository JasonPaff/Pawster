
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import createHost from '../../services/host/createHost'
import updateUserIsHost from '../../services/user/updateUserIsHost'
import getUserById from '../../services/user/getUserById'
import getHostById from '../../services/host/getHostById'
import updateHost from '../../services/host/updateHost'

const userId = localStorage.getItem("id")

function CreateHost() {

  const navigate = useNavigate()

  const [user, setUser] = useState({})
  const [host, setHost] = useState({
      "canHostMultiplePets": false,
      "canHostUnspayedFemales": false,
      "doesBoarding": false,
      "doesHouseSitting": false,
      "doesDropInVisits": false,
      "doesDayCare": false,
      "doesDogWalking": false,
      "hasChildren": false,
      "hasOtherPets": false,
      "isHomeFullTime": false,
      "isSmoking": false,
      "sizeCanHost": "All",
      "typeOfHome": "House",
      "typeOfYard": '',
  })
  const [updateHosts, setUpdateHost] = useState({})

  console.log(userId)
  useEffect(() => {
    getUserById(userId).then((result) => {setUser(result.data.getUserById.user)})
    getHostById(userId).then((result) => {setUpdateHost(result.data.getHostById.host)})
  }, [])

  const handleTextChange = (e) => {
      setHost({
      ...host,
      [e.target.name]: e.target.value,
      })
  }

  const handleUpdateTextChange = (e) => {
    setUpdateHost({
      ...updateHosts,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooleanChange = (e) => {
      const { checked } = e.target
      setHost({
        ...host,
        [e.target.name]: checked,
      })
  }

  const handleUpdateBooleanChange = (e) => {
    const { checked } = e.target
    setUpdateHost({
      ...updateHosts,
      [e.target.name]: checked,
    })
}

  const handleIntegerChange = (e) => {
      setHost({
      ...host,
      [e.target.name]: parseInt(e.target.value)
      })
  }

  const handleUpdateIntegerChange = (e) => {
    setUpdateHost({
      ...updateHosts,
      [e.target.name]: parseFloat(e.target.value),
    })
  }



  async function handleCreateHost() {
    const response = await createHost(host);
    const response2 = await updateUserIsHost(true)
    console.log(response2)
    if (response.data.createHost.success) {
      console.log("Host Created");
      window.location.reload()
      navigate("/profile");
    } else {
      alert(response.data.createHost.message);
    }
  }

  async function handleUpdateHost() {
    const response = await updateHost(updateHosts);
    if (response.data.updateHost.success) {
      console.log("Host Updated");
      navigate("/profile");
    } else {
      alert(response.data.updateHost.message);
    }
  }


  return (
    <div>
      {!user.isHost ? 
        <div className="flex flex-col px-10 py-4 gap-3">
        <h3 className="text-center text-accent-green">Edit Host Info</h3>
        <div>
        About Me
          <textarea placeholder="About Me"  rows="6" name="aboutMe" onChange={handleTextChange}/>
        </div>
        <div>
        Days Available
          <input type="text" placeholder="Days Available"  name="daysAvailable" onChange={handleTextChange} />
        </div>
        <div>
        Experience with animals
          <input type="text" placeholder="Experience with animals" name="experience" onChange={handleTextChange} />
        </div>
        <div>
          <label htmlFor=""> Can you host multiple pets? </label>
          <input type="checkbox" className=" appearance-none checked:slate-300"  name="canHostMultiplePets" onChange={handleBooleanChange} />
        </div>
        <div>
          Can you host unspayed females?
          <input type="checkbox"  name="canHostUnspayedFemales" onChange={handleBooleanChange} />
        </div>
        <div>
          Do you have children? <input type="checkbox"  name="hasChildren" onChange={handleBooleanChange} />
        </div>
        <div>
          Do you have other pets? <input type="checkbox"  name="hasOtherPets" onChange={handleBooleanChange} />
        </div>
        <div>
          Are you home full-time? <input type="checkbox"  name="isHomeFullTime" onChange={handleBooleanChange} />
        </div>
        <div>
          Are you a smoker? <input type="checkbox" name="isSmoking" onChange={handleBooleanChange} />
        </div>
        <div>
          <p className="font-medium underline" >Type can Host</p>
          <div>
            Cat <input type="checkbox"  name="doesCat" onChange={handleBooleanChange} />
          </div>
          <div>
            Dog <input type="checkbox"  name="doesDog" onChange={handleBooleanChange} />
          </div>
        </div>
        <div>
          <p className="font-medium underline">Size pet that you are able to host :</p>
          <div>
            Small <input type="checkbox" name="canHostSmallPet" onChange={handleBooleanChange} />
          </div>
          <div>
            Medium <input type="checkbox"  name="canHostMediumPet" onChange={handleBooleanChange} />
          </div>
          <div>
            Large <input type="checkbox" name="canHostLargePet" onChange={handleBooleanChange} />
          </div>
          <div>
            Giant <input type="checkbox" name="canHostGiantPet" onChange={handleBooleanChange} />
          </div>
        </div>
        <div>
        How far are you willing to work
          <input type="text" placeholder="How far are you willing to work"  name="range" onChange={handleIntegerChange} />
        </div>
        <div>
        Enter a schedule
          <input type="text" placeholder="Enter a schedule"  name="schedule" onChange={handleTextChange} />
        </div>
        <div>
          What is the max number of pets you can host
          <input type="text" placeholder="What is the max number of pets you can host"  name="totalCanHost" onChange={handleIntegerChange} />
        </div>
        <div>
        Type of Home (House, Apartment, etc)
          <input type="text" placeholder="Type of Home (House, Apartment, etc)"  name="typeOfHome" onChange={handleTextChange} />
        </div>
        <div>
        Description of your yard (if applicable)
          <input type="text" placeholder="Description of your yard (if applicable)"  name="typeOfYard" onChange={handleTextChange} />
        </div>
        <div>
          Cancellation Policy
          <textarea type="text" placeholder="Cancellation Policy"  name="cancellationPolicy" onChange={handleTextChange} />
        </div>
        <button onClick={handleCreateHost}>Register</button>
      </div>
        : 
        <div className="flex flex-col px-10 py-4 gap-3">
        <h3 className="text-center text-accent-green">Edit Host Info</h3>
        <div>
        About Me
  
          <textarea placeholder="About Me"  rows="6" defaultValue={updateHosts.aboutMe} name="aboutMe" onChange={handleTextChange}/>
        </div>
        <div>
        Days Available
          <input type="text" placeholder="Days Available" defaultValue={updateHosts.daysAvailable} name="daysAvailable" onChange={handleUpdateTextChange} />
        </div>
        <div>
        Experience with animals
          <input type="text" placeholder="Experience with animals" defaultValue={updateHosts.experience} name="experience" onChange={handleUpdateTextChange} />
        </div>
        <div>
          <label htmlFor=""> Can you host multiple pets? </label>
          <input type="checkbox" className=" appearance-none checked:slate-300" defaultChecked={updateHosts.canHostMultiplePets} name="canHostMultiplePets" onChange={handleUpdateBooleanChange} />
        </div>
        <div>
          Can you host unspayed females?
          <input type="checkbox" defaultChecked={updateHosts.canHostUnspayedFemales} name="canHostUnspayedFemales" onChange={handleUpdateBooleanChange} />
        </div>
        <div>
          Do you have children? <input type="checkbox" defaultChecked={updateHosts.hasChildren} name="hasChildren" onChange={handleUpdateBooleanChange} />
        </div>
        <div>
          Do you have other pets? <input type="checkbox" defaultChecked={updateHosts.hasOtherPets} name="hasOtherPets" onChange={handleUpdateBooleanChange} />
        </div>
        <div>
          Are you home full-time? <input type="checkbox" defaultChecked={updateHosts.isHomeFullTime} name="isHomeFullTime" onChange={handleUpdateBooleanChange} />
        </div>
        <div>
          Are you a smoker? <input type="checkbox" defaultChecked={updateHosts.isSmoking} name="isSmoking" onChange={handleUpdateBooleanChange} />
        </div>
        <div>
          <p className="font-medium underline" >Type can Host</p>
          <div>
            Cat <input type="checkbox" defaultChecked={updateHosts.doesCat} name="doesCat" onChange={handleUpdateBooleanChange} />
          </div>
          <div>
            Dog <input type="checkbox" defaultChecked={updateHosts.doesDog} name="doesDog" onChange={handleUpdateBooleanChange} />
          </div>
        </div>
        <div>
          <p className="font-medium underline">Size pet that you are able to host :</p>
          <div>
            Small <input type="checkbox" defaultChecked={updateHosts.canHostSmallPet} name="canHostSmallPet" onChange={handleUpdateBooleanChange} />
          </div>
          <div>
            Medium <input type="checkbox" defaultChecked={updateHosts.canHostMediumPet} name="canHostMediumPet" onChange={handleUpdateBooleanChange} />
          </div>
          <div>
            Large <input type="checkbox" defaultChecked={updateHosts.canHostLargePet} name="canHostLargePet" onChange={handleUpdateBooleanChange} />
          </div>
          <div>
            Giant <input type="checkbox" defaultChecked={updateHosts.canHostGiantPet} name="canHostGiantPet" onChange={handleUpdateBooleanChange} />
          </div>
        </div>
        <div>
        How far are you willing to work
          <input type="text" placeholder="How far are you willing to work" defaultValue={updateHosts.range} name="range" onChange={handleUpdateIntegerChange} />
        </div>
        <div>
        Enter a schedule
          <input type="text" placeholder="Enter a schedule" defaultValue={updateHosts.schedule} name="schedule" onChange={handleUpdateTextChange} />
        </div>
        <div>
          What is the max number of pets you can host
          <input type="text" placeholder="What is the max number of pets you can host" defaultValue={updateHosts.totalCanHost} name="totalCanHost" onChange={handleUpdateIntegerChange} />
        </div>
        <div>
        Type of Home (House, Apartment, etc)
          <input type="text" placeholder="Type of Home (House, Apartment, etc)" defaultValue={updateHosts.typeOfHome} name="typeOfHome" onChange={handleUpdateTextChange} />
        </div>
        <div>
        Description of your yard (if applicable)
          <input type="text" placeholder="Description of your yard (if applicable)" defaultValue={updateHosts.typeOfYard} name="typeOfYard" onChange={handleUpdateTextChange} />
        </div>
        <div>
          Cancellation Policy
          <textarea type="text" placeholder="Cancellation Policy" defaultValue={updateHosts.cancellationPolicy} name="cancellationPolicy" onChange={handleUpdateTextChange} />
        </div>
        <button onClick={handleUpdateHost}>Update</button>
      </div>
      }

    </div>
   
      
  );
}

export default CreateHost;
