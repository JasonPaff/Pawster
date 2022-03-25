import React, { useState } from 'react'
import { connect } from 'react-redux'
import '../../styles/ServiceOptions.css'
import * as actionCreators from "../../store/action_creators/filterActionCreator"


const mapStateToProps = (state) => {
    return {
        has_house: state.filtersRed.has_house,
        has_fenced_yard: state.filtersRed.has_fenced_yard,
        doesnt_own_dog: state.filtersRed.doesnt_own_dog,
        doesnt_own_cat: state.filtersRed.doesnt_own_cat
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleHouse: (value) => dispatch(actionCreators.toggleHouse(value)),
        onToggleYard: (value) => dispatch(actionCreators.toggleYard(value)),
        onToggleDog: (value) => dispatch(actionCreators.toggleDog(value)),
        onToggleCat: (value) => dispatch(actionCreators.toggleCat(value))
    }
}


function ServiceOptions(props) {

    
    return (
      <div className="flex-col justify-center">
        <h1>Service Filter</h1>
        <div className="flex space-x-20">
            <div>
                <input class="radioInput" type="radio" name="serviceType" id="radio1"></input>
                <label for="radio1">Option 1</label>
            </div>
            <div>
                <input class="radioInput" type="radio" name="serviceType" id="radio2"></input>
                <label for="radio2">Option 2</label>
            </div>
            <div>
                <input class="radioInput" type="radio" name="serviceType" id="radio3"></input>
                <label for="radio3">Option 3</label>
            </div>
            <div>
                <input class="radioInput" type="radio" name="serviceType" id="radio4"></input>
                <label for="radio4">Option 4</label>
            </div>
            <div>
                <input class="radioInput" type="radio" name="serviceType" id="radio5"></input>
                <label for="radio5">Option 5</label>
            </div>
        </div>

      </div>
    );
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ServiceOptions);