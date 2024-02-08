import { sql } from "@vercel/postgres";

export default async function PeopleList(): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * FROM People`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.firstname} {row.lastname}
        </div>
      ))}
    </div>
  );
}