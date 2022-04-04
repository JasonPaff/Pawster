import React, { useEffect, useState, useMemo } from "react";
import getHostById from "../../../services/host/getHostById";
import getUserById from "../../../services/user/getUserById";
import getDaycareById from "../../../services/daycare/getDaycareById";
import StripeContainer from "../../Stripe/StripeContainer";

function BookDaycare(props) {
  const [user, setUser] = useState({});
  const [host, setHost] = useState({});
  const [daycare, setDaycare] = useState({});
  const [book, setBook] = useState({});
  const [showItem, setShowItem] = useState(false);
  const [checked, setChecked] = useState([]);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    getHostById(props.hostId).then((result) => setHost(result.data.getHostById.host));
    getDaycareById(props.hostId).then((result) => {
      if (result.data.getDaycareById.daycare !== null) {
        setDaycare(result.data.getDaycareById.daycare);
      }
    });
    getUserById(userId).then((result) => setUser(result.data.getUserById.user));
  }, []);

  const data = [
    {
      name: "Pet Bathing",
      amount: daycare.bathingRate,
    },
    {
      name: "Additional Dog",
      amount: daycare.additionalDogRate,
    },
    {
      name: "Additional Cat",
      amount: daycare.additionalCatRate,
    },
    {
      name: "Puppy",
      amount: daycare.puppyRate,
    },
  ];

  const totalSum = useMemo(
    () => Object.entries(checked).reduce((accumulator, [name, value]) => (value ? accumulator + data.find((service) => service.name + "" === name).amount : accumulator), 0),
    [checked]
  );

  function handleBooking() {
    setShowItem(true);
  }

  return (
    <div className="w-3/5">
      {host.doesDayCare ? (
        <div>
          {showItem ? (
            <StripeContainer />
          ) : (
            <>
              <div>
                <div className="text-center text-2xl font-medium my-4">Day Care Base Rate: ${daycare.baseRate}</div>
                <div className="text-center font-medium  underline my-4">Add ons: </div>
                <div className="lg:grid grid-cols-2">
                  {data.map(({ name, amount }) => {
                    return (
                      <div>
                        <label>
                          <input
                            className="mr-2"
                            type="checkbox"
                            defaultChecked={!!checked[name]}
                            onChange={() => {
                              setChecked({
                                ...checked,
                                [name]: !checked[name],
                              });
                            }}
                          />
                          {name}: ${amount}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-center my-8 text-lg font-medium text-accent-red">Total: ${totalSum + daycare.baseRate}</div>
              <button className="bg-accent-green text-white w-44 mx-auto block" onClick={handleBooking}>
                Book
              </button>
            </>
          )}
        </div>
      ) : (
        <div>"Host does not provide this service"</div>
      )}
    </div>
  );
}

export default BookDaycare;
