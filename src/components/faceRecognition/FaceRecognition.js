import React from 'react';

const FaceRecognition = ({image}) => {
   return (
      <div className='center'>
         <img alt='Submission' src={image} />
      </div>
   );
}

export default FaceRecognition;