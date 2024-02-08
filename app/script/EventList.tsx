import { sql } from "@vercel/postgres";

export default async function EventList(): Promise<JSX.Element> {
    const userID = 1; 

    const { rows } = await sql`SELECT * FROM events WHERE Userid = ${userID}`;
    console.log(rows);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Liste des Événements</h2>
      <div className="space-y-4">
        {rows.map((event: any, index : any) => (
          <div key={index} className="bg-white shadow overflow-hidden rounded-md px-6 py-4">
            <div className="pb-4">
              <h3 className="text-xl font-semibold">{event.Eventname}</h3>
              <p className="text-sm text-gray-500">Organisé par: UserID {event.Userid}</p>
              <p className="text-sm text-gray-500">Date: {event.Eventdate}</p>
              <p className="text-sm text-gray-500">Lieu: {event.Eventlocation}</p>
            </div>
            <div>
              <p className="text-gray-700">{event.Eventdescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}