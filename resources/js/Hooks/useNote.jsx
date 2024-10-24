import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export const useNotes = (notes, folder, currentDate) => {
    const [filteredData, setFilteredData] = useState(notes);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(currentDate.add({ days: 7 }));
    const [status, setStatus] = useState('pending');

    const radioGroupStatusOptions = [
        { value: 'pending', label: '', hoverColor: 'bg-blue-500', activeColor: 'bg-blue-500' },
        { value: 'in_progress', label: '', hoverColor: 'bg-yellow-600', activeColor: 'bg-yellow-600' },
        { value: 'completed', label: '', hoverColor: 'bg-green-500', activeColor: 'bg-green-500' },
    ];

    useEffect(() => {
        setFilteredData(notes);
    }, [notes]);

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
                setTitle('');
                setDescription('');
                setStartDate(currentDate);
                setEndDate(currentDate.add({ days: 7 }));
                setStatus('pending');
            }
        });
    };

    const handleChipClick = (noteId, newStatus) => {
        Inertia.patch(`/notes/${noteId}`, {
            status: newStatus
        });
    };

    const handleDeleteNote = (noteId) => {
        Inertia.delete(`/notes/${noteId}`);
    };

    const handleSelectedStatus = (selectedStatus) => {
        if (selectedStatus === 'All') {
            setFilteredData(notes);
        } else {
            const filtered = notes.filter(note => note.status === selectedStatus.toLowerCase().replace(' ', '_'));
            setFilteredData(filtered);
        }
    };

    return {
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
    };
};
