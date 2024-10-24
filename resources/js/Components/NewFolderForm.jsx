import React from 'react';
import {Input} from "@nextui-org/input";

const NewFolderForm = ({value, onChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input
                className="custom-input"
                type="text"
                label="Folder Name"
                value={value}
                onChange={onChange}
            />
        </form>
    );
};

export default NewFolderForm;
