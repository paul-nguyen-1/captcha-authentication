// import { withIronSessionApiRoute } from 'iron-session/next';
// import { NextApiRequest, NextApiResponse } from 'next';
// import MySession from './ImageAPI';

// interface MySession {
//     captchaImages?: string[];
// }
// export const ironSessionHandler = withIronSessionApiRoute(
//     // Export cookies to keep same captcha after each reload
//     // Return API images into captcha array
//     async function handler(req: NextApiRequest, res: NextApiResponse) {
//         const { message, selectIndex } = req.body;
//         const session = req.session as MySession;
//         console.log({ message, selectIndex, captchaImages: session.captchaImages });
//         res.json({ body: {} });
//     }, {
//     cookieName: 'session',
//     password: process.env.SESSION_SECRET!,
// });

// export default ironSessionHandler;

import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import MySession from './ImageAPI';

interface MySession {
    captchaImages?: string[];
}
const ironSessionHandler = withIronSessionApiRoute(
    // Export cookies to keep same captcha after each reload
    // Return API images into captcha array
    async function handler(req: NextApiRequest, res: NextApiResponse) {
      const {message, selectIndex} = req.body;
      console.log(message, selectIndex);
      res.json({ body: {} });
    },
    {
      cookieName: 'session',
      password: process.env.SESSION_SECRET!,
    }
  );
  
  export default ironSessionHandler;
  
