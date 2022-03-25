import React, { useState } from 'react'
import { connect } from 'react-redux'
import '../../styles/ServiceOptions.css'
import * as actionCreators from "../../store/action_creators/filterActionCreator"



const mapDispatchToProps = (dispatch) => {
    return {
        onToggleService: (value) => dispatch(actionCreators.toggleService(value)),
    }
}

const data = {
    "services": [
        {
            "id": 1,
            "name": "Services",
            "options": [
                {
                    "id": 11,
                    "name": "doesBoarding",
                    "label": "Boarding",
                    "function": "onToggleBoard"
                },
                {
                    "id": 12,
                    "name": "doesHouseSitting",
                    "label": "Home Sitting",
                    "function": "onToggleSitting"
                },
                {
                    "id": 13,
                    "name": "doesDropInVisits",
                    "label": "Drop-in Visits",
                    "function": "onToggleVisits"
                },
                {
                    "id": 14,
                    "name": "doesDayCare",
                    "label": "Day Care",
                    "function": "onToggleDayCare"
                },
                {
                    "id": 15,
                    "name": "doesDogWalking",
                    "label": "Dog Walking",
                    "function": "onToggleWalking"
                }
            ]
        },
    ]
}




function ServiceOptions(props) {
    const radioButtons = data.services.map(({ id, name, options}) => {
        return <div key={id}>
                    <h2>{name}</h2>
                    {options.map((opt) => {
                        console.log(name)
                        return <div key={opt.id} >
                            <input 
                            type="radio"
                            value={opt.name}
                            name={name}
                            onChange={() => props.onToggleService({[opt.name]: true})}
                            />
                            {opt.label}
                        </div>
                    })}
                </div>
    })

    // radio updates global state in real time?
    
    return (
      <div className="flex-col justify-center">
        <h1>Service Filter</h1>

        {radioButtons}
        
        <div className="flex space-x-20">
            <div>
                <input className="radioInput" type="radio" name="serviceType" id="radio1"></input>
                <label htmlFor="radio1">Option 1</label>
            </div>
            <div>
                <input className="radioInput" type="radio" name="serviceType" id="radio2"></input>
                <label htmlFor="radio2">Option 2</label>
            </div>
            <div>
                <input className="radioInput" type="radio" name="serviceType" id="radio3"></input>
                <label htmlFor="radio3">Option 3</label>
            </div>
            <div>
                <input className="radioInput" type="radio" name="serviceType" id="radio4"></input>
                <label htmlFor="radio4">Option 4</label>
            </div>
            <div>
                <input className="radioInput" type="radio" name="serviceType" id="radio5"></input>
                <label htmlFor="radio5">Option 5</label>
            </div>
        </div>

      </div>
    );
}
  
export default connect(null, mapDispatchToProps)(ServiceOptions);