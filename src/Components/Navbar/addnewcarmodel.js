import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"
import './AddNewCarModel.css';

export const ModelCompConstExp = ({listOfVehicles, listOfAlloysETS, listOfAlloysBPS, listOfAlloysCBS, onFormSubmit}) => {

    const navigate = useNavigate();

    const defaultValues = {
        model: '',
        engine: '',
        bolt_pattern_id: 0,
        cb_id: 0,
        et_id: 0
      };

    const [values, setValues] = useState(defaultValues);

    const [values2, setValues2] = useState();

    const [values3, setValues3] = useState();

    const [values4, setValues4] = useState();

    const [values5, setValues5] = useState();

    const handleChoose = (event) => {
        
        setValues2(event.target.value)      
    }

    const handleChoose2 = (event) => {
        
        setValues3(event.target.value)      
    }

    const handleChoose3 = (event) => {
        
        setValues4(event.target.value)      
    }

    const handleChoose4 = (event) => {
        
        setValues5(event.target.value)      
    }

    const manufacturers = []
    const bps = []
    const cbs = []
    const ets = []

    console.log(listOfVehicles?.[0])

    for (let i = 0; i < listOfVehicles?.length; i++)
    {
        manufacturers.push(listOfVehicles?.[i].manufacturer)
    }

    for (let i = 0; i < listOfAlloysBPS?.length; i++)
    {
        bps.push(listOfAlloysBPS?.[i].bolt_pattern)
    }

    for (let i = 0; i < listOfAlloysCBS?.length; i++)
    {
        cbs.push(listOfAlloysCBS?.[i].cb)
    }

    for (let i = 0; i < listOfAlloysETS?.length; i++)
    {
        ets.push(listOfAlloysETS?.[i].et)
    }

    for (let i = 0; i < bps?.length; i++)
    {
        console.log(i + " " +bps[i])
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
            onFormSubmit(values2, values.model, values.engine, values3, values4, values5)                    
    }
    
    return (
        <>
            <div className = "AddCarForm">
            <div className = "VehicleSelectionComponent">
            <form onSubmit={handleSubmit}>
                <div className = "ManufacturerModelDiv">
                    <div className = "ManufacturerDiv">
                        <label for="cars">marka&nbsp;&nbsp;&nbsp;</label>
                            <select name="cars" id="cars" onChange={handleChoose}>
                                <option>Wybierz</option>         
                                {manufacturers.map((man) => <option value={man}>{man}</option>)}           
                            </select>
                    </div>
                    <div className = "ModelDiv">
                        <label for="model" title="Wpisz model pojazdu">model&nbsp;&nbsp;&nbsp;</label>
                        <input type='text' placeholder="model" required value={values.model} onChange={(handleChange)} name="model" label="model"></input>
                    </div>
                    <div className = "EngineDiv">
                        <label for="engine" title="Wpisz silnik pojazdu">silnik&nbsp;&nbsp;&nbsp;</label>
                        <input type='text' placeholder="silnik" required value={values.engine} onChange={(handleChange)} name="engine" label="engine"></input>
                    </div>
                </div>
                <div className = "UserInsertsDiv">                  
                    <div className = "ETSDiv">
                    <label for="ets">ets&nbsp;&nbsp;&nbsp;</label>
                    <select name="ets" id="ets" onChange={handleChoose2}>
                    <option>Wybierz</option>         
                        {ets.map((man) => <option value={man}>{man}</option>)} 
                    </select>
                    </div>
                    <div className = "CBSDiv">
                    <label for="cbs">cbs&nbsp;&nbsp;&nbsp;</label>
                    <select name="cbs" id="cbs" onChange={handleChoose3}>
                    <option>Wybierz</option>         
                        {cbs.map((man) => <option value={man}>{man}</option>)} 
                    </select>
                    </div>
                    <div className = "BPSDiv">
                    <label for="bps">bps&nbsp;&nbsp;&nbsp;</label>
                    <select name="bps" id="bps" onChange={handleChoose4}>
                    <option>Wybierz</option>         
                        {bps.map((man) => <option value={man}>{man}</option>)} 
                    </select>
                    </div>
                </div>
                <div className = "SubmitDiv">         
                    <input type='submit' value="dodaj pojazd"></input>
                </div> 
            </form>
            </div>
            </div>
        
        </>      
    )}