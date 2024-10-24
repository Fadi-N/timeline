import React from 'react';
import { RadioGroup } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';

const RadioGroupWrapper = ({ options, selectedValue, onChange }) => {
    return (
        <RadioGroup
            className="flex flex-row items-center justify-between w-full"
            orientation="horizontal"
            defaultValue={selectedValue}
        >
            {options.map((option) => (
                <Chip
                    key={option.value}
                    className={`chip-custom hover:${option.hoverColor} ${
                        selectedValue === option.value ? option.activeColor : 'bg-gray-300'
                    }`}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </Chip>
            ))}
        </RadioGroup>
    );
};

export default RadioGroupWrapper;
