import React, {useState, useRef, useEffect} from 'react';
import {Head} from "@inertiajs/react";
import {Button} from "@nextui-org/button";
import {BsFileEarmarkPlus, BsFilter, BsPencilSquare} from "react-icons/bs";
import {
    Chip,
    DateRangePicker,
    Divider,
    Dropdown, DropdownItem, DropdownMenu, DropdownSection,
    DropdownTrigger,
    Radio,
    RadioGroup,
    useDisclosure
} from "@nextui-org/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Input} from "@nextui-org/input";
import ModalWrapper from "@/Components/ModalWrapper.jsx";
import {getLocalTimeZone, parseZonedDateTime, today} from "@internationalized/date";
import {Inertia} from "@inertiajs/inertia";
import {FaRegTrashCan} from "react-icons/fa6";
import {useDraggable} from "@/Hooks/useDraggable.jsx";

const Notes = ({auth, folder, notes}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { offsets, handleMouseDown, setOffsets } = useDraggable({});

    const currentDate = today(getLocalTimeZone("Europe/Warsaw"));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(currentDate.add({days: 7}));
    const [status, setStatus] = useState('pending');

    const [filteredData, setFilteredData] = useState(notes)

    useEffect(() => {
        const initialOffsets = {};
        notes.forEach(note => {
            initialOffsets[note.id] = '';
        });
        setOffsets(initialOffsets);
    }, [notes]); // Depend on folders

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

    const handleDeleteNote = (noteId) => {
        Inertia.delete(`/notes/${noteId}`, {
            onSuccess: () => {
                console.log('Note deleted successfully');
            },
            onError: (error) => {
                console.error('Error deleting note:', error);
            }
        });
    };

    const handleSelectedStatus = (e) => {
        const selectedStatus = e.target.value;
        if (selectedStatus === "All") {
            setFilteredData(notes);
        } else {
            const filtered = notes.filter(note => note.status === selectedStatus.toLowerCase());
            setFilteredData(filtered);
        }
    };


    console.log(filteredData)

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
                        <Dropdown
                            showArrow
                            radius="sm"
                            classNames={{
                                base: "before:bg-default-200",
                                content: "p-0 border-small border-divider bg-background",
                            }}
                        >
                            <DropdownTrigger>
                                <Button
                                    className="mx-4"
                                    variant="light"
                                    startContent={<BsFilter className="w-4 h-4"/>}
                                    size={"sm"}
                                >
                                    Filters
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Custom item styles"
                                className="p-3"
                                itemClasses={{
                                    base: [
                                        "rounded-md",
                                        "text-default-500",
                                        "transition-opacity",
                                        "data-[hover=true]:text-foreground",
                                        "data-[hover=true]:bg-default-100",
                                        "dark:data-[hover=true]:bg-default-50",
                                        "data-[selectable=true]:focus:bg-default-50",
                                        "data-[pressed=true]:opacity-70",
                                        "data-[focus-visible=true]:ring-default-500",
                                    ],
                                }}
                            >
                                <DropdownSection aria-label="Preferences">
                                    <DropdownItem
                                        isReadOnly
                                        key="theme"
                                        className="cursor-default space-x-4"
                                        endContent={
                                            <select
                                                className="z-10 outline-none w-32 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                                                id="status"
                                                name="status"
                                                onChange={handleSelectedStatus}
                                            >
                                                {["All", "Pending", "In Progress", "Completed"].map((status) => (
                                                    <option>{status}</option>
                                                ))}
                                            </select>
                                        }
                                    >
                                        Status
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <Divider/>
                <div className="p-4">
                    <ul className="flex flex-col space-y-3">
                        {filteredData?.map(note => (
                            <div className="flex relative">
                                <li
                                    key={note.id}
                                    className={`note-item flex flex-1 relative z-10 justify-between items-center p-6 lg:p-8 bg-yellow-custom ${offsets[note.id] === '' ? 'rounded-[1.25rem]' : 'rounded-s-[1.25rem] rounded-e-none '}`}
                                    style={{transform: `translateX(0px)`}}
                                    onMouseDown={(e) => handleMouseDown(note.id, e)}
                                >
                                    <div
                                        className={`border-s-3 px-6 w-full ${note.status === 'pending' ? 'border-s-blue-500' : note.status === 'in_progress' ? 'border-s-yellow-600' : 'border-s-green-500'}`}>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[1.25rem] text-gray-800">{note.title}</p>
                                            <div className="flex items-center justify-between hidden-radio-2">
                                                <RadioGroup
                                                    className="flex flex-row items-center justify-between w-full"
                                                    orientation="horizontal" defaultValue={note.status}>
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
                                    onChange={() => setStatus('pending')}
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
                                    onChange={() => setStatus('in_progress')}
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
                                    onChange={() => setStatus('completed')}
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
