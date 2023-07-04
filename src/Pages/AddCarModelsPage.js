import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { ModelCompConstExp } from '../Components/Navbar/addnewcarmodel'
import './AddCarModelPage.css';

export const AddNewCarModelPageConsExp= () => {

    document.title = "Dodawanie pojazdu"

    const [vehicle, setVehicle] = useState()
    const [alloysETS, setAlloysETS] = useState()
    const [alloysBPS, setAlloysBPS] = useState()
    const [alloysCBS, setAlloysCBS] = useState()
    const [combData, setCombData] = useState([])

    const retrieveBPS = () => {
        fetch('/get-alloysbps').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setAlloysBPS(data))
    }

    const retrieveCBS = () => {
        fetch('/get-alloyscbs').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setAlloysCBS(data))
    }

    const retrieveETS = () => {
        fetch('/get-alloysets').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setAlloysETS(data))
    }

    useEffect(() => {
        const fetchData = async () => { Promise.all([
            await fetch('/add-car-model-12436732342345228724584652'), await fetch('get-alloysets'), await fetch('get-alloyscbs'), await fetch('get-alloysbps')]).then(([resManufacturers, resETS, resCBS, resBPS]) => Promise.all([resManufacturers.json(), resETS.json(), resCBS.json(), resBPS.json()])).then(([dataManufacturers, dataETS, dataCBS, dataBPS]) => {
                setVehicle(dataManufacturers);
                setAlloysETS(dataETS);
                setAlloysCBS(dataCBS);
                setAlloysBPS(dataBPS)
            });
        }
        fetchData().catch(console.error);
    }, [])

    const handleFormSubmit = (inputManufacturer, inputModel, inputEngine, inputETS, inputCBS, inputBPS) => {
        fetch('/add-car-model-12436732342345228724584652', {
            method: 'POST',
            body: JSON.stringify({
                carManufacturer: inputManufacturer,
                carModel: inputModel,
                carEngine: inputEngine,
                carETS: inputETS,
                carCBS: inputCBS,
                carBPS: inputBPS
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(message => {
            console.log(message);
        })
    }

    return (
        <>  
            <div class='MainDiv6'>
                <label for="AddModelLabel">Dodaj model</label>
            </div>
            <ModelCompConstExp listOfVehicles={vehicle}
            listOfAlloysBPS={alloysBPS}
            listOfAlloysCBS={alloysCBS}
            listOfAlloysETS={alloysETS}
            onFormSubmit={handleFormSubmit}/>
        </>
    )

}