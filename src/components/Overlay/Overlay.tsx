import React, { useEffect } from "react";
import styles from "./Overlay.module.css";

interface OverlayProps {
  image: string;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ image, onClose }) => {
  // Handle keydown events to close the overlay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <img src={image} alt="Overlay" className={styles.image} />
    </div>
  );
};

export default Overlay;
