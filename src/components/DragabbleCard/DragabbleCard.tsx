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
    setDraggedIndex(null);
  };

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: CardData[]) => {
        const imageAppendedData = data.map((item) => ({
          ...item,
          imagePath: `/images/${item.type}.jpg`,
          loading: true, // Set loading to true initially
        }));

        // Simulate loading for 5 seconds
        setCards(imageAppendedData);
        imageAppendedData.forEach((_, index) => {
          setTimeout(() => {
            setCards((prevCards) => {
              const newCards = [...prevCards];
              newCards[index].loading = false;
              return newCards;
            });
          }, 3000);
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
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
