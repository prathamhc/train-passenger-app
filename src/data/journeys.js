// Central configuration for all train journeys
// To add a new journey, simply add a new object to this array

export const journeys = [
    {
        id: 1,
        name: "Bandra to Haridwar",
        route: "Bandra → Haridwar",
        dataFile: "bandra-haridwar.xlsx",
        color: "blue",
        gradient: "from-blue-500 to-blue-600"
    },
    {
        id: 2,
        name: "Nizamuddin to Pune",
        route: "Nizamuddin → Pune",
        dataFile: "nizamuddin-pune.xlsx",
        color: "green",
        gradient: "from-green-500 to-green-600"
    }
    // Add more journeys here as needed:
    // {
    //   id: 3,
    //   name: "Mumbai to Delhi",
    //   route: "Mumbai → Delhi",
    //   dataFile: "mumbai-delhi.xlsx",
    //   color: "purple",
    //   gradient: "from-purple-500 to-purple-600"
    // }
];