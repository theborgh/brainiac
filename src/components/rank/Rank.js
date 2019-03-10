import React from 'react';

const Rank = ({ name, entries }) => {
   return (
      <div>
         {`Hello ${name}, your current entry count is:`}
         <div className='white f1 '>
            {entries}
         </div>
      </div>
   );
}

export default Rank;