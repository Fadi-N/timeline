import React, {useState} from 'react';
import {Head} from "@inertiajs/react";
import {Button} from "@nextui-org/button";
import {BsFileEarmarkPlus} from "react-icons/bs";
import {Chip, DateRangePicker, Divider, Radio, RadioGroup, useDisclosure} from "@nextui-org/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Input} from "@nextui-org/input";
import ModalWrapper from "@/Components/ModalWrapper.jsx";
import {getLocalTimeZone, parseZonedDateTime, today} from "@internationalized/date";
import NavLink from "@/Components/NavLink.jsx";

const Notes = ({auth, folder, notes}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const currentDate = today(getLocalTimeZone("Europe/Warsaw"));

    const [status, setStatus] = useState('pending');

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard"/>

            <div className="container mx-auto px-4 bg-white min-h-[calc(100vh-65px)]">
                <div className="flex items-center justify-between py-4">
                    <div className="ps-4 text-[1.25rem] lg:text-[1.375rem] text-gray-400">
                        <a href={route('home')}>
                            Folder
                        </a> > {folder.name}
                    </div>
                    <Button
                        className="mx-4"
                        variant="light"
                        startContent={<BsFileEarmarkPlus/>}
                        size={"sm"}
                        onClick={onOpen}
                    >
                        New Note
                    </Button>
                </div>
                <Divider/>
                <div className="p-4">
                    <ul className="flex flex-col space-y-3">
                        {notes?.map(note => (
                            <li
                                key={note.id}
                                className="flex justify-between items-center p-6 lg:p-8 bg-yellow-custom rounded-[1.25rem]"
                            >
                                <div
                                    className={`border-s-3 px-6 w-full ${note.status === 'pending' ? 'border-s-blue-500' : note.status === 'in_progress' ? 'border-s-yellow-600' : 'border-s-green-500'}`}>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[1.25rem] text-gray-800">{note.title}</p>
                                        <div className="flex items-center justify-between hidden-radio-2">
                                            <RadioGroup
                                                className="flex flex-row items-center justify-between w-full"
                                                orientation="horizontal"
                                                defaultValue={note.status}
                                            >
                                                <Chip
                                                    className={`chip-custom hover:bg-blue-500 ${note.status === 'pending' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                                    <Radio
                                                        value="pending"
                                                        onChange={() => handleStatusChange('pending')}
                                                    >
                                                    </Radio>
                                                </Chip>
                                                <Chip
                                                    className={`chip-custom hover:bg-yellow-600 ${note.status === 'in_progress' ? 'bg-yellow-600' : 'bg-gray-300'}`}>
                                                    <Radio
                                                        value="in_progress"
                                                        onChange={() => handleStatusChange('in_progress')}
                                                    >
                                                    </Radio>
                                                </Chip>
                                                <Chip
                                                    className={`chip-custom hover:bg-green-500 ${note.status === 'complete' ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                    <Radio
                                                        value="complete"
                                                        onChange={() => handleStatusChange('complete')}
                                                    >
                                                    </Radio>
                                                </Chip>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <p className="text-gray-400">{note.description}</p>
                                    <div className="flex justify-end text-[0.875rem] text-gray-400 font-semibold mt-10">
                                        {note["start_date"]} - {note["end_date"]}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <ModalWrapper
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title="New Note"
                submitButtonText="Create Note"
            >
                <form className="flex flex-col space-y-3">
                    <Input
                        className="custom-input"
                        type="text"
                        label="Title"
                        value=""
                    />
                    <Input
                        className="custom-input"
                        type="text"
                        label="Description"
                        value=""
                    />
                    <DateRangePicker
                        label="Duration"
                        hideTimeZone
                        visibleMonths={2}
                        defaultValue={{
                            start: parseZonedDateTime(`${currentDate}T00:00[Europe/Warsaw]`),
                            end: parseZonedDateTime(`${currentDate.add({days: 7})}T23:59[Europe/Warsaw]`),
                        }}
                    />
                    <div className="flex items-center justify-between hidden-radio">
                        <RadioGroup
                            className="flex flex-row items-center justify-between w-full"
                            label="Status"
                            orientation="horizontal"
                            defaultValue="pending"
                        >
                            <Chip
                                className={`hover:bg-blue-500 ${status === 'pending' ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                <Radio
                                    value="pending"
                                    onChange={() => handleStatusChange('pending')}
                                >
                                    <span className={status === 'pending' ? 'text-white' : 'hover:text-white'}>
                                        Pending
                                    </span>
                                </Radio>
                            </Chip>
                            <Chip
                                className={`hover:bg-yellow-600 ${status === 'in_progress' ? 'bg-yellow-600' : 'bg-gray-200'}`}>
                                <Radio
                                    value="in_progress"
                                    onChange={() => handleStatusChange('in_progress')}
                                >
                                    <span className={status === 'in_progress' ? 'text-white' : 'hover:text-white'}>
                                        In Progress
                                    </span>
                                </Radio>
                            </Chip>
                            <Chip
                                className={`hover:bg-green-500 ${status === 'complete' ? 'bg-green-500' : 'bg-gray-200'}`}>
                                <Radio
                                    value="complete"
                                    onChange={() => handleStatusChange('complete')}
                                >
                                    <span className={status === 'complete' ? 'text-white' : 'hover:text-white'}>
                                        Complete
                                    </span>
                                </Radio>
                            </Chip>
                        </RadioGroup>
                    </div>
                </form>
            </ModalWrapper>
        </AuthenticatedLayout>
    );
};

export default Notes;
