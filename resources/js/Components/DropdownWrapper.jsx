import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { BsFilter } from 'react-icons/bs';

const DropdownWrapper = ({ label, icon, options, onChange, defaultValue }) => {
    return (
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
                    startContent={icon || <BsFilter className="w-4 h-4"/>}
                    size={"sm"}
                >
                    {label}
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
                                defaultValue={defaultValue}
                                onChange={onChange}
                            >
                                {options.map((status) => (
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
    );
};

export default DropdownWrapper;
