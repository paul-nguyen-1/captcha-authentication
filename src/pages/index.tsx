import { useState, useEffect } from "react";
import Captcha from "@/components/Captcha";
import { withIronSessionSsr } from 'iron-session/next';
import MySession, { newCaptchaImages } from './api/ImageAPI';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from "@/components/Navbar";

interface MySession {
  captchaImages?: string[];
}


export default function Home({ defaultCaptchaKey }: { defaultCaptchaKey: string }) {
  const [selectIndex, setSelectIndex] = useState<number[]>([])
  const [captchaKey, setCaptchaKey] = useState<string>(defaultCaptchaKey)
  const [music, setMusic] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleLogin = () => {
    if (!isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

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
    // e.preventDefault()
    // if (!message) {
    //   alert(`Send a message...unless you're a bot!`)
    //   setMusic(false)
    //   return;
    // }
    //Fetch data from captcha to send to api
    fetch('/api/SendAPI', {
      method: 'POST',
      body: JSON.stringify({ message: message, selectIndex: selectIndex }),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      response.json().then(json => {
        // console.log('json:', json.body);
        if (json.body.captchaValidation) {
          alert(`Welcome. Queue the music!`)
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
      <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      {isLoggedIn ? <div>
        {/* <form onSubmit={sendMessage}>
          <input type="text" placeholder="Send a Message"
            onChange={handleMessage} value={message}
          ></input>
        </form> */}
        <Captcha captchaKey={captchaKey} onChange={setSelectIndex} />
        <button onClick={sendMessage} style={{ marginRight: '20px' }}>Verify</button>
        {music && <button onClick={queueMusic}>Click Me</button>}
      </div> : <div className="noteCard">
        <div className="cardHeader">
          <h1>Login to use this Application!</h1>
        </div>
        <div className="cardBody">
          <h2>Default Crediantials:</h2>
          <h3>Username: example@example.com </h3>
          <h3>Password: Password123! </h3>
        </div>
      </div>}
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
