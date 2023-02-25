import Captcha from "@/components/Captcha";

export default function Home() {
  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Send a Message"></input>
        <Captcha />
        <button>Send</button>
      </div>
    </div>
  )
}
