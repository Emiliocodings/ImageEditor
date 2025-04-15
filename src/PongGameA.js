import React, { useRef, useEffect, useState } from 'react';

const PongGameA = () => {
    const canvasRef = useRef(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [cpuScore, setCpuScore] = useState(0);
    const paddleWidth = 20;
    const paddleHeight = 150;
    let playerPaddleY = (400 - paddleHeight) / 2; // Player paddle is now CPU controlled
    let cpuPaddleY = (400 - paddleHeight) / 2; // CPU paddle
    let ballX = 400 / 2;
    let ballY = 400 / 2;
    const ballRadius = 15;
    let ballSpeedX = 10;
    let ballSpeedY = 10;

    const draw = (ctx) => {
        ctx.clearRect(0, 0, 800, 400);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);
        ctx.fillRect(800 - paddleWidth, cpuPaddleY, paddleWidth, paddleHeight);
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
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

        // CPU paddle AI for both paddles
        const paddleSpeed = 20; // Increased paddle speed

        // Control player paddle (left paddle)
        if (ballY < playerPaddleY) {
            playerPaddleY -= paddleSpeed; // Move up
        } else if (ballY > playerPaddleY + paddleHeight) {
            playerPaddleY += paddleSpeed; // Move down
        }

        // Control CPU paddle (right paddle)
        if (cpuPaddleY + paddleHeight / 2 < ballY) {
            cpuPaddleY += paddleSpeed; // Move down
        } else {
            cpuPaddleY -= paddleSpeed; // Move up
        }

        // Keep paddles within bounds
        playerPaddleY = Math.max(Math.min(playerPaddleY, 400 - paddleHeight), 0);
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
    }, []);

    return (
        <div className="encabezado1">
            <canvas ref={canvasRef} width={800} height={400} style={{ border: '1px solid white' }} />
        </div>
    );
};

export default PongGameA;