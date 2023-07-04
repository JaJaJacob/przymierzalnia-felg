import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { VehicleCompConstExp } from '../Components/Navbar/vehicle';
import { FilteredAlloyCompConstExp } from '../Components/Navbar/filteredAlloy';
import './FittingRoomPage.css';

let ifo = 0;
let isSubmitted = 0;

export const FittingRoomPageConstExp = () => {

    document.title = "Przymierzalnia felg"

    const [vehicle, setVehicle] = useState()

    const [alloy, setAlloy] = useState()

    const test = () => {
        fetch('/result-questions').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setAlloy(data))
    }

    useEffect(() => {
        fetch('/get-cars-and-metrics').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setVehicle(data))
    }, [])

    const handleFormSubmit = (inputModel, inputEngine, inputDZ, inputPLP, inputPLT) => {
            fetch('/send-questions', {
                method: 'POST',
                body: JSON.stringify({
                    carModel: inputModel,
                    carEngine: inputEngine,
                    carDZ: inputDZ,
                    carPLP: inputPLP,
                    carPLT: inputPLT
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json()).then(message => {
                console.log(message);
            })
            test()
            test()
    }
        return (
            <>      
                <VehicleCompConstExp listOfVehicles={vehicle} onFormSubmit={handleFormSubmit}/>
                <div className="ContentDiv">
                    <FilteredAlloyCompConstExp listOfAlloys={alloy}/>
                </div>
            </>
        )   
}