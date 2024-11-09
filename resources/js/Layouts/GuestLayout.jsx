import { usePage } from '@inertiajs/react';
import logo from '../../../public/img/auth-logo.jpg';

export default function Guest({ children }) {
    const { url } = usePage();

    return (
        <div className="h-[100vh] flex">
            {/* Left side: Image */}
            <div className="w-1/2 bg-gray-100 hidden md:inline-block">
                <img
                    src={logo}
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
