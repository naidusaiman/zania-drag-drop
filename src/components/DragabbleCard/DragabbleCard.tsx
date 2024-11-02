import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./DragabbleCard.module.css";

interface CardData {
  type: string;
  title: string;
  position: number;
  imagePath: string;
  loading: boolean;
}

const DragabbleCard = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(Date.now());
  const [hasChanges, setHasChanges] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const updatedCards = [...cards];
    const draggedCard = updatedCards.splice(draggedIndex, 1)[0];
    updatedCards.splice(index, 0, draggedCard);

    setCards(updatedCards);
    setHasChanges(true); // Mark changes
    setDraggedIndex(null);
  };

  useEffect(() => {
    const storedCards = localStorage.getItem("cards");

    if (storedCards && storedCards !== "[]") {
      setCards(JSON.parse(storedCards));
    } else {
      // Fetch initial data only if local storage is empty
      fetch("/api/cards")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data: CardData[]) => {
          const imageAppendedData = data.map((item) => ({
            ...item,
            imagePath: `/images/${item.type}.jpg`, // Ensure these image paths are valid
            loading: false,
          }));
          setCards(imageAppendedData);
          localStorage.setItem("cards", JSON.stringify(imageAppendedData));
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

  useEffect(() => {
    const saveData = () => {
      if (!hasChanges) return; // Only save if there are changes

      setIsSaving(true);
      fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cards),
      })
        .then(() => {
          setIsSaving(false);
          setLastSaved(Date.now());
          setHasChanges(false); // Reset changes after saving
        })
        .catch(() => {
          setIsSaving(false);
        });
    };

    const interval = setInterval(() => {
      saveData();
    }, 5000);

    return () => clearInterval(interval);
  }, [cards, hasChanges]);

  return (
    <div style={{ padding: "20px" }}>
      {isSaving && (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}>Saving...</div>
          <div>
            Last saved: {Math.floor((Date.now() - lastSaved) / 1000)} seconds
            ago
          </div>
        </div>
      )}
      <div className={styles["card-container"]}>
        {cards.map((card, index) => (
          <div key={card.imagePath}>
            <Card
              title={card.title}
              image={card.imagePath}
              index={index}
              onDragStart={onDragStart}
              onDrop={onDrop}
              isLoading={card.loading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragabbleCard;
