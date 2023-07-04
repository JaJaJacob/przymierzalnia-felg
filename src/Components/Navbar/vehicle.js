import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"
import './Vehicle.css';

export const VehicleCompConstExp = ({listOfVehicles, onFormSubmit}) => {

    const navigate = useNavigate();
    const defaultValues = {
        dz: 0,
        plp: 0,
        plt: 0,
      };

    const [values, setValues] = useState(defaultValues);

    const [values2, setValues2] = useState();

    const [values3, setValues3] = useState();

    const [values4, setValues4] = useState();

    const handleChoose = (event) => {
        
        setValues2(event.target.value)      
    }

    const handleChoose2 = (event) => {
        
        setValues3(event.target.value)      
    }

    const handleChoose3 = (event) => {
        
        setValues4(event.target.value)      
    }

    const manufacturers = []
    const models = []
    const engines = []

    console.log(listOfVehicles?.[0])

    for (let i = 0; i < listOfVehicles?.length; i++)
    {
        manufacturers.push(listOfVehicles?.[i].manufacturer)
        models.push(listOfVehicles?.[i].model)
        engines.push(listOfVehicles?.[i].engine)
    }

    const uniqmanufacturers = [...new Set(manufacturers)];

    let type = null;

    let type2 = null;

    let modeloptions = null;

    let engineoptions = null;

    let modelseginesArray = [{}]
    let modelsArray = []
    let enginesArray = []

    for (let i = 0; i < listOfVehicles?.length; i++)
    {
  
        console.log("value 2 " + values2)

        if (values2 === listOfVehicles?.[i].manufacturer)
        {   
            modelsArray.push(listOfVehicles?.[i].model)
            type = modelsArray
            console.log("value 3 " + values3)  

            if (values3 === listOfVehicles?.[i].model)
            {
                enginesArray.push(listOfVehicles?.[i].engine)
                type2 = enginesArray
            }

        }
    }

    console.log(type)
    console.log(type2)

    if (type) {
        modeloptions = type.map((el) => <option value={el}>{el}</option>);
    }
    if (type2) {
        engineoptions = type2.map((el) => <option value={el}>{el}</option>);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
          });
          console.log(name, value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
            onFormSubmit(values3, values4, values.dz, values.plp, values.plt)                 
    }
    
    return (
        <>
            <div className = "SelectCarForm">
            <div className = "LabelDiv">
                <label for="VehicleComponentLabel">Dobierz felgę do swojego auta</label> 
            </div>
            <div className = "VehicleSelectionComponent">
            <form onSubmit={handleSubmit}>
                <div className = "ManufacturerModelDiv">
                    <div className = "ManufacturerDiv">
                    <label for="cars">marka&nbsp;&nbsp;&nbsp;</label>
                    <select name="cars" id="cars" onChange={handleChoose}>
                        <option>Wybierz</option>         
                        {uniqmanufacturers.map((man) => <option value={man}>{man}</option>)}           
                    </select>
                    </div>
                    <div className = "ModelDiv">
                    <label for="model">model&nbsp;&nbsp;&nbsp;</label>
                    <select name="models" id="models" onChange={handleChoose2}>
                    <option>Wybierz</option>           
                        {
                            modeloptions
                        }  
                    </select>
                    </div>
                    <div className = "EngineDiv">
                    <label for="engine">silnik&nbsp;&nbsp;&nbsp;</label>
                    <select name="engines" id="engines" onChange={handleChoose3}>
                    <option>Wybierz</option>            
                        {
                            engineoptions
                        }  
                    </select>
                    </div>
                </div>
                <div className = "UserInsertsDiv">
                    <div className = "ZlicowanieDiv">
                        <label for="zlicowanie" title="Wpisz odległość felgi do krawędzi nadkola w celu dobrania odpowiedniej wartości ET">do zlicowania&nbsp;&nbsp;&nbsp;</label>
                        <input type='number' min="0" oninput="this.value = Math.abs(this.value)" placeholder="Do zlicowania" required value={values.dz} onChange={(handleChange)} name="dz" label="dz"></input>
                    </div>
                    <div className = "PoszPrzodDiv">
                        <label for="poszerzeniePrzód">posz. przód&nbsp;&nbsp;&nbsp;</label>
                        <input type='number' min="0" oninput="this.value = Math.abs(this.value)" placeholder="Poszerzenie lewostronne (przód)" required value={values.plp} onChange={(handleChange)} name="plp" label="plp"></input>
                    </div>
                    <div className = "PoszTylDiv">
                        <label for="poszerzenieTył">posz. tył&nbsp;&nbsp;&nbsp;</label>
                        <input type='number' min="0" oninput="this.value = Math.abs(this.value)" placeholder="Poszerzenie lewostronne (tył)" required value={values.plt} onChange={(handleChange)} name="plt" label="plt"></input>
                    </div>
                </div>
                <div className = "SubmitDiv">         
                    <input type='submit' value="wyszukaj"></input>
                </div> 
            </form>
            </div>
            </div>
        
        </>      
    )}