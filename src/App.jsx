import { useEffect, useState } from 'react';
import { FastReadingPractice } from './components/FastReadingPractice';
import { FastReadingMsPreLetter } from './components/FastReadingMsPreLetter';
import { ThemeProvider } from './contexts/ThemeProvider';
import Navbar from './components/Navbar';
import { Button } from './UI/Button';
import { STORIES } from './data/stories';

function App() {
  const [activeTimeOption, setActiveTimeOption] = useState('timePerWord');
    const [inputText, setInputText] = useState('');
    const [words, setWords] = useState([])

    useEffect(()=>{
      getRandomStory()
    },[])

    const getRandomStory = () => {
        const randomNumber = Math.floor(Math.random() * STORIES.length)
        setWords(STORIES[randomNumber].replace(/[\n\t\s]+/g, ' ').split(" "))
    }
    
    const handleSave = () => {
        setWords(inputText.replace(/[\n\t\s]+/g, ' ').split(" "))
    }

  return (
    <>

      <ThemeProvider>
        <div className='bg-background text-text'>

        <Navbar activeTimeOption={activeTimeOption} setActiveTimeOption={setActiveTimeOption} />
        <div className='min-h-[calc(100vh-4rem)] p-4 w-screen flex  justify-between '>

            <div className='w-1/2 mt-[125px] pl-4 pr-14 '>
              <label className="block text-sm font-medium mb-2  w-full ">
                Text:
                <textarea
                  className="mt-1 block w-full border-1 border-border rounded px-3 py-2 resize-none"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  rows={24}
                  placeholder="Enter your text here"
                  />
              </label>
              <div>
                <Button text={"Save"} onClick={handleSave} />
              </div>
            </div>
            
            {activeTimeOption === 'timePerWord' ? (
              <FastReadingPractice words={words} getRandomStory={getRandomStory}/>
            ) : (
              <FastReadingMsPreLetter words={words} getRandomStory={getRandomStory}/>
            )}
          </div>
            </div>
      </ThemeProvider>
    </>
  );
}

export default App;