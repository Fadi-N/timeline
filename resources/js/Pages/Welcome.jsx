import { Head } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import React from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard"/>

            <div className="container mx-auto px-4 bg-white min-h-[calc(100vh-65px)]">

            </div>
        </AuthenticatedLayout>
    );
}
