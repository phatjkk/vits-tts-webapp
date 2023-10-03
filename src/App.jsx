import "./App.css";
import tts_img from "./assets/text-to-speech.png";
import React,{useState} from "react";
function App() {
  const [speedValue, setSpeedValue] = useState(0);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("null");
  React.useEffect(() => {
    if (isLoading) {

          setResult("ok");
          setIsLoading(false);
    }
  }, [isLoading]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeedValue(event.target.value);
  };

  const handleClick = () => {
    console.log(text);
    setIsLoading(true)
  };
  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        {/* <figure className="px-3 pt-3">
          <img src={tts_img} alt="TTS_Image" className="rounded-xl" />
        </figure> */}
        <div className="card-body items-center text-center">
          <h1 className="text-lg font-medium">Text To Speech in Vietnamese</h1>
          <p className="text-sm">
            Công cụ chuyển đổi văn bản thành giọng nói Tiếng Việt trên model
            VITS
          </p>
          <textarea
            id="textarea"
            value={text}
            className=" pt-3 textarea textarea-bordered textarea-md w-screen max-w-xs textarea-info"
            placeholder="Nhập văn bản..."
            onChange={handleTextChange}
          ></textarea>
          <p className="text-sm font-medium">Tốc độ</p>
          <input
            type="range"
            min={0}
            max="100"
            value={speedValue}
            onChange={handleSpeedChange}
            className="range range-sm range-info"
            step="25"
          />
          <div className="w-full flex justify-between text-xs px-2 pb-3">
            <span className="font-medium">Chậm</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span className="font-medium">Nhanh</span>
          </div>
          <div className="card-actions">
            <button
              disabled={isLoading}
              onClick={handleClick}
              className="btn btn-md btn-info"
            >
             {isLoading ? <span class="loading loading-dots loading-sm"></span>:"Chuyển đổi"} 
            </button>
            {result && <div>{result}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
