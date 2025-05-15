import React from 'react';
import { Map, Marker } from "pigeon-maps";
import { TypeAnimation } from 'react-type-animation';

const Location = () => {
    return (
        <div className="bg-[#f9fafb] py-8 px-4 lg:px-0">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-[#2C3E50] mb-6">
                    How to Reach the Destination?
                </h1>

                <div className="mb-10 max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
                    <TypeAnimation
                        sequence={[
                            "Located in the heart of Dhaka, just minutes from Stamford University and Supreme Court of Bangladesh. With easy access to Notre Dame University, BUET, and Jagannath University. The building is only 13 km away from Hazrat Shahjalal International Airport."
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ display: 'inline-block' }}
                    />
                </div>

                <div className="w-full px-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg max-w-6xl mx-auto">
                        <Map
                            height={400}
                            defaultCenter={[23.8041, 90.4152]}
                            defaultZoom={13}
                        >
                            <Marker width={50} anchor={[23.8041, 90.4152]} />
                        </Map>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
