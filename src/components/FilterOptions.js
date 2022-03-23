import { connect } from 'react-redux'
import * as actionCreators from "../store/action_creators/filterActionCreator"


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


function FilterOptions(props) {
    

    return (
      <div className="flex-col justify-center">
        <h1>Filters</h1>
        <div>
            <h2>House Conditions</h2>
            <div><input type="checkbox" name="has_house" onChange={(e) => props.onToggleHouse(e.target.checked)} /> Has house</div>
            <div><input type="checkbox" name="has_fenced_yard" onChange={(e) => props.onToggleYard(e.target.checked)}/> Has fenced yard</div>
        </div>

        <div>
            <h2>Pets in the Home</h2>
            <div><input type="checkbox" name="doesnt_own_dog" onChange={(e) => props.onToggleDog(e.target.checked)}/> Doesn't own a dog</div>
            <div><input type="checkbox" name="doesnt_own_cat" onChange={(e) => props.onToggleCat(e.target.checked)}/> Doesn't own a cat</div>
        </div>

      </div>
    );
}
  
export default connect(mapStateToProps, mapDispatchToProps)(FilterOptions);