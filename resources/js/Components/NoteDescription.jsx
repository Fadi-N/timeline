import React, { useState } from 'react';
import {Button} from "@nextui-org/button";

const NoteDescription = ({ description, maxLength = 100 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const isLongDescription = description.length > maxLength;

    const displayText = isExpanded || !isLongDescription
        ? description
        : description.slice(0, maxLength) + '...';

    return (
        <div>
            <p className="text-gray-500">
                {displayText}
                {description.length > maxLength && (
                    <Button
                        onClick={toggleReadMore}
                        className="bg-black text-white ms-4 rounded-full"
                        size="sm"
                    >
                        {isExpanded ? ' Show Less' : 'Read More'}
                    </Button>
                )}
            </p>
        </div>
    );
};
export default NoteDescription
