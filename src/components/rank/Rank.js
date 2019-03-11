import React from 'react';

const Rank = ({ name, facecount }) => {
   return (
      <div>
         {`Hello ${name}, you found this many faces:`}
         <div className='white f1'>
            {facecount}
         </div>
      </div>
   );
}

export default Rank;