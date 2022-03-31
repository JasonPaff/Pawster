const data = {
  services: [
    {
      id: 11,
      name: "doesBoarding",
      label: "Boarding",
      iconColor: "travel-color.png",
      iconContour: "travel-contour.png",
    },
    {
      id: 12,
      name: "doesHouseSitting",
      label: "Home Sitting",
      iconColor: "house-color.png",
      iconContour: "house-contour.png",
    },
    {
      id: 13,
      name: "doesDropInVisits",
      label: "Drop-in Visits",
      iconColor: "pet-bowl-color.png",
      iconContour: "pet-bowl-contour.png",
    },
    {
      id: 14,
      name: "doesDayCare",
      label: "Day Care",
      iconColor: "daycare-color.png",
      iconContour: "daycare-contour.png",
    },
    {
      id: 15,
      name: "doesDogWalking",
      label: "Dog Walking",
      iconColor: "dog-walking-color.png",
      iconContour: "dog-walking-contour.png",
    },
  ],

  weights: [
    {
      id: "w1",
      name: "canHostSmallPet",
      title: "Small",
      weight: "1 - 15",
    },
    {
      id: "w2",
      name: "canHostMediumPet",
      title: "Medium",
      weight: "16 - 40",
    },
    {
      id: "w3",
      name: "canHostLargePet",
      title: "Large",
      weight: "41 - 100",
    },
    {
      id: "w4",
      name: "canHostGiantPet",
      title: "Giant",
      weight: "101 - 200",
    },
  ],
};

export { data };
