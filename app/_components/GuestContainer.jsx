import React from 'react';
import Speakers from './speakers';

const GuestContainer = () => {
    return (
      <div className="w-[95%] mx-auto pb-16 lg:pt-5 pt-4" style={{backgroundImage: `url(${"/images/bg4.png"})`,   backgroundSize: '100% 100%', backgroundPosition: "center", // 
      backgroundRepeat: 'no-repeat'}}>
        <Speakers/>
      </div>
    );
  };
  
export default GuestContainer;
 