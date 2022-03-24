import * as actionCreators from "../../store/action_creators/photoActionCreators"
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return {
        removePhoto: (screenshot) => dispatch(actionCreators.removePhoto(screenshot))
    };
}

function PhotoBadge(props) {
    function handleRemovePhoto() {
        props.removePhoto(props.fileName);
    }

    return (
        <>
            <span
                className="inline-flex items-center py-0.5 pl-2 mb-1 mr-2 pr-0.5 rounded-full
                    text-xs font-medium bg-sky-100 text-sky-700">
                {props.fileName}
              <button
                  type="button"
                  onClick={() => handleRemovePhoto()}
                  className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center
                      justify-center text-sky-400 hover:bg-sky-200 hover:text-sky-500 focus:outline-none
                      focus:bg-sky-500 focus:text-white"
              >
              <span className="sr-only">remove {props.fileName}</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7"/>
              </svg>
              </button>
            </span>
        </>
    );
}

export default connect(null, mapDispatchToProps)(PhotoBadge);