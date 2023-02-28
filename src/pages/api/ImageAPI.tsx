import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import path from 'path';

interface MySession {
  captchaImages?: string[];
}

//Set up path for API to randomize images for it to either be Jim or another character
export function newCaptchaImages() {
  const correctImage = 0.5;
  return (new Array(9))
    .fill(null)
    .map((value, index: number) => {
      const jimCaptcha = Math.random() < correctImage;
      const imgIndex = Math.floor(Math.random() * (jimCaptcha ? 10 : 13) + 1);
      const character = (jimCaptcha ? 'jim' : 'notjim') + imgIndex + '.webp';
      return path.join(process.cwd(), 'public', 'images', character);
    });
}

// Export cookies to keep same captcha after each reload
// Return API images into captcha array
const ironSessionHandler = withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const index = parseInt(req.query.index as string);
    const session = req.session as MySession;
    if (!session.captchaImages) {
      session.captchaImages = newCaptchaImages();
      await req.session.save();
    }
    res.setHeader('Content-Type', 'image/webp');
    const imageBuffer = fs.readFileSync(session.captchaImages[index]);
    res.send(imageBuffer);
  },
  {
    cookieName: 'session',
    password: process.env.SESSION_SECRET!,
  }
);

export default ironSessionHandler;