import React, { useState } from "react";
import axios from "axios";

const Input = ({ value, onChange }) => (
  <input
    className="w-full text-lg p-2 rounded border border-gray-400 focus:outline-none focus:ring focus:border-blue-500"
    type="text"
    value={value}
    onChange={onChange}
    placeholder="ここに文章を入力してください"
  />
);

const Button = ({ onClick }) => (
  <button
    className="block w-full text-lg py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
    onClick={onClick}
  >
    生成する
  </button>
);

const Output = ({ text }) => (
  <div className="w-full text-lg p-2 border border-gray-400 rounded mt-4">
    {text}
  </div>
);

const App = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleClick = async () => {
    const response = await axios.post("/api/generate", {
      text: inputText,
    });
    setOutputText(response.data.text);
  };

  return (
    <div className="max-w-lg mx-auto">
      <Input value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <Button onClick={handleClick} />
      {outputText && <Output text={outputText} />}
    </div>
  );
};

export default App;
