import React from 'react';
import './Alloy.css';

export const AlloyCompConstExp = ({listOfAlloys}) => {
    return (
        <>
        {listOfAlloys?.map(alloy=> {
            return (
                    <div className='AlloyDiv'>
                        <div className={alloy.id}>
                            <div className="PhotoPlaceholder">
                                <div className="photo" style={{backgroundImage: `url(${alloy.photo})`}}>                               
                                </div>
                            </div>
                            <div className="AlloysLabelsPlaceholders">
                                <div className="AlloyManufacturerPlaceholder">
                                    <label for="AlloyManufacturerLabel">{alloy.manufacturer}</label>
                                </div>
                                <div className="AlloyModelPlaceholder">
                                    <label for="AlloyModelLabel">{alloy.model}</label>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        })}
        
        </>
    )}