import CreateAddress from "../../components/Create/CreateAddress";



function EditClient() {

  return (
    <div className="flex justify-around">
      <div>Saved Addresses</div>
      <div>Create an Address
        <CreateAddress />
      </div>
    </div>
  );
}

export default EditClient;