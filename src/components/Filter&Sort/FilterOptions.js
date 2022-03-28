import { connect } from 'react-redux'
import * as actionCreators from "../../store/action_creators/filterActionCreator"



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
        <h1>Filters</h1>
        <div>
            <div><input type="checkbox" name="canHostMultiplePets" onChange={(e) => props.onToggleMultiPets(e.target.checked)} /> Can Host Multiple Pets</div>
            <div><input type="checkbox" name="canHostUnspayedFemales" onChange={(e) => props.onToggleUnspayed(e.target.checked)}/> Can Host Unspayed Females</div>
            <div><input type="checkbox" name="hasChildren" onChange={(e) => props.onToggleChildren(e.target.checked)}/> Has Children</div>
            <div><input type="checkbox" name="hasOtherPets" onChange={(e) => props.onToggleOtherPets(e.target.checked)}/> Has Other Pets</div>
            <div><input type="checkbox" name="isHomeFullTime" onChange={(e) => props.onToggleHomeFull(e.target.checked)}/> Is Home Full-Time</div>
            <div><input type="checkbox" name="isSmoking" onChange={(e) => props.onToggleSmoking(e.target.checked)}/> Is A Smoker</div>
        </div>

      </div>
    );
}
  
export default connect(null, mapDispatchToProps)(FilterOptions);