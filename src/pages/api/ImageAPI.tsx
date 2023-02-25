import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
res.setHeader('Content-Type', 'image.webp');
const imageBuffer = fs.readFileSync('./public/images/jim1.webp');
res.send(imageBuffer);
}