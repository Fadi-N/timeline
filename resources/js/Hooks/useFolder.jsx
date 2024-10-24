// hooks/useFolder.js

import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export const useFolder = (folders) => {
    const [newFolderName, setNewFolderName] = useState('');
    const [editFolderId, setEditFolderId] = useState(null);
    const [offsets, setOffsets] = useState({});

    useEffect(() => {
        const initialOffsets = {};
        folders.forEach(folder => {
            initialOffsets[folder.id] = '';
        });
        setOffsets(initialOffsets);
    }, [folders]); // Depend on folders

    const handleCreateFolder = (e) => {
        e.preventDefault();
        Inertia.post('/folders', { name: newFolderName }, {
            onSuccess: () => {
                setNewFolderName('');
            }
        });
    };

    const handleEditFolder = (folderId) => {
        const folderToEdit = folders.find(folder => folder.id === folderId);
        setNewFolderName(folderToEdit.name);
        setEditFolderId(folderId);
    };

    const goToNotes = (folderId) => {
        Inertia.get(`/folder/notes?id=${folderId}`);
    };

    const handleDeleteFolder = (folderId) => {
        Inertia.delete(`/folders/${folderId}`, {
            onSuccess: () => {
                console.log('Folder deleted successfully');
            },
            onError: (error) => {
                console.error('Error deleting folder:', error);
            }
        });
    };

    const handleUpdateFolder = (e) => {
        e.preventDefault();
        Inertia.patch(`/folders/${editFolderId}`, { name: newFolderName }, {
            onSuccess: () => {
                setNewFolderName('');
                setEditFolderId(null);
            }
        });
    };

    return {
        newFolderName,
        setNewFolderName,
        editFolderId,
        setEditFolderId,
        offsets,
        handleCreateFolder,
        handleEditFolder,
        goToNotes,
        handleDeleteFolder,
        handleUpdateFolder,
    };
};
