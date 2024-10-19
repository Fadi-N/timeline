import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {Button} from "@nextui-org/button";
import {BsFolderPlus} from "react-icons/bs";
import {Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/input";

export default function Dashboard({auth}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <AuthenticatedLayout
            user={auth.user}
            /*header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}*/
        >
            <Head title="Dashboard"/>

            <div className="container mx-auto px-4 bg-white min-h-[calc(100vh-64px)]">
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
                <Divider />
                <div className="p-4">
                    LIST ALL FOLDERS
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>New Folder</ModalHeader>
                            <Divider className="mb-4" />
                            <ModalBody>
                                <Input type="text" label="Folder" />
                            </ModalBody>
                            <Divider className="mt-4" />
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="default"
                                    onPress={onClose}
                                >
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </AuthenticatedLayout>
    );
}
