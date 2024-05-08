import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passowrdGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

   // use ref hook
   const passwordRef = useRef(null)
  const copyPasswordToCLipboard = useCallback(()=>{
    passwordRef?.current.select();
    passwordRef?.current.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passowrdGenerator();
  } , [length,numberAllowed,charAllowed,passowrdGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-orange-500 bg-gray-700'>
      <h1 className="text-center text-4xl text-white">Password Generator</h1>
        <div className='flex shadow-lg rounded-lg overflow-hidden mt-8 mb-3'>
          <input type="text" value={password} className='outline-none w-full py-3 px-3' placeholder='password' readOnly/>
          <button onClick={copyPasswordToCLipboard} className='outline-none bg-blue-900 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input onChange={(e) => {setLength(e.target.value)}} type="range" min={6} max={100} value={length} className='cursor-pointer' />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={() => {setNumberAllowed((prev)  => !prev)}} />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={charAllowed} id='charInput' onChange={() => {setcharAllowed((prev)  => !prev)}} />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
