import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import move from "lodash-move";
import { getProjects } from "@/actions/projects.action";

const CardTemplate = ({ imageUrl, title, description }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 w-96 border">
      <div className="flex items-center">
        <p>{imageUrl}</p>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{title || "No title"}</h2>
        </div>
      </div>
      <p className="mt-4 text-gray-600 line-clamp-3">{description || "No description"}</p>
    </div>
  );
};

const CARD_OFFSET = 20; // Cardlar o‘rtasidagi masofa
const SCALE_FACTOR = 0.05; // Cardlar o‘lchamining kamayishi

const CardStack = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true); // Loading holatini qo'shamiz

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        console.log("Fetched Projects:", response.data);

        // `response.data` ni tekshirib, massivni olish
        let projectData = response.data;
        if (Array.isArray(response.data)) {
          projectData = response.data; // Agar massiv bo'lsa, to'g'ri ishlatamiz
        } else if (response.data && Array.isArray(response.data.data)) {
          projectData = response.data.data; // Agar { data: [...] } bo'lsa, ichki massivni olamiz
        } else {
          projectData = []; // Agar hech qanday massiv bo'lmasa, bo'sh massiv qo'yamiz
        }

        // Faqat to'g'ri ma'lumotlarni filterlaymiz
        const validCards = projectData.filter(
          (card) => card && card.name && card.technologies && card.link
        );
        setCards(validCards);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setCards([]); // Xatolik bo'lsa, bo'sh massiv qo'yamiz
      } finally {
        setLoading(false); // Loading tugadi
      }
    };
    fetchData();
  }, []);

  const moveToEnd = (from) => {
    setCards((prevCards) => move(prevCards, from, prevCards.length - 1));
  };

  if (loading) return <div className="text-center mt-48">Loading...</div>; // Loading holati

  return (
    <div style={wrapperStyle} className="mt-48 relative h-[500px] w-full max-w-4xl mx-auto">
      <ul style={cardWrapStyle}>
        <AnimatePresence>
          {cards.map((card, index) => {
            const canDrag = index === 0;

            return (
              <motion.li
                key={card.name} // Unikal kalit sifatida `name` ishlatamiz
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
                  imageUrl={card.link}
                  title={card.name}
                  description={card.technologies}
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
  width: "100%",
  height: "500px", // Karta stacki uchun balandlik oshirildi
};

const cardWrapStyle = {
  position: "relative",
  width: "400px", // Karta kengligi oshirildi
  height: "300px", // Karta balandligi oshirildi
};

const cardStyle = {
  position: "absolute",
  width: "400px", // Karta kengligi oshirildi
  height: "300px", // Karta balandligi oshirildi
  borderRadius: "12px", // Radius oshirildi
  transformOrigin: "top center",
  listStyle: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Ko‘rinishni yaxshilash
};

export default CardStack;