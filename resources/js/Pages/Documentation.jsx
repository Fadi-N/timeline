import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const Documentation = ({auth}) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard"/>

            Documentation
        </AuthenticatedLayout>
    );
};

export default Documentation;
