import React, { useContext, useRef } from 'react';
import './Main.css';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const sendIconRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && input) {
                event.preventDefault();
                sendIconRef.current.click();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        // Cleanup the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [input]);
    return (
        <div className='main'>
            <div className="nav">
                <p>
                    Gemini
                </p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult ?
                    <>
                        <div className="greet">
                            <p>
                                <span>こんにちは, Abhishek</span>
                            </p>
                            <p>How can i help you today ?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>
                                    Suggest some beautiful places to play football today
                                </p>
                                <img src={assets.compass_icon} alt="compass icon" />
                            </div>
                            <div className="card">
                                <p>
                                    Briefly summarize this concept : OOPS
                                </p>
                                <img src={assets.bulb_icon} alt="compass icon" />
                            </div>
                            <div className="card">
                                <p>
                                    Brainstorm team bonding activities for our work retreat
                                </p>
                                <img src={assets.message_icon} alt="compass icon" />
                            </div>
                            <div className="card">
                                <p>
                                    Improve the readability of the following code
                                </p>
                                <img src={assets.code_icon} alt="compass icon" />
                            </div>
                        </div>

                    </> : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>
                                {recentPrompt}
                            </p>
                        </div>
                        <div className='result-data'>
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />

                                </div> : <p dangerouslySetInnerHTML={{ __html: resultData }}>
                                </p>
                            }

                        </div>
                    </div>}

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder='Enter what you want to search' onChange={(e) => setInput(e.target.value)} value={input} />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input?<img src={assets.send_icon} alt="" onClick={() => onSent()} id='sendIcon'  ref={sendIconRef}/>:null}
                        </div>

                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info , including about people , topics so double check its responses.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
