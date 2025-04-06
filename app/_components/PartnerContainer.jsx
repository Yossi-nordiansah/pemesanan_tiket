// src/components/AlternatingGrid.js
import React from 'react';
import Partners from './partners';

const PartnerContainer = () => {
    return (
      <div className="w-[95%] mx-auto px-1 pb-12 pt-4 mt-10" style={{backgroundImage: `url(${"/images/bg4.png"})`,backgroundSize: '100% 100%', backgroundPosition: "center", // 
      backgroundRepeat: 'no-repeat'}}>
        <Partners/>
      </div>
    );
  };
  
export default PartnerContainer;