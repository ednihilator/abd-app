import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('API Route Hit'); // Debug log
    res.status(200).json({ message: 'Test route is working!' });
}

// curl http://localhost:3000/api/test <---test me using this
