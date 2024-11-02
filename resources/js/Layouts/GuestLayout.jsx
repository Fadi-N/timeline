import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react'; // Hook to get the current URL from Inertia.js
import loginLogo from '../../../public/img/login-logo.jpg';
import registrationLogo from '../../../public/img/registration-logo.jpg';

export default function Guest({ children }) {
    const { url } = usePage(); // Get the current URL
    const [image, setImage] = useState(loginLogo);

    useEffect(() => {
        // Set the image based on the current path
        if (url.includes('register')) {
            setImage(registrationLogo);
        } else {
            setImage(loginLogo);
        }
    }, [url]);

    return (
        <div className="h-[100vh] flex">
            {/* Left side: Image */}
            <div className="w-1/2 bg-gray-100 hidden md:inline-block">
                <img
                    src={image}
                    alt="Note Management Application"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Right side: Logo and Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white mx-6 md:mx-0">
                <div className="w-full sm:max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
