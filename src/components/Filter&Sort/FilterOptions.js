import { connect } from 'react-redux'
import * as actionCreators from "../../store/action_creators/filterActionCreator"
import ServiceDropdown from './ServiceDropdown'

const mapStateToProps = (state) => {
  return {
    canHostMultiplePets: state.filtersRed.canHostMultiplePets,
    canHostUnspayedFemales: state.filtersRed.canHostUnspayedFemales,
    hasChildren: state.filtersRed.hasChildren,
    hasOtherPets: state.filtersRed.hasOtherPets,
    isHomeFullTime: state.filtersRed.isHomeFullTime,
    isSmoking: state.filtersRed.isSmoking,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleMultiPets: (value) => dispatch(actionCreators.toggleMultiPets(value)),
        onToggleUnspayed: (value) => dispatch(actionCreators.toggleUnspayed(value)),
        onToggleChildren: (value) => dispatch(actionCreators.toggleChildren(value)),
        onToggleOtherPets: (value) => dispatch(actionCreators.toggleOtherPets(value)),
        onToggleHomeFull: (value) => dispatch(actionCreators.toggleHomeFull(value)),
        onToggleSmoking: (value) => dispatch(actionCreators.toggleSmoking(value)),
    }
}


function FilterOptions(props) {
    

    return (
      <div className="flex-col justify-center p-10 border">
        <ServiceDropdown/>
        <div>
            <h1>Filters</h1>
            <div><input type="checkbox" defaultChecked={props.canHostMultiplePets} name="canHostMultiplePets" onChange={(e) => props.onToggleMultiPets(e.target.checked)} /> Can Host Multiple Pets</div>
            <div><input type="checkbox" defaultChecked={props.canHostUnspayedFemales} name="canHostUnspayedFemales" onChange={(e) => props.onToggleUnspayed(e.target.checked)}/> Can Host Unspayed Females</div>
            <div><input type="checkbox" defaultChecked={props.hasChildren} name="hasChildren" onChange={(e) => props.onToggleChildren(e.target.checked)}/> Has Children</div>
            <div><input type="checkbox" defaultChecked={props.hasOtherPets} name="hasOtherPets" onChange={(e) => props.onToggleOtherPets(e.target.checked)}/> Has Other Pets</div>
            <div><input type="checkbox" defaultChecked={props.isHomeFullTime} name="isHomeFullTime" onChange={(e) => props.onToggleHomeFull(e.target.checked)}/> Is Home Full-Time</div>
            <div><input type="checkbox" defaultChecked={props.isSmoking} name="isSmoking" onChange={(e) => props.onToggleSmoking(e.target.checked)}/> Is A Smoker</div>
        </div>

      </div>
    );
}
  
export default connect(mapStateToProps, mapDispatchToProps)(FilterOptions);