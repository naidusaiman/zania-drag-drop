import React, { useState } from "react";
import styles from "./Card.module.css";
import Overlay from "../Overlay/Overlay";
import Spinner from "../Spinner/Spinner";

interface CardProps {
  title: string;
  image: string;
  index: number;
  isLoading: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  index,
  isLoading,
  onDragStart,
  onDrop,
}) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isDragging) {
      setIsOverlayOpen(true);
    }
    e.stopPropagation(); // Prevent click from propagating
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    onDragStart(e, index);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <div
      draggable
      className={styles.card}
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={handleDragEnd} // Reset dragging state
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <p>{title}</p>
          <img
            src={image}
            alt={title}
            onClick={handleImageClick} // Handle image click
            style={{ cursor: "pointer" }} // Change cursor style for better UX
          />
        </>
      )}

      {isOverlayOpen && <Overlay image={image} onClose={handleCloseOverlay} />}
    </div>
  );
};

export default Card;
