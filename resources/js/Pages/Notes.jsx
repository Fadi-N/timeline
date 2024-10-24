import React, {useState, useRef, useEffect} from 'react';
import {Head} from "@inertiajs/react";
import {Button} from "@nextui-org/button";
import {BsFileEarmarkPlus, BsFilter, BsPencilSquare} from "react-icons/bs";
import {Divider, useDisclosure} from "@nextui-org/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ModalWrapper from "@/Components/Wrappers/ModalWrapper.jsx";
import {getLocalTimeZone, today} from "@internationalized/date";
import {FaRegTrashCan} from "react-icons/fa6";
import {useDraggable} from "@/Hooks/useDraggable.jsx";
import DropdownWrapper from "@/Components/Wrappers/DropdownWrapper.jsx";
import RadioGroupWrapper from "@/Components/Wrappers/RadioGroupWrapper.jsx";
import NewNoteForm from "@/Components/Forms/NewNoteForm.jsx";
import {useNotes} from "@/Hooks/useNote.jsx";

const Notes = ({auth, folder, notes}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { offsets, handleMouseDown, setOffsets } = useDraggable({});

    const currentDate = today(getLocalTimeZone("Europe/Warsaw"));

    const {
        title, setTitle,
        description, setDescription,
        startDate, setStartDate,
        endDate, setEndDate,
        status, setStatus,
        filteredData, radioGroupStatusOptions,
        handleCreateNote,
        handleChipClick,
        handleDeleteNote,
        handleSelectedStatus
    } = useNotes(notes, folder, currentDate);

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
                    <div className="flex">
                        <Button
                            className="mx-4"
                            variant="light"
                            startContent={<BsFileEarmarkPlus className="w-4 h-4"/>}
                            size={"sm"}
                            onClick={onOpen}
                        >
                            New Note
                        </Button>
                        <Divider
                            className="h-auto"
                            orientation="vertical"
                        />
                        <DropdownWrapper
                            label="Filters"
                            options={["All", "Pending", "In Progress", "Completed"]}
                            onChange={handleSelectedStatus}
                            defaultValue="All"
                        />
                    </div>
                </div>
                <Divider/>
                <div className="p-4">
                    <ul className="flex flex-col space-y-3">
                        {filteredData?.map(note => (
                            <div className="flex relative">
                                <li
                                    key={note.id}
                                    className={`note-item flex flex-1 relative z-10 justify-between items-center p-6 lg:p-8 bg-yellow-custom ${offsets[note.id] === '' || offsets[note.id] === undefined ? 'rounded-[1.25rem]' : 'rounded-s-[1.25rem] rounded-e-none '}`}
                                    style={{transform: `translateX(0px)`}}
                                    onMouseDown={(e) => handleMouseDown(note.id, e)}
                                >
                                    <div
                                        className={`border-s-3 px-6 w-full ${note.status === 'pending' ? 'border-s-blue-500' : note.status === 'in_progress' ? 'border-s-yellow-600' : 'border-s-green-500'}`}>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[1.25rem] text-gray-800">{note.title}</p>
                                            <div className="flex items-center justify-between hidden-radio-2">
                                                <RadioGroupWrapper
                                                    options={radioGroupStatusOptions}
                                                    selectedValue={note.status}
                                                    onChange={(newStatus) => handleChipClick(note.id, newStatus)}
                                                />
                                            </div>
                                        </div>
                                        <p className="text-gray-400">{note.description}</p>
                                        <div
                                            className="flex justify-end text-[0.875rem] text-gray-400 font-semibold mt-10">
                                            {note.start_date} - {note.end_date}
                                        </div>
                                    </div>
                                </li>
                                <div>
                                    <Button
                                        className="edit-button h-[179px] end-0 z-0 min-w-0 rounded-none px-0 w-0"
                                        color="secondary"
                                        onClick={() => handleDeleteNote(note.id)}
                                        style={{
                                            width: `${-offsets[note.id]}px`,
                                        }}
                                    >
                                        <BsPencilSquare className="w-4 h-4"/>
                                    </Button>
                                    <Button
                                        className="delete-button h-[179px] end-0 z-0 min-w-0 rounded-s-none rounded-e-[1.25rem] px-0 w-0"
                                        color="danger"
                                        onClick={() => handleDeleteNote(note.id)}
                                        style={{
                                            width: `${-offsets[note.id]}px`,
                                        }}
                                    >
                                        <FaRegTrashCan className="w-4 h-4"/>
                                    </Button>
                                </div>
                            </div>
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
                <NewNoteForm
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    status={status}
                    setStatus={setStatus}
                    currentDate={currentDate}
                    handleCreateNote={handleCreateNote}
                />
            </ModalWrapper>
        </AuthenticatedLayout>
    );
};

export default Notes;
