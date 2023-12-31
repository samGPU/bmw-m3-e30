import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import Experience from './Experience'

export default function UI() {

    let [loaded, setLoaded] = useState(false);
    let [progress, setProgress] = useState(0);
    let [uiActive, toggleUi] = useState(true);

    return <>
        <div className="ui">
            <h1>BMW M3 E30</h1>
        </div>

        <button 
                className="toggleButton"
                onClick={() => {toggleUi(!uiActive)}}
            >
                Toggle Ui
            </button>
       
        <div className="loadingMessage">
            <h5>{progress >= 0.81 ? '' : Math.round(progress * 100) + '%'}</h5>
        </div>
        <Canvas shadows className={loaded ? "experienceLoaded" : "experienceLoading"}>
            <Experience 
                loaded={loaded} setLoaded={setLoaded} 
                progress={progress} setProgress={setProgress} 
                uiActive={uiActive}
            />
        </Canvas>
    </>
}