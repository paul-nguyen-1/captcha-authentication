import { useState, useEffect } from "react";
import Captcha from "@/components/Captcha";
import { withIronSessionSsr } from 'iron-session/next';
import MySession, { newCaptchaImages } from './api/ImageAPI';

interface MySession {
  captchaImages?: string[];
}

export default function Home({ defaultCaptchaKey }: { defaultCaptchaKey: string }) {
  const [selectIndex, setSelectIndex] = useState<number[]>([])
  const [captchaKey, setCaptchaKey] = useState<string>(defaultCaptchaKey)
  const [music, setMusic] = useState<boolean>(false)
  //Handle all messages within input
  const [message, setMessage] = useState<string>('')
  const handleMessage = (e: any) => {
    setMessage(e.target.value)
  }


  //Play the audio file when the music state is true
  const queueMusic = () => {
    setMusic(false)
    const audio = new Audio('/theoffice.mp3');
    if (music) {
      audio.play();
    }
  }

  //Send message to API
  const sendMessage = (e: any) => {
    e.preventDefault()
    if (!message) {
      alert(`Send a message...unless you're a bot!`)
      setMusic(false)
      setCaptchaKey((new Date()).getTime().toString())
      return;
    }
    //Fetch data from captcha to send to api
    fetch('/api/SendAPI', {
      method: 'POST',
      body: JSON.stringify({ message: message, selectIndex: selectIndex }),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      response.json().then(json => {
        // console.log('json:', json.body);
        if (json.body.captchaValidation) {
          alert(`Congratulations! You passed the test.`)
          setMusic(true)
        }
        if (!json.body.captchaValidation && json.body.selectIndex.length > 0) {
          alert(`Wrong captcha. Try again...bot!`)
          setMusic(false)
        }
        if (json.body.selectIndex.length === 0) {
          alert(`You need click and select a captcha image!`)
          setMusic(false)
        }
      })
      setMessage('')
      setCaptchaKey((new Date()).getTime().toString())
    })
  }

  return (
    <div className="App">
      <div>
        <form onSubmit={sendMessage}>
          <input type="text" placeholder="Send a Message"
            onChange={handleMessage} value={message}
          ></input>
        </form>
        <Captcha captchaKey={captchaKey} onChange={setSelectIndex} />
        <button onClick={sendMessage} style={{ marginRight: '20px' }}>Send</button>
        {music && <button onClick={queueMusic}>Queue the Music!</button>}
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
