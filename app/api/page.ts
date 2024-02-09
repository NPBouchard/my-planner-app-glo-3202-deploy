import { sql } from '@vercel/postgres';

type RequestBody = {
  query?: string;
  parameters?: any[];
};

type QueryResponse = any;

// type MyApiRequest = {
//   method?: string;
//   body: RequestBody;
// };

// type MyApiResponse = {
//   status: (statusCode: number) => MyApiResponse;
//   json: (body: QueryResponse | { message: string }) => void;
//   setHeader: (field: string, value: string[]) => void;
// };

// Directly use any for req and res to simplify and avoid the strict type issue
export default async function handler(
    req: any, // Use a broader type if specific typing is not crucial
    res: any
  ) {
    const { query, parameters }: RequestBody = req.body;
  
    try {
      switch (req.method) {
        case 'POST':
          if (!query || parameters === undefined) {
            return res.status(400).json({ message: 'Bad request' });
          }
          const postResults: QueryResponse = await executeQuery(query, parameters);
          return res.status(200).json(postResults);
  
        case 'GET':
          const getResults: QueryResponse = await executeQuery('SELECT * FROM myTable', []);
          return res.status(200).json(getResults);
  
        case 'DELETE':
          if (!query || parameters === undefined) {
            return res.status(400).json({ message: 'Bad request' });
          }
          const deleteResults: QueryResponse = await executeQuery(query, parameters);
          return res.status(200).json(deleteResults);
  
        default:
          res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
          return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function executeQuery(query: string, parameters: any[]): Promise<QueryResponse> {
    // Placeholder for actual database interaction code
    return {}; // Placeholder return
  }