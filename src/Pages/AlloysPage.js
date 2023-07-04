import React, {useState, useEffect} from 'react'
import { AlloyCompConstExp } from '../Components/Navbar/alloy'
import './AlloysPage.css';

export const AlloysPageConstExp = () => {

    document.title = "Katalog felg"

    const [alloy, setAlloy] = useState()

    useEffect(() => {
        fetch('/katalog-felg').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setAlloy(data))
    }, [])

    return (
        <>
            <div className='MainDiv2'>   
                <label for="AlloysPageLabel">Wszystkie felgi</label>
            </div>
            <div className="ContentDiv">
                <AlloyCompConstExp listOfAlloys={alloy}/>
            </div>
        </>
    )  
}