"use client"
import React, {useState, useEffect} from "react";

export default async function EventList(){
    const userID = 1; 
    // const [events, setEvents] = useState(null)

    // // useEffect(() => {
    // //     // Call loadEvents when the component mounts
    // //     loadEvents();
    // //   }, []);

    // const loadEvents = async () => {
    //     try {
    //         const res = await fetch(`https://my-planner-app-glo-3202-deploy.vercel.app/api/events/${userID}`, {
    //           method: 'GET',
    //           headers: {
    //             'content-type': 'application/json'
    //           }
    //         })
    //         console.log(res)
    //         if(res.ok){
    //             const data = await res.json();
    //             setEvents(data);
    //             console.log("Yeai!", data)
    //         }else{
    //           console.log("Oops! Something is wrong.")
    //         }
    //       } catch (error) {
    //           console.log(error)
    //       }
    //   }
    

    const [data, setData] = useState(null);

  useEffect(() => {
    // Define an async function inside the effect
    const fetchData = async () => {
      try {
        const response = await fetch(`https://my-planner-app-glo-3202-deploy.vercel.app/api/events/${userID}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    // Call the async function
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
        {/* <button onClick={loadEvents}>Click</button> */}
  <h2 className="text-2xl font-bold mb-4">Liste des Événements</h2>
  <div className="grid grid-cols-5 gap-4">
    {/* {rows.map((event: any, index: any) => (
      <div key={index} className="bg-white shadow overflow-hidden rounded-md px-6 py-4 col-span-1">
        <div className="pb-4">
          <h3 className="text-xl font-semibold">{event.eventname}</h3>
          <p className="text-sm text-gray-500">Organisé par: UserID {event.userid}</p>
          <p className="text-sm text-gray-500">Date: {new Date(event.eventdate).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Lieu: {event.eventlocation}</p>
        </div>
        <div>
          <p className="text-gray-700">{event.eventdescription}</p>
        </div>
      </div>
    ))} */}
  </div>
  
</div>
  );
}