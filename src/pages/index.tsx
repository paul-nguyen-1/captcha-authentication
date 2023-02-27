import { useEffect, useState } from "react";
import Captcha from "@/components/Captcha";

export default function Home() {
  //Handle all messages within input
  const [message, setMessage] = useState<string>('')
  const [selectIndex, setSelectIndex] = useState<number[]>([])
  const handleMessage = (e: any) => {
    setMessage(e.target.value)
  }
  //Make sure all char in message is being sent
  useEffect(() => {
    console.log(message)
  }, [message])

  //Send message to API
  const sendMessage = () => {
    if (!message) {
      alert(`Send a message...unless you're a bot!`)
      return;
    }
    //Fetch data from captcha to send to api
    fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify({ string: message, selectedIndexes: selectIndex })
    })
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Send a Message"
          onChange={handleMessage}
        ></input>
        <Captcha onChange={setSelectIndex} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
