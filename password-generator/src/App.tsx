import { useState } from "react";
import { Copy } from "lucide-react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*_";

    let allCharacters = characters;
    if (numbersAllowed) allCharacters += numbers;
    if (charactersAllowed) allCharacters += specialCharacters;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      generatedPassword += allCharacters[randomIndex];
    }
    setPassword(generatedPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-white text-3xl font-semibold mb-6 text-center">
          Password Generator
        </h1>

        <div className="mb-4">
          <label className="block text-white mb-1">Generated Password</label>
          <div className="flex items-center">
            <input
              className="w-full px-3 py-2 rounded"
              type="text"
              readOnly
              value={password}
            />
            <button
              className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              onClick={() => navigator.clipboard.writeText(password)}
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center text-white mb-3">
            <input
              type="checkbox"
              checked={numbersAllowed}
              onChange={(e) => setNumbersAllowed(e.target.checked)}
              className="form-checkbox text-blue-500 mr-2"
            />
            Include Numbers
          </label>

          <label className="flex items-center text-white mb-3">
            <input
              type="checkbox"
              checked={charactersAllowed}
              onChange={(e) => setCharactersAllowed(e.target.checked)}
              className="form-checkbox text-blue-500 mr-2"
            />
            Include Special Characters
          </label>

          <label className="flex items-center text-white">
            Length
            <input
              type="range"
              min="8"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="ml-3 flex-grow"
            />
            <span className="text-white ml-2">{length}</span>
          </label>
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
