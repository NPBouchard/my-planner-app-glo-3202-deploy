import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  cookies.set('myCookie', 'value', { httpOnly: true, sameSite: 'lax' });
  res.status(200).json({ message: 'Cookie set' });
};