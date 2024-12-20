import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center text-sm mx-2 px-3 py-1 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-yellow-custom rounded-full'
                    : 'hover:bg-gray-200 rounded-full px-3 py-1') +
                className
            }
        >
            {children}
        </Link>
    );
}
