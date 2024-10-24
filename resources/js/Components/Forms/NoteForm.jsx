import React from 'react';
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/react";
import { parseZonedDateTime } from "@internationalized/date";
import { Radio, RadioGroup, Chip } from "@nextui-org/react";

const NoteForm = ({
                         title, setTitle,
                         description, setDescription,
                         startDate, setStartDate,
                         endDate, setEndDate,
                         status, setStatus,
                         currentDate,
                         handleCreateNote
                     }) => {

    return (
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
                    end: parseZonedDateTime(`${currentDate.add({ days: 7 })}T23:59[Europe/Warsaw]`)
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
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value)
                    }}
                >
                    <Chip
                        className={`hover:bg-blue-500 ${status === 'pending' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    >
                        <Radio value="pending">
                            <span className={status === 'pending' ? 'text-white' : 'hover:text-white'}>
                                Pending
                            </span>
                        </Radio>
                    </Chip>
                    <Chip
                        className={`hover:bg-yellow-600 ${status === 'in_progress' ? 'bg-yellow-600' : 'bg-gray-200'}`}
                    >
                        <Radio value="in_progress">
                            <span className={status === 'in_progress' ? 'text-white' : 'hover:text-white'}>
                                In Progress
                            </span>
                        </Radio>
                    </Chip>
                    <Chip
                        className={`hover:bg-green-500 ${status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                        <Radio value="completed">
                            <span className={status === 'completed' ? 'text-white' : 'hover:text-white'}>
                                Completed
                            </span>
                        </Radio>
                    </Chip>
                </RadioGroup>
            </div>
        </form>
    );
};

export default NoteForm;
