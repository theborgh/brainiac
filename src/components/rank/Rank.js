import React from 'react';

const Rank = ({ name, entries }) => {
   return (
      <div>
         {`Hello ${name}, you found this many faces:`}
         <div className='white f1 '>
            {entries}
         </div>
      </div>
   );
}

export default Rank;