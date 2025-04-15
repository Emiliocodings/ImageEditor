import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import PongGame from './PongGame';
import PongGameA from './PongGameA';
import About from './About';
import './App.css';

var nombre = "Emilio";

var saludo = (
    <p>
        Primer proyecto con React, mi nombre es {nombre}<br />
    </p>
);

function App() {
    // ESTADOS DE REACT HOOKS
    const [linea1, setLinea1] = useState('');
    const [linea2, setLinea2] = useState('');
    const [imagen, setImagen] = useState('');

    const CambioEnLinea1 = (valor) => {
        setLinea1(valor.target.value);
    };

    const CambioEnLinea2 = (valor) => {
        setLinea2(valor.target.value);
    };

    const CambioEnImagen = (valor) => {
        setImagen(valor.target.value);
    };

    const ExportarImagen = () => {
        html2canvas(document.querySelector("#seccionaexportar")).then(canvas => {
            var img = canvas.toDataURL("image/png");
            var link = document.createElement('a');
            link.download = 'Modelo.png';
            link.href = img;
            link.click();
        });
    };

    return (
        <Router>
            <div className="App">
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/pongGame">Pong Game</Link>
                        </li>
                        <li>
                            <Link to="/pongA">Pong A</Link>
                        </li>
                    </ul>
                </nav>
                
                <Routes>
                    <Route path="/" element={
                        <div>
                            <div className="encabezado1 scrollm">
                                <select onChange={CambioEnImagen} className="scrollm" multiple="multiple">
                                    <option value="a320">Modelo 1</option>
                                    <option value="a330">Modelo 2</option>
                                    <option value="b787">Modelo 3</option>
                                    <option value="crj400">Modelo 4</option>
                                    <option value="a380">Modelo 5</option>
                                </select>
                            </div>

                            {/* Input text - primer linea */}
                            <input onChange={CambioEnLinea1} type="text" placeholder="Linea1"/> <br/>
                            <input onChange={CambioEnLinea2} type="text" placeholder="Linea2"/> <br/>
                            <button onClick={ExportarImagen}>Exportar</button>
                            
                            {/* Input text - segunda linea */}
                            <div className="encabezado" id="seccionaexportar">
                                <span>{linea1}</span> <br/>
                                <span>{linea2}</span>
                                <img src={"/img/" + imagen + ".png"} alt="Modelo" />
                            </div>
                        </div>
                    } />
                    <Route path="/about" element={<About />} />
                    <Route path="/pongGame" element={<PongGame />} />
                    <Route path="/pongA" element={<PongGameA />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;