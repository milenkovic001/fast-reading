import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Button } from '../UI/Button'

const MIN_MILISECONDS_PRE_LETTER = 10;
const MAX_MILISECONDS_PRE_LETTER = 1_000;

export const FastReadingMsPreLetter = ({ words, getRandomStory }) => {

    const [msPerWord, setMsPerWord] = useState(100)

    const [wordsPerMinut, setWordsPerMinut] = useState(1)
    const [totalDuration, setTotalDuration] = useState(1)

    const [disableSpeedUp, setDisableSpeedUp] = useState(false)
    const [disableSpeedDown, setDisableSpeedDown] = useState(false)


    const [startButtonText, setStartButtonText] = useState('Start')

    const wordRef = useRef(null)
    const markedTextRef = useRef(null)

    const start = useRef(false)
    const loopIsRunning = useRef(false)

    const tempMsSpeed = useRef(msPerWord)

    const currentIndex = useRef(0) // currnet word in array of words


    useEffect(() => {
        rest()
        setStats(msPerWord)
    }, [words])


    const hendleStartandPause = () => {
        if (loopIsRunning.current === true) {
            if (start.current === true) {
                start.current = false
                setStartButtonText('Start')
            }
        } else {
            start.current = !start.current
            setStartButtonText('Pause')
        }

        if (start.current == true && loopIsRunning.current == false) {
            readingLoop()
        }
    }

    const readingLoop = async () => {
        loopIsRunning.current = true;

        while (currentIndex.current < words.length && start.current) {
            const word = words[currentIndex.current]
            if (wordRef.current !== null) {
                wordRef.current.innerText = word
            }
            markText(currentIndex.current)
            await new Promise((resolve) => setTimeout(resolve, (word.length > 2 ? word.length : 3) * tempMsSpeed.current))
            currentIndex.current++
        }

        loopIsRunning.current = false;
    }
    const markText = (index) => {
        const first = words.slice(0, index).join(" ")
        const second = words[index]
        const third = words.slice(index + 1).join(" ")


        if (markedTextRef.current !== null) {
            markedTextRef.current.innerHTML = `
            ${first} 
                <span style="background-color: var(--color-highlight-text); color: var(--color-text); border-radius: 6px ">${second}</span>
            ${third}
            `;
        }
    }

    // Probably better to use a map and increment/decrement based on the map, to ensure balanced speed adjustments
    const handleSpeedUp = () => {
        // decrease 5% to current speed
        tempMsSpeed.current = Math.round(tempMsSpeed.current * 0.95 * 100) / 100
        setStats(tempMsSpeed.current)

        if (disableSpeedDown && tempMsSpeed.current < MIN_MILISECONDS_PRE_LETTER) {
            setDisableSpeedDown(false)
        }
        if (tempMsSpeed.current < MIN_MILISECONDS_PRE_LETTER) {
            setDisableSpeedUp(true)
        }
    }

    const handleSpeedDown = () => {
        // increase 5% to current speed
        tempMsSpeed.current = Math.round(tempMsSpeed.current * 1.05 * 100) / 100
        setStats(tempMsSpeed.current)

        console.log()
        if (disableSpeedUp && tempMsSpeed.current > MAX_MILISECONDS_PRE_LETTER) {
            setDisableSpeedUp(false)
        }
        if (tempMsSpeed.current > MAX_MILISECONDS_PRE_LETTER) {
            setDisableSpeedDown(true)
        }
    }

    const setStats = (msSpeed) => {
        setMsPerWord(msSpeed)

        let totalCharacterLength = 0
        for (const word of words) {
            // duretion of word depends of its lenght. word.lengt * ms (mili seconds). but min 'length' is set to 3. becose a word with one or two leater apere so shortly. 
            totalCharacterLength += word.length > 2 ? word.length : 3
        }
        let averageLength = totalCharacterLength / words.length

        setWordsPerMinut(60_000 / (averageLength * msSpeed)) // 1000 milisecond * 60 second
        setTotalDuration(totalCharacterLength * msSpeed / 1_000)
    }

    const rest = () => {
        start.current = false
        setStartButtonText('Start')
        currentIndex.current = 0
        markText(0)
        wordRef.current.innerText = words[0]
    }


    return (
        <>
            <div className='h-full p-4 w-1/2 bg-background'>
                <div className='flex justify-center text-center text-5xl p-10  border-b-[1px]' ref={wordRef}></div>
                <br />
                <div className='flex justify-between'>
                    <div >
                        <div>
                            <div>MiliSecond per letter: {msPerWord.toFixed(2)}</div>
                            <div>Words per minute: {wordsPerMinut.toFixed(2)}</div>
                            <div>Words per second: {((wordsPerMinut) / 60).toFixed(2)}</div>
                            <div>The number of words in text: {words.length}</div>
                            <div>Time needed to read: {(Math.floor(totalDuration / 60)).toString().padStart(2, "0")}:{(Math.floor(totalDuration % 60)).toString().padStart(2, "0")}</div>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div className='mt-1 mb-1'>
                            <Button text={"Level 1"} />
                        </div>
                        <div className='mt-1 mb-1'>
                            <Button text={"Level 2"} />
                        </div>
                    </div>
                </div>
                <br />
                <div className='flex justify-between'>
                    <div >
                        <div className='flex'>
                            <div className='mr-2'>
                                <Button
                                    text={startButtonText}
                                    onClick={hendleStartandPause} />
                            </div>
                            <Button text={"Reset"} onClick={rest} />
                        </div>
                        <div className='mt-2'>
                            <Button text={"Random story"} onClick={getRandomStory} />
                        </div>
                    </div>
                    <div >
                        <div className='flex mb-2 justify-end'>
                            <Button text={"speed up"} onClick={handleSpeedUp} isDisabled={disableSpeedUp} />
                        </div>
                        <div>
                            <Button text={"speed down"} onClick={handleSpeedDown} isDisabled={disableSpeedDown} />
                        </div>
                    </div>
                </div>
                <br />
                <div className='w-full'
                    ref={markedTextRef}
                >
                </div>
            </div>
        </>
    )
}
