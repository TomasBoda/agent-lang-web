import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const timestamp = process.env.TIMESTAMP || 'N/A';
  res.status(200).json({ timestamp });
};