import { handleLocationRequest } from '../utils/permissions';
import { useState } from 'react';
import Geolocation from 'react-native-geolocation-service';

const useLocation = () => {
    /**
     * GLOBAL STATES
     * **/
    const [isLoading, setisLoading] = useState(false)

    /**
     * GET CURRENT LOCATION
     * **/
    const getCurrentLocation = async (mapRef, setCurrentLocation, setplaceName) => {

        Geolocation?.getCurrentPosition(
            position => {

                setCurrentLocation({
                    latitude: position?.coords?.latitude,
                    longitude: position?.coords?.longitude,
                })

                    getPlaceName(position?.coords?.latitude, position?.coords?.longitude, setplaceName);
               

                mapRef?.current?.animateCamera({
                    center: {
                        latitude: position?.coords?.latitude,
                        longitude: position?.coords?.longitude,
                    },
                    duration: 1000,
                });
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    }

    /**
     * GET  POISTION
     * **/

    const getCurrentPosition = (mapRef, setCurrentLocation, setplaceName) => {

        handleLocationRequest(() => getCurrentLocation(mapRef, setCurrentLocation, setplaceName))
    }

    const getPlaceName = async (latitude, longitude, setplaceName) => {


        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDFnk0gjxz2Nn3VJtXPsZz8FfLZvgAQWb4`;
            const response = await fetch(url);
            const data = await response.json();

            const formattedAddress = data?.results[0]?.formatted_address;


            const addressComponents = data.results[0].address_components;
            const address = {};

            addressComponents.forEach((component) => {
                const componentType = component.types[0];
                address[componentType] = component.long_name;
            });
            setplaceName({ placeName: formattedAddress, country: address.country, zip: address.postal_code })


        } catch (error) {
            console.error(error);
            return null;
        }
    };


    return {
        isLoading,
        getCurrentLocation,
        getCurrentPosition,
        getPlaceName
    };
};

export default useLocation;
