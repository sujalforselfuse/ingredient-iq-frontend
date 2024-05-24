import React from 'react';
 import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel } from 'react-responsive-carousel';
import gfgicon from './rename.jpeg';
import cover1 from './cover1.jpeg';
import cover2 from './cover2.jpeg';
import cover3 from './cover3.jpeg';
import cover4 from './cover4.jpeg';
import cover5 from './cover5.jpeg';
import cover6 from './cover6.jpeg';




export default function Cover() {
  const onChange = (index, item) => {
    console.log(`Slide changed to index ${index} with item `, item);
    // You can perform any action here when the slide changes
  };

  const onClickItem = (index, item) => {
    console.log(`Clicked on slide item at index ${index} with item `, item);
    // You can perform any action here when a slide item is clicked
  };

  const onClickThumb = (index, item) => {
    console.log(`Clicked on thumbnail at index ${index} with item `, item);
    // You can perform any action here when a thumbnail is clicked
  };

  return (
    <div className='p-2'>
      
      <Carousel  showArrows={false} showThumbs={false} showStatus={false} autoPlay={true} interval={3000} infiniteLoop={true} axis='horizontal' onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
        <div >
          <img className='rounded-xl' src={cover1} alt="Slide 1" />
          
        </div>
         <div>
          <img className='rounded-xl' src={cover2} alt="Slide 2" />
          
        </div>
        <div>
          <img className='rounded-xl' src={cover3} alt="Slide 3" />
          
        </div>
        <div>
          <img className='rounded-xl' src={cover4} alt="Slide 3" />
          
        </div>
        <div>
          <img className='rounded-xl' src={cover5} alt="Slide 3" />
          
        </div>
        <div>
          <img className='rounded-xl' src={cover6} alt="Slide 3" />
          
        </div> 
        
      </Carousel>
    </div>
  );
}
