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
    canHostSmallPet: state.filtersRed.canHostSmallPet,
    canHostMediumPet: state.filtersRed.canHostMediumPet,
    canHostLargePet: state.filtersRed.canHostLargePet,
    canHostGiantPet: state.filtersRed.canHostGiantPet,
    doesCat: state.filtersRed.doesCat,
    doesDog: state.filtersRed.doesDog
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
        onToggleSmall: (value) => dispatch(actionCreators.toggleSmall(value)),
        onToggleMedium: (value) => dispatch(actionCreators.toggleMedium(value)),
        onToggleLarge: (value) => dispatch(actionCreators.toggleLarge(value)),
        onToggleGiant: (value) => dispatch(actionCreators.toggleGiant(value)),
        onToggleCat: (value) => dispatch(actionCreators.toggleCat(value)),
        onToggleDog: (value) => dispatch(actionCreators.toggleDog(value)),
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
            <div><input type="checkbox" defaultChecked={props.canHostSmallPet} name="canHostSmallPet" onChange={(e) => props.onToggleSmall(e.target.checked)}/> Small Pets</div>
            <div><input type="checkbox" defaultChecked={props.canHostMediumPet} name="canHostMediumPet" onChange={(e) => props.onToggleMedium(e.target.checked)}/> Medium Pets</div>
            <div><input type="checkbox" defaultChecked={props.canHostLargePet} name="canHostLargePet" onChange={(e) => props.onToggleLarge(e.target.checked)}/> Large Pets</div>
            <div><input type="checkbox" defaultChecked={props.canHostGiantPet} name="canHostGiantPet" onChange={(e) => props.onToggleGiant(e.target.checked)}/> Giant Pets</div>
            <div><input type="checkbox" defaultChecked={props.doesCat} name="doesCat" onChange={(e) => props.onToggleCat(e.target.checked)}/> Cats</div>
            <div><input type="checkbox" defaultChecked={props.doesDog} name="doesDog" onChange={(e) => props.onToggleDog(e.target.checked)}/> Dogs</div>
        </div>

      </div>
    );
}
  
export default connect(mapStateToProps, mapDispatchToProps)(FilterOptions);