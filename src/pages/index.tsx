import { useState } from "react";
import Captcha from "@/components/Captcha";
import { withIronSessionSsr } from 'iron-session/next';
import MySession, { newCaptchaImages } from './api/ImageAPI';

interface MySession {
  captchaImages?: string[];
}

export default function Home({ defaultCaptchaKey }: { defaultCaptchaKey: string }) {
  const [selectIndex, setSelectIndex] = useState<number[]>([])
  const [captchaKey, setCaptchaKey] = useState<string>(defaultCaptchaKey)
  //Handle all messages within input
  const [message, setMessage] = useState<string>('')
  const handleMessage = (e: any) => {
    setMessage(e.target.value)
  }

  //Send message to API
  const sendMessage = () => {
    if (!message) {
      alert(`Send a message...unless you're a bot!`)
      return;
    }
    //Fetch data from captcha to send to api
    fetch('/api/SendAPI', {
      method: 'POST',
      body: JSON.stringify({ message: message, selectIndex: selectIndex }),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      response.json().then(json => {
        console.log('json:', json.body.captchaValidation);
        if (json.body.captchaValidation) {
          setCaptchaKey((new Date()).getTime().toString())
          alert(`Congratulations! You're not a bot.`)
          setMessage('')
        }
        if (!json.body.captchaValidation) {
          setCaptchaKey((new Date()).getTime().toString())
          alert(`Wrong captcha. Try again...`)
        }
      })
    })
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Send a Message"
          onChange={handleMessage}
        ></input>
        <Captcha captchaKey={captchaKey} onChange={setSelectIndex} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  {
    // Set up the captcha images for the session if they don't already exist
    const session = req.session as MySession;
    if (!session.captchaImages) {
      session.captchaImages = newCaptchaImages();
      await req.session.save();
    }
    return {
      props: {
        defaultCaptchaKey: (new Date).getTime(),
      }
    };
  }
}, {
  cookieName: 'session',
  password: process.env.SESSION_SECRET!,
});
