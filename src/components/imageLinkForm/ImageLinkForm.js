import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => { // Destructuring: same as props.onInputChange
   return (
      <div className=''>
         <p className='f3'>
            {"Paste an image URL and Brainiac will attempt to detect all the faces in the picture"}
         </p>
         <div className='center'>
            <div className='form center pa3 br3 shadow-5'>
               <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
               <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onPictureSubmit}>Detect</button>
            </div>
         </div>
      </div>
   );
}

export default ImageLinkForm;