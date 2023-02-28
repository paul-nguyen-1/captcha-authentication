import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';

interface MySession {
  captchaImages?: string[];
}

export function newCaptchaImages() {
  //Set up path for API to randomize images for it to either be Jim or another character
  const correctImage = 0.5;
  return (new Array(9))
    .fill(null)
    .map((value, index: number) => {
      const jimCaptcha = Math.random() < correctImage;
      const imgIndex = Math.floor(Math.random() * (jimCaptcha ? 10 : 13) + 1);
      const character = (jimCaptcha ? 'jim' : 'notjim') + imgIndex + '.webp';
      return `./images/${character}`;
    });
}

const ironSessionHandler = withIronSessionApiRoute(
  // Export cookies to keep same captcha after each reload
  // Return API images into captcha array
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
