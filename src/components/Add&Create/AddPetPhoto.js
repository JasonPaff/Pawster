import React, { useCallback } from "react";
import { connect } from "react-redux";
import PhotoBadge from "./PhotoBadge";
import { useDropzone } from "react-dropzone";
import * as actionCreators from "../../store/action_creators/photoActionCreators";

const mapDispatchToProps = (dispatch) => {
  return {
    setPhoto: (photo) => dispatch(actionCreators.setPhoto(photo)),
  };
};

const mapStateToProps = (state) => {
  return {
    photo: state.petRed.photo,
  };
};

function AddPetPhoto(props) {
  const onDrop = useCallback((acceptedFiles) => {
    handleImageUpload(null, acceptedFiles[acceptedFiles.length - 1]);
  }, []);

  const { getRootProps } = useDropzone({ noClick: true, noKeyboard: true, accept: "image/*", maxFiles: 1, onDrop });

  function handleImageUpload(event, file) {
    const findMatching = props.photo.findIndex((shot) => {
      return shot.name === file.name;
    });
    if (file !== undefined && findMatching === -1 && props.photo.length < 1) {
      props.setPhoto([...props.photo, file]);
      if (event !== null) event.target.value = "";
    }
  }

  return (
    <div className="sm:col-span-6 lg:px-10">
      <div
        id="screenshot"
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300
                        border-dashed rounded-md"
        {...getRootProps()}
      >
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0
                                    01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4
                                    4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-medium
                                    text-sky-600 hover:text-sky-500 focus-within:outline-none
                                    focus-within:ring-2 focus-within:ring-offset-2
                                    focus-within:ring-sky-500"
            >
              <span>Upload a file</span>
              <input id="file-upload" name="imageUpload" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, e.target.files[0])} className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap mt-1">
        {props.photo.map((shot) => {
          return <PhotoBadge fileName={shot.name} key={shot.name} />;
        })}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPetPhoto);
