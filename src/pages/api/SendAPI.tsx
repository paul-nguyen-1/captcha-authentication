import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import MySession, { newCaptchaImages } from './ImageAPI';

interface MySession {
    captchaImages?: string[];
}
const ironSessionHandler = withIronSessionApiRoute(
    //Setting up validation for jim images in captcha
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        const { selectIndex } = req.body;
        const session = req.session as MySession;

        //map through captcha images and filter out not jim images
        const jimIndex = session?.captchaImages?.map((path, index) => {
            return path.includes('/images/jim') ? index : -1
        }).filter(index => index !== -1)

        //return jim and not jim images
        const captchaValidation: boolean = JSON.stringify(jimIndex?.sort()) === JSON.stringify(selectIndex?.sort())

        //resetting captcha on each send request
        session.captchaImages = newCaptchaImages()
        await req.session.save()

        // console.log({ message })
        // console.log({ jimIndex })
        // console.log({ selectIndex })
        // console.log({ captchaValidation })
        // console.log("response:", res.json);

        res.setHeader('Content-Type', 'application/json');
        res.json({
            body: {
                jimIndex,
                captchaValidation,
                selectIndex,
            }
        });
    },
    {
        cookieName: 'session',
        password: process.env.SESSION_SECRET!,
    }
);

export default ironSessionHandler;

