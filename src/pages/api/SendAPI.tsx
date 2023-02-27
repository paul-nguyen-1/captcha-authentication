import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import MySession from './ImageAPI';

interface MySession {
    captchaImages?: string[];
}
const ironSessionHandler = withIronSessionApiRoute(
    //Set up input message and selected index to endpoint in body
    async function handler(req: NextApiRequest, res: NextApiResponse) {
      const {message, selectIndex} = req.body;
      const session = req.session as MySession;
      session.captchaImages;
      console.log({message, selectIndex, captchaImages: session.captchaImages});
      res.json({ body: {} });
    },
    {
      cookieName: 'session',
      password: process.env.SESSION_SECRET!,
    }
  );
  
  export default ironSessionHandler;
  
