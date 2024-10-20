import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/button";

const ModalWrapper = ({
                          isOpen,
                          onOpenChange,
                          title = "Modal Title",
                          children,
                          onSubmit,
                          submitButtonText = "Create"
                      }) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <Divider className="mb-4"/>

                        <ModalBody>
                            {children}
                        </ModalBody>

                        <Divider className="mt-4"/>

                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                color="default"
                                onClick={onSubmit}
                            >
                                {submitButtonText}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default ModalWrapper;
