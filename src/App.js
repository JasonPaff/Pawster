import { Routes, Route } from "react-router-dom";

// Importing Components
import { BaseLayout, DashboardLayout } from "./Layouts";
import Landing from "./pages/Landing";
import Login from "./components/Authentication/Login";
import Logout from "./components/Authentication/Logout";
import Search from "./pages/Search";
import Register from "./components/Authentication/Register";
import EditClient from "./pages/EditProfile/EditClient";
import AddPet from "./pages/Pet/AddPetPage";
import CreateHost from "./components/Add&Create/CreateHost";
import PetProfile from "./pages/Profiles/PetProfile";
import CreateBoarding from "./components/Add&Create/Services/CreateBoarding";
import HostProfile from "./pages/Profiles/HostProfile";
import CreateDayCare from "./components/Add&Create/Services/CreateDayCare";
import CreateSitting from "./components/Add&Create/Services/CreateSitting";
import CreateVisit from "./components/Add&Create/Services/CreateVisit";
import CreateWalking from "./components/Add&Create/Services/CreateWalking";
import Messages from "./pages/Messages";
import AccountInfo from "./pages/Profiles/AccountInfo";
import EditPet from "./pages/Pet/EditPet";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile/host/:userId" element={<HostProfile />} />
        </Route>
        <Route path="/profile" element={<DashboardLayout />}>
          <Route path="/profile" element={<AccountInfo />} />

          <Route path="/profile/account-info" element={<EditClient />} />
          <Route path="/profile/add-pet" element={<AddPet />} />
          <Route path="/profile/pet-profile/edit/:petId" element={<EditPet />} />
          <Route path="/profile/register-host" element={<CreateHost />} />
          <Route path="/profile/pet-profile/:petId" element={<PetProfile />} />
          <Route path="/profile/edit-boarding" element={<CreateBoarding />} />
          <Route path="/profile/edit-daycare" element={<CreateDayCare />} />
          <Route path="/profile/edit-sitting" element={<CreateSitting />} />
          <Route path="/profile/messages" element={<Messages />} />
          <Route path="/profile/edit-visit" element={<CreateVisit />} />
          <Route path="/profile/edit-walking" element={<CreateWalking />} />
        </Route>{" "}
      </Routes>
    </>
  );
}

export default App;
