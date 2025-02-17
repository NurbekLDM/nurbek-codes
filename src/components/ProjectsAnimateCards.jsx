import React from "react";
import { render } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import move from "lodash-move";

const CardTemplate = ({ imageUrl, title, description }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 w-96 border ">
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{description}</p>
    </div>
  );
};

const CARD_DATA = [
  {
    imageUrl: "https://res.cloudinary.com/dl2adjye7/image/upload/v1714420184/1698251861492_e4wiyn.jpg",
    title: "John Doe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    imageUrl: "https://res.cloudinary.com/dl2adjye7/image/upload/v1714420184/1698251861492_e4wiyn.jpg",
    title: "Jane Smith",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    imageUrl: "https://res.cloudinary.com/dl2adjye7/image/upload/v1716530846/Kazuhiro_Suda2square_lypqty.jpg",
    title: "Alice Johnson",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    imageUrl: "https://res.cloudinary.com/dl2adjye7/image/upload/v1714420184/1698251861492_e4wiyn.jpg",
    title: "Bernard Hashler",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  // Add more card data as needed
];

const CARD_OFFSET = 20; // Adjusted for better visibility
const SCALE_FACTOR = 0.05; // Adjusted for better visibility

const CardStack = () => {
  const [cards, setCards] = React.useState(CARD_DATA);

  const moveToEnd = (from) => {
    setCards((prevCards) => move(prevCards, from, prevCards.length - 1));
  };

  return (
    <div style={wrapperStyle} className="mt-48 relative h-96">
      <ul style={cardWrapStyle}>
        <AnimatePresence>
          {cards.map((card, index) => {
            const canDrag = index === 0;

            return (
              <motion.li
                key={card.title}
                style={{
                  ...cardStyle,
                  cursor: canDrag ? "grab" : "auto",
                }}
                animate={{
                  top: index * -CARD_OFFSET,
                  scale: 1 - index * SCALE_FACTOR,
                  zIndex: cards.length - index,
                }}
                initial={{
                  top: 0,
                  scale: 1,
                  zIndex: cards.length,
                }}
                exit={{
                  top: 0,
                  scale: 1,
                  zIndex: 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag={canDrag ? "y" : false}
                dragConstraints={{
                  top: 0,
                  bottom: 0,
                }}
                onDragEnd={() => moveToEnd(index)}
              >
                <CardTemplate
                  imageUrl={card.imageUrl}
                  title={card.title}
                  description={card.description}
                />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>

  );
};

const wrapperStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30vh",
};

const cardWrapStyle = {
  position: "relative",
  width: "350px",
  height: "220px",
};

const cardStyle = {
  position: "absolute",
  width: "350px",
  height: "220px",
  borderRadius: "8px",
  transformOrigin: "top center",
  listStyle: "none",
};

export default CardStack;
            
            