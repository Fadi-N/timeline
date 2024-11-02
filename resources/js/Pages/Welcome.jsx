import {Head} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Button} from "@nextui-org/button";
import React from "react";
import {FaStickyNote, FaFolderOpen, FaRegCalendarCheck} from "react-icons/fa";
import {Link} from "@nextui-org/link";
import {Card, CardBody} from "@nextui-org/react";

export default function Home({auth, laravelVersion, phpVersion}) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Welcome"/>
            <div className="overflow-y-scroll h-[calc(100vh-65px)]">
                {/* Header Section */}
                <header className="container mx-auto text-center py-16 px-6">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome to the Note Management App!
                    </h1>
                    <p className="text-lg text-gray-600 mt-4">
                        Store, organize, and review your notes and folders in one convenient place.
                    </p>
                    <div className="mt-6">

                        <Button
                            className="mx-2 bg-gray-800 text-white"
                            as={Link}
                            href={route('login')}
                            color="default"
                            size="lg"
                            radius="full"
                        >
                            Log In
                        </Button>
                        <Button
                            className="mx-2 bg-yellow-custom text-gray-800"
                            as={Link}
                            href={route('register')}
                            color="default"
                            size="lg"
                            radius="full"
                        >
                            Sign Up
                        </Button>
                    </div>
                </header>

                {/* About Section */}
                <section className="about-section py-16 px-6 bg-gray-100">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-800">
                            About Our App
                        </h2>
                        <p className="text-center text-gray-600 mt-4">
                            Our app helps you create and organize notes in folders, so you can keep track of ideas,
                            tasks, and goals effortlessly.
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section py-16 px-6">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-800">
                            Features
                        </h2>
                        <div className="flex flex-col md:flex-row md:justify-between mt-8">
                            <Card className="feature-item p-6 shadow-lg mx-2 my-2">
                                <CardBody className="flex justify-center items-center">
                                    <div className="p-6 rounded-full bg-yellow-custom">
                                        <FaStickyNote className="text-white mx-auto text-4xl"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mt-4">Create Notes</h3>
                                    <p className="text-gray-600 mt-2">
                                        Add and save notes with details about important tasks and ideas.
                                    </p>
                                </CardBody>
                            </Card>

                            <Card className="feature-item p-6 shadow-lg mx-2 my-2">
                                <CardBody className="flex justify-center items-center">
                                    <div className="p-6 rounded-full bg-yellow-custom">
                                        <FaFolderOpen className="text-white mx-auto text-4xl"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mt-4">Organize Folders</h3>
                                    <p className="text-gray-600 mt-2">
                                        Group notes into folders to make finding information easier.
                                    </p>
                                </CardBody>
                            </Card>

                            <Card className="feature-item p-6 shadow-lg mx-2 my-2">
                                <CardBody className="flex justify-center items-center">
                                    <div className="p-6 rounded-full bg-yellow-custom">
                                        <FaRegCalendarCheck className="text-white mx-auto text-4xl"/>
                                    </div>
                                    <h3 className="text-xl font-semibold mt-4">Manage Deadlines</h3>
                                    <p className="text-gray-600 mt-2">
                                        Add start and end dates to notes to stay on top of important deadlines.
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="how-it-works-section bg-white py-16 px-6">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-800">
                            How It Works
                        </h2>
                        <div className="steps flex flex-col items-center justify-center md:flex-row mt-8">
                            <div
                                className="step flex flex-col items-center justify-center p-6 border-3 rounded-2xl border-yellow-custom">
                                <div
                                    className="bg-gray-800 p-4 w-[42px] h-[42px] flex items-center justify-center rounded-full">
                                    <p className="text-2xl font-semibold text-white">1</p>
                                </div>
                                <h3 className="text-xl font-semibold mt-4">Sign Up</h3>
                                <p className="text-gray-600 mt-2">
                                    Create an account to start managing your notes.
                                </p>
                            </div>
                            <div className="bg-yellow-custom w-[3px] h-[20px] md:w-[20px] md:h-[3px]"></div>
                            <div
                                className="step flex flex-col items-center justify-center p-6 border-3 rounded-2xl border-yellow-custom">
                                <div
                                    className="bg-gray-800 p-4 w-[42px] h-[42px] flex items-center justify-center rounded-full">
                                    <p className="text-2xl font-semibold text-white">2</p>
                                </div>
                                <h3 className="text-xl font-semibold mt-4">Create & Organize</h3>
                                <p className="text-gray-600 mt-2">
                                    Add notes, organize them into folders, and set statuses and deadlines.
                                </p>
                            </div>
                            <div className="bg-yellow-custom w-[3px] h-[20px] md:w-[20px] md:h-[3px]"></div>
                            <div
                                className="step flex flex-col items-center justify-center p-6 border-3 rounded-2xl border-yellow-custom">
                                <div
                                    className="bg-gray-800 p-4 w-[42px] h-[42px] flex items-center justify-center rounded-full">
                                    <p className="text-2xl font-semibold text-white">3</p>
                                </div>
                                <h3 className="text-xl font-semibold mt-4">Manage & Update</h3>
                                <p className="text-gray-600 mt-2">
                                    Edit, update, and manage your notes as your tasks evolve.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="cta-section bg-yellow-custom py-16 text-center">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold">Join Us Now!</h2>
                        <p className="text-lg my-4">
                            Sign up to start organizing your notes today.
                        </p>
                        <Button
                            className="mx-2 bg-gray-800 text-white"
                            as={Link}
                            href={route('register')}
                            color="default"
                            size="lg"
                            radius="full"
                        >
                            Sign Up
                        </Button>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
