import React, { useState, useEffect } from 'react';

function ReactionTest() {
    const [gameState, setGameState] = useState('initial');
    const [message, setMessage] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        if (gameState === 'red') {
            const randomDelay = Math.floor(Math.random() * 5000) + 1000; // 1 to 6 seconds

            const timeout = setTimeout(() => {
                setGameState('green');
                setStartTime(Date.now());
            }, randomDelay);

            setTimeoutId(timeout);

            return () => clearTimeout(timeout);
        }
    }, [gameState]);

    const startGame = () => {
        setMessage('');
        setGameState('red');
    };

    const handleBoxClick = () => {
        if (gameState === 'red') {
            setGameState('tooEarly');
            setMessage('You clicked too early!');
        } else if (gameState === 'green') {
            const reactionTime = Date.now() - startTime;
            setGameState('success');
            setMessage(`You took ${reactionTime}ms!`);
        }
        clearTimeout(timeoutId); // Tıklama sonrası zamanlayıcıyı temizle
    };

    const resetGame = () => {
        setGameState('initial');
        setMessage('');
        setStartTime(null);
        clearTimeout(timeoutId);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {gameState === 'initial' && (
                <button onClick={startGame}>Start Game</button>
            )}

            {gameState === 'red' && (
                <div
                    onClick={handleBoxClick}
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '20px',
                        backgroundColor: 'red',
                        margin: '20px auto',
                        cursor: 'pointer',
                    }}
                ></div>
            )}

            {gameState === 'green' && (
                <div
                    onClick={handleBoxClick}
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '20px',
                        backgroundColor: 'green',
                        margin: '20px auto',
                        cursor: 'pointer',
                    }}
                ></div>
            )}

            {(gameState === 'tooEarly' || gameState === 'success') && (
                <div>
                    <p>{message}</p>
                    <button onClick={resetGame}>Restart</button>
                </div>
            )}
        </div>
    );
}

export default ReactionTest;
