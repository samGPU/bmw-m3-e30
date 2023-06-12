import { useFrame, useLoader } from '@react-three/fiber'
import { Center, Environment, Html, OrbitControls, Stage } from '@react-three/drei'
import { useState, useRef } from 'react';

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Experience(props)
{
    const model = useLoader(GLTFLoader, '/bmw.glb');

    let modelRef = useRef();
    let colorRef = useRef();

    let [count, setCount] = useState(0);
    let [color, setColor] = useState('#E98074');

    const environments = [
        { name: 'europe', path: 'belfast_sunset_puresky_1k.hdr' },
        { name: 'showroom', path: 'empty_warehouse_01_1k.hdr' },
        { name: 'dawn', path: 'kiara_1_dawn_1k.hdr' },
        { name: 'studio', path: 'lebombo_1k.hdr' },
        { name: 'blackout', path: 'moonless_golf_1k.hdr' },
        { name: 'glacier', path: 'snowy_park_01_1k.hdr' }, 
        { name: 'dusk', path: 'the_sky_is_on_fire_1k.hdr' }, 
        { name: 'platza', path: 'urban_alley_01_1k.hdr' }, 
        { name: 'sunset', path: 'venice_sunset_1k.hdr' }
    ]

    useFrame(() =>
    {
        if (count < environments.length - 1 && !props.loaded) {
            setCount(count + 1)
            props.setProgress(count / environments.length);
        } else {
            props.setLoaded(true);
        }
    })
    
    return <>
        <OrbitControls 
            minDistance={ 3 }
            maxPolarAngle={ Math.PI / 2 }
            enableDamping={ true }
        />
        <Stage
            shadows={ { type: 'contact', opacity: 0.8, blur: 3 } }
            preset={ 'rembrandt' }
            adjustCamera={ false }
        >
            <Environment files={ environments[count].path } path='env/' />
            <Center>
                <primitive object={model.scene} ref={ modelRef } />

                <Html
                    position={ [ -0.5, 2, -0.25 ] }
                >
                    <button 
                        onClick={() => {setCount(count >= environments.length - 1 ? 0 : count + 1)}}
                        className='styleButton'
                    >
                        Lights
                    </button>
                </Html>

                <Html
                    position={ [ 0.25, 2, -0.25 ] }
                >
                    <input 
                        ref={ colorRef }
                        type="color" id="color" name="color" className="colorPicker"
                        value={color} 
                        onInput={ (event) => { 
                            modelRef.current.children[0].children[0].children[0].children[0].children[4].material.color = new THREE.Color(event.target.value);
                            setColor(event.target.value);
                        } }
                    />
                </Html>
            </Center>
        </Stage>
    </>
}