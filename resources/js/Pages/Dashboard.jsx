import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {Button} from "@nextui-org/button";
import {BsFolderPlus} from "react-icons/bs";
import {Divider, useDisclosure} from "@nextui-org/react";
import {FaAngleRight, FaRegTrashCan} from "react-icons/fa6";
import {useEffect} from "react";
import {FaPencilAlt} from "react-icons/fa";
import ModalWrapper from "@/Components/Wrappers/ModalWrapper.jsx";
import {useDraggable} from "@/Hooks/useDraggable.jsx";
import FolderForm from "@/Components/Forms/FolderForm.jsx";
import { useFolder } from "@/Hooks/useFolder";

export default function Dashboard({auth, folders}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { offsets, handleMouseDown, setOffsets } = useDraggable({});

    const {
        newFolderName,
        setNewFolderName,
        editFolderId,
        setEditFolderId,
        handleCreateFolder,
        handleEditFolder,
        goToNotes,
        handleDeleteFolder,
        handleUpdateFolder,
    } = useFolder(folders, onOpen);

    useEffect(() => {
        const initialOffsets = {};
        folders.forEach(folder => {
            initialOffsets[folder.id] = '';
        });
        setOffsets(initialOffsets);
    }, [folders]); // Depend on folders

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard"/>

            <div className="container mx-auto px-4 bg-white min-h-[calc(100vh-65px)]">
                <div className="flex items-center justify-between py-4">
                    <div className="ps-4 text-[1.25rem] lg:text-[1.375rem] text-gray-400">Folders</div>
                    <div className="toolbar">
                        <Button
                            className="mx-4"
                            variant="light"
                            startContent={<BsFolderPlus className="w-4 h-4"/>}
                            size={"sm"}
                            onClick={onOpen}
                        >
                            New Folder
                        </Button>
                    </div>
                </div>
                <Divider/>
                <div className="listing mt-4 p-4 h-[calc(100vh-147px)] overflow-y-auto">
                    <ul className="flex flex-col space-y-3">
                        {folders?.map(folder => (
                            <div className="flex relative" key={folder.id}>
                                <li
                                    className={`flex flex-1 relative z-10 justify-between items-center p-6 lg:p-8 bg-yellow-custom ${offsets[folder.id] === '' ? 'rounded-[1.25rem]' : 'rounded-s-[1.25rem] rounded-e-none'}`}
                                    style={{transform: `translateX(0px)`}}
                                    onMouseDown={(e) => handleMouseDown(folder.id, e)}
                                >
                                    <div>
                                        <p className="text-[1.5rem] text-gray-800">{folder.name}</p>
                                        <p className="text-gray-400">Last modification: {folder['last_note_updated_at'] ? folder['last_note_updated_at'] : 'Never'}</p>
                                    </div>
                                    <div
                                        className="go-to-notes-btn flex items-center justify-center bg-gray-800 rounded-full w-12 h-12 hover:cursor-pointer"
                                        onClick={() => goToNotes(folder.id)}>
                                        <FaAngleRight className="text-white w-4 h-4"/>
                                    </div>
                                </li>
                                <div>
                                    <Button
                                        className="edit-button h-full end-0 z-0 min-w-0 rounded-none px-0 w-0"
                                        color="secondary"
                                        onClick={() => handleEditFolder(folder.id)}
                                        style={{
                                            width: `${-offsets[folder.id]}px`,
                                        }}
                                    >
                                        <FaPencilAlt className="w-4 h-4"/>
                                    </Button>
                                    <Button
                                        className="delete-button h-full end-0 z-0 min-w-0 rounded-s-none rounded-e-[1.25rem] px-0 w-0"
                                        color="danger"
                                        onClick={() => handleDeleteFolder(folder.id)}
                                        style={{
                                            width: `${-offsets[folder.id]}px`,
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
                title={editFolderId ? "Edit Folder" : "New Folder"}
                submitButtonText={editFolderId ? "Update Folder" : "Create Folder"}
                onSubmit={editFolderId ? handleUpdateFolder : handleCreateFolder}
            >
                <FolderForm
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onSubmit={editFolderId ? handleUpdateFolder : handleCreateFolder}
                />
            </ModalWrapper>
        </AuthenticatedLayout>
    );
}
