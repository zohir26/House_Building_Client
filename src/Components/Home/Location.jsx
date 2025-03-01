import React from 'react';
import map from '../../assets/map 2.jpg'
import { Map, Marker } from "pigeon-maps"
import { TypeAnimation } from 'react-type-animation';
const Location = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold text-center'>
                How to reach the destination?
            </h1>
            <div className='py-4 text-center container mx-auto w-1/2'>
                <TypeAnimation
                    sequence={[
                        "It is located in  Centre of City is set in Dhaka, 3.1 km from Stamford University Bangladesh and 3.2 km from Supreme Court of Bangladesh. Among the facilities of this property are a restaurant, room service and a 24-hour front desk, along with free WiFi. The property is non-smoking and is situated 700 metres from Notre Dame University Bangladesh.BUET is 4.3 km from the accommodation, while Jagannath University is 4.3 km from the property. Hazrat Shahjalal International Airport is 13 km away."
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '1em', display: 'inline-block' }}

                />
            </div>
            <div className='min-w-screen-md px-2 m-auto rounded-xl'>
                
                <Map height={400} width={900} defaultCenter={[23.8041, 90.4152]} defaultZoom={11}>
                    <Marker width={50} anchor={[23.8041, 90.4152]} />
                </Map>
            </div>
           
        </div>
    );
};

export default Location;