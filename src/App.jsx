import "./App.css";
import React, { useState ,useRef} from "react";
const SPEED_VALUES = {
  0: "very_slow",
  25: "slow",
  50: "normal",
  75: "fast",
  100: "very_fast",
};
function App() {
  const audioRef = useRef()
  const [speedValue, setSpeedValue] = useState(50);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  React.useEffect(() => {
    if (isLoading) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(
        "http://" +
          window.location.host +
          "/tts?text=" +
          text +
          "&speed=" +
          SPEED_VALUES[speedValue],
        requestOptions
      )
        .then((response) => response.json())
        .then((jsonResult) => {
          setResult(jsonResult);
          updateSong()
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const updateSong = () => {
    // setSource(source);
    if(audioRef.current){
        audioRef.current.pause();
        audioRef.current.load();
    }
}

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeedValue(event.target.value);
  };

  const handleClick = () => {
    if (text !==""){
      setIsLoading(true);
    }
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
            <span className="font-medium">Vừa</span>
            <span>|</span>
            <span className="font-medium">Nhanh</span>
          </div>
          <div className="card-actions">
            <button
              disabled={isLoading}
              onClick={handleClick}
              className="btn btn-md btn-info"
            >
              {isLoading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Chuyển đổi"
              )}
            </button>
          </div>
          {result && (
            <div className="mt-10 mb-4">
              <span className="font-medium mt-3">Kết quả</span>
              <audio controls ref={audioRef} >
                <source src={result.audio_url} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <a className="link" target="_blank" href={result.audio_url}>Download</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
