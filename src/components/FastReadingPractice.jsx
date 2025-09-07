
import { useEffect, useRef, useState } from 'react'
import { Button } from '../UI/Button';

export const FastReadingPractice = ({words ,getRandomStory}) => {

    const [start, setStart] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [intervalSpeed, setIntervalSpeed] = useState(500)
    const [disableSpeedUp, setDisableSpeedUp] = useState(false)
    const [disableSpeedDown, setDisableSpeedDown] = useState(false)
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [third, setThird] = useState('')

    const intervalRef = useRef(null)

    const startInterval = (speed) => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex(pre => {
                if (pre === words.length) {
                    rest();
                    return 0
                }
                else {
                    markText(pre + 1)
                    return pre + 1
                }
            })
        }, speed);
    }

    useEffect(() => {
        rest()
    }, [words])

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])

    const hendleStartandPause = () => {
        if (!start) {
            startInterval(intervalSpeed)
        }
        else {
            clearInterval(intervalRef.current)
        }
        setStart(!start)
    }

    const handleSpeedUp = () => {
        let wordsPerMinute = 60000 / intervalSpeed;
        wordsPerMinute += 20;
        if (wordsPerMinute > 1200) return

        const newIntervalSpeed = 60000 / wordsPerMinute;
        setIntervalSpeed(newIntervalSpeed)
        if (start) {
            clearInterval(intervalRef.current)
            startInterval(newIntervalSpeed)
        }
        if (wordsPerMinute >= 1200) setDisableSpeedUp(true);
        if (disableSpeedDown && wordsPerMinute >= 30) setDisableSpeedDown(false)
    }

    const handleSpeedDown = () => {
        let wordsPerMinute = 60000 / intervalSpeed;
        if (wordsPerMinute < 30) return
        wordsPerMinute -= 20;
        const newIntervalSpeed = 60000 / wordsPerMinute;
        setIntervalSpeed(newIntervalSpeed)
        if (start) {
            clearInterval(intervalRef.current)
            startInterval(newIntervalSpeed)
        }
        if (wordsPerMinute <= 30) setDisableSpeedDown(true);
        if (disableSpeedUp && wordsPerMinute <= 1200) setDisableSpeedUp(false)
    }

    const rest = () => {
        setStart(false)
        setCurrentIndex(0)
        markText(0)
        clearInterval(intervalRef.current)
    }

    const markText = (index) => {
        let tempFirst = words.slice(0, index)
        setFirst(tempFirst.join(" "))
        let tempSecond = words[index]
        setSecond(tempSecond)
        let tempThird = words.slice(index + 1)
        setThird(tempThird.join(" "))
    }

    return (
        <div className='h-full p-4 w-1/2'>
                    <div className='flex justify-center text-center text-5xl p-10  border-b-[1px] '> {words[currentIndex]} </div>
                    <br />
                    <div className='flex justify-between'>
                        <div >
                            <div>
                                <div>Words per minute: {(60000 / intervalSpeed).toFixed(2)}</div>
                                <div>Words pre second: {(1000 / intervalSpeed).toFixed(2)}</div>
                                <div>The number of words in text: {words.length}</div>
                                <div>Time needed to read: {(words.length / (1000 / intervalSpeed)).toFixed(2)} seconds</div>
                                <br />
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
                                    <Button text={start ? 'Pause' : 'Start'} onClick={hendleStartandPause} />
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
                    > {first} {" "}
                        <span className='highlight-bg rounded-md' >{second}</span>
                        {" "}
                        {third}
                    </div>
        </div>
    )
}
