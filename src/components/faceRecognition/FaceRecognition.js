import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({image, box}) => {

   return (
      <div className='center ma'>
         <div className='absolute mt2'>
            <img id='inputImg' alt='' src={image} width='500px' height='auto' />

            { 
               box.length ? 
                  box.map((item, i) => <div key={i} className='boundingbox'
                     style={{top: item.topRow, right: item.rightCol, 
                     bottom: item.bottomRow, left: item.leftCol }}></div>)
               :''
            }
         
         </div>
      </div>
   );
}

export default FaceRecognition;