import React, { useRef, useEffect, useState } from 'react';
import './App.css';

const PongGame = () => {
    const canvasRef = useRef(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [cpuScore, setCpuScore] = useState(0);
    const paddleWidth = 20;
    const paddleHeight = 500;
    let playerPaddleY = (400 - paddleHeight) / 2; // Player paddle is now CPU controlled
    let cpuPaddleY = (400 - paddleHeight) / 2; // CPU paddle
    let ballX = 400 / 2;
    let ballY = 400 / 2;
    const ballRadius = 15;
    let ballSpeedX = 20;
    let ballSpeedY = 20;

    const draw = (ctx) => {
        ctx.clearRect(0, 0, 800, 500);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);
        ctx.fillRect(800 - paddleWidth, cpuPaddleY, paddleWidth, paddleHeight);
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        //ctx.fillText(`Player: ${playerScore} | CPU: ${cpuScore}`, 300, 30);
    };

    const update = (ctx) => {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Ball collision with top and bottom
        if (ballY + ballRadius > 400 || ballY - ballRadius < 0) {
            ballSpeedY = -ballSpeedY;
        }

        // Ball collision with paddles
        if (ballX - ballRadius < paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            addRandomness();
        }
        if (ballX + ballRadius > 800 - paddleWidth && ballY > cpuPaddleY && ballY < cpuPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            addRandomness();
        }

        // Ball out of bounds
        if (ballX - ballRadius < 0) {
            setCpuScore(cpuScore + 1);
            resetBall();
        }
        if (ballX + ballRadius > 800) {
            setPlayerScore(playerScore + 1);
            resetBall();
        }

        // CPU paddle AI
        if (cpuPaddleY + paddleHeight / 2 < ballY) {
            cpuPaddleY += 4;
        } else {
            cpuPaddleY -= 4;
        }

        // Keep CPU paddle within bounds
        cpuPaddleY = Math.max(Math.min(cpuPaddleY, 400 - paddleHeight), 0);
    };

    const addRandomness = () => {
        const randomAngle = (Math.random() - 0.5) * 2; // Random angle between -1 and 1
        ballSpeedY += randomAngle;
        if (Math.abs(ballSpeedY) < 2) {
            ballSpeedY = ballSpeedY > 0 ? 2 : -2; // Set a minimum speed
        }
    };

    const resetBall = () => {
        ballX = 400 / 2;
        ballY = 400 / 2;
        ballSpeedX = -ballSpeedX; // Change direction
        ballSpeedY = (Math.random() < 0.5 ? 1 : -1) * 5; // Randomize vertical speed on reset
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        draw(ctx);
        update(ctx);
        requestAnimationFrame(gameLoop);
    };

    useEffect(() => {
        gameLoop();
        const handleMouseMove = (event) => {
            const mouseY = event.clientY - canvasRef.current.getBoundingClientRect().top;
            playerPaddleY = mouseY - paddleHeight / 2;
            playerPaddleY = Math.max(Math.min(playerPaddleY, 400 - paddleHeight), 0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="encabezado1">
            <canvas ref={canvasRef} width={800} height={410} style={{ border: '1px solid white' }} />
        </div>
    );
};

export default PongGame;