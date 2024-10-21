import React, {useState} from 'react';
import {Head} from "@inertiajs/react";
import {Button} from "@nextui-org/button";
import {BsFileEarmarkPlus} from "react-icons/bs";
import {Chip, DateRangePicker, Divider, Radio, RadioGroup, useDisclosure} from "@nextui-org/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Input} from "@nextui-org/input";
import ModalWrapper from "@/Components/ModalWrapper.jsx";
import {getLocalTimeZone, parseZonedDateTime, today} from "@internationalized/date";
import {Inertia} from "@inertiajs/inertia";

const Notes = ({auth, folder, notes}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const currentDate = today(getLocalTimeZone("Europe/Warsaw"));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(currentDate.add({days: 7}));
    const [status, setStatus] = useState('pending');

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const handleCreateNote = (e) => {
        e.preventDefault();

        const formattedStartDate = startDate.toString().slice(0, 19).replace('T', ' ');
        const formattedEndDate = endDate.toString().slice(0, 19).replace('T', ' ');

        Inertia.post('/notes', {
            title,
            description,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            status,
            folder_id: folder.id
        }, {
            onSuccess: () => {
                onOpenChange(false);
                setTitle('');
                setDescription('');
                setStartDate(currentDate);
                setEndDate(currentDate.add({days: 7}));
                setStatus('pending');
            }
        });
    };

    const handleChipClick = (noteId, newStatus) => {
        Inertia.patch(`/notes/${noteId}`, {
            status: newStatus
        }, {
            onSuccess: () => {
                console.log('Status updated successfully');
            },
            onError: (error) => {
                console.error('Error updating status:', error);
            }
        });
    };


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard"/>

            <div className="container mx-auto px-4 bg-white min-h-[calc(100vh-65px)]">
                <div className="flex items-center justify-between py-4">
                    <div className="ps-4 text-[1.25rem] lg:text-[1.375rem] text-gray-400">
                        <a href={route('folders')}>
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
                            <li key={note.id} className="flex justify-between items-center p-6 lg:p-8 bg-yellow-custom rounded-[1.25rem]">
                                <div className={`border-s-3 px-6 w-full ${note.status === 'pending' ? 'border-s-blue-500' : note.status === 'in_progress' ? 'border-s-yellow-600' : 'border-s-green-500'}`}>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[1.25rem] text-gray-800">{note.title}</p>
                                        <div className="flex items-center justify-between hidden-radio-2">
                                            <RadioGroup className="flex flex-row items-center justify-between w-full" orientation="horizontal" defaultValue={note.status}>
                                                <Chip
                                                    className={`chip-custom hover:bg-blue-500 ${note.status === 'pending' ? 'bg-blue-500' : 'bg-gray-300'}`}
                                                    onClick={() => handleChipClick(note.id, 'pending')}
                                                >
                                                </Chip>
                                                <Chip
                                                    className={`chip-custom hover:bg-yellow-600 ${note.status === 'in_progress' ? 'bg-yellow-600' : 'bg-gray-300'}`}
                                                    onClick={() => handleChipClick(note.id, 'in_progress')}
                                                >
                                                </Chip>
                                                <Chip
                                                    className={`chip-custom hover:bg-green-500 ${note.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}
                                                    onClick={() => handleChipClick(note.id, 'completed')}
                                                >
                                                </Chip>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <p className="text-gray-400">{note.description}</p>
                                    <div className="flex justify-end text-[0.875rem] text-gray-400 font-semibold mt-10">
                                        {note.start_date} - {note.end_date}
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
                onSubmit={handleCreateNote}
            >
                <form className="flex flex-col space-y-3" onSubmit={handleCreateNote}>
                    <Input
                        className="custom-input"
                        type="text"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        className="custom-input"
                        type="text"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <DateRangePicker
                        label="Duration"
                        hideTimeZone
                        visibleMonths={2}
                        defaultValue={{
                            start: parseZonedDateTime(`${currentDate}T00:00[Europe/Warsaw]`),
                            end: parseZonedDateTime(`${currentDate.add({days: 7})}T23:59[Europe/Warsaw]`),
                        }}
                        onChange={(range) => {
                            setStartDate(range.start);
                            setEndDate(range.end);
                        }}
                    />
                    <div className="flex items-center justify-between hidden-radio">
                        <RadioGroup
                            className="flex flex-row items-center justify-between w-full"
                            label="Status"
                            orientation="horizontal"
                            defaultValue="pending"
                            value={status}
                            onChange={setStatus}
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
                                className={`hover:bg-green-500 ${status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`}>
                                <Radio
                                    value="completed"
                                    onChange={() => handleStatusChange('completed')}
                                >
                                    <span className={status === 'completed' ? 'text-white' : 'hover:text-white'}>
                                        Completed
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
