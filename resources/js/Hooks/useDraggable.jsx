import {useState} from "react";

export const useDraggable = (initialOffsets = {}) =>{
    const [offsets, setOffsets] = useState(initialOffsets);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (itemId, e) => {
        setIsDragging(true);
        const startX = e.clientX || e.touches?.[0]?.clientX;
        let dx = 0;

        const handleMouseMove = (e) => {
            const currentX = e.clientX || e.touches?.[0]?.clientX;
            dx = currentX - startX; // Calculate the distance moved
            const newOffset = Math.min(0, Math.max(-100, (offsets[itemId] || 0) + dx));
            setOffsets((prevOffsets) => ({
                ...prevOffsets,
                [itemId]: newOffset
            }));
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            const newOffset = Math.min(0, Math.max(-100, (offsets[itemId] || 0) + dx));
            setOffsets((prevOffsets) => ({
                ...prevOffsets,
                [itemId]: newOffset === 0 ? "" : newOffset
            }));

            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return {
        offsets,
        isDragging,
        handleMouseDown,
        setOffsets
    };
}
