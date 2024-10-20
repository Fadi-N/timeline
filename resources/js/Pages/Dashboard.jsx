import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import {Button} from "@nextui-org/button";
import {BsFolderPlus} from "react-icons/bs";
import {Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {FaAngleRight} from "react-icons/fa6";
import {useState} from "react";
import ModalWrapper from "@/Components/ModalWrapper.jsx";

export default function Dashboard({auth, folders}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [newFolderName, setNewFolderName] = useState('');

    const handleCreateFolder = (e) => {
        e.preventDefault();

        Inertia.post('/folders', {
            name: newFolderName
        }, {
            onSuccess: () => {
                onOpenChange(false);
                setNewFolderName('');
            }
        })
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard"/>

            <div className="container mx-auto px-4 bg-white min-h-[calc(100vh-65px)]">
                <div className="flex items-center justify-between py-4">
                    <div className="ps-4 text-[1.25rem] lg:text-[1.375rem] text-gray-400">
                        Folders
                    </div>
                    <Button
                        variant="light"
                        startContent={<BsFolderPlus/>}
                        size={"sm"}
                        onPress={onOpen}
                    >
                        New Folder
                    </Button>
                </div>
                <Divider/>
                <div className="p-4">
                    <ul className="flex flex-col space-y-3">
                        {folders?.map(folder => (
                            <li key={folder.id}
                                className="flex justify-between items-center p-6 lg:p-8 bg-yellow-custom rounded-[1.25rem]">
                                <div>
                                    <p className="text-[1.25rem] text-gray-800">{folder.name}</p>
                                    <p className="text-gray-400">Last modification: </p>
                                </div>
                                <div className="flex items-center justify-center bg-gray-800 rounded-full w-12 h-12">
                                    <FaAngleRight
                                        className="text-white w-4 h-4"

                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <ModalWrapper
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title="New Folder"
                submitButtonText="Create Folder"
                onSubmit={handleCreateFolder}
            >
                <form onSubmit={handleCreateFolder}>
                    <Input
                        className="custom-input"
                        type="text"
                        label="Folder Name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                    />
                </form>
            </ModalWrapper>
        </AuthenticatedLayout>
    );
}
