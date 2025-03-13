import React, { useState , useEffect } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { likeBlog, unlikeBlog } from "@/actions/blog.action";

const LikeButton = ({ initialLikes = 0, blogId, className }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

useEffect(() => {
  const isLiked = localStorage.getItem(blogId);
  if (isLiked) {
    setLiked(true);
  } else {
    setLiked(false);
  }
}), [];
  
  const handleLike = async () => {
    try {
      if (!liked) {
        await likeBlog(blogId);
        setLikes(likes + 1);
        localStorage.setItem(blogId, "liked");
        setLiked(true);
        setIsAnimating(true);
      } else {
        await unlikeBlog(blogId);
        localStorage.removeItem(blogId);
        setLikes(likes - 1);
        setLiked(false);
      }
    } catch (error) {
      toast("Error updating likes");
    }
  };

  return (
    <button
      onClick={handleLike}
      className={cn(
        "like-button flex items-center gap-2 px-4 py-2 rounded-full transition-all",
        "bg-background border hover:bg-secondary/50",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      aria-label={liked ? "Unlike this article" : "Like this article"}
    >
      <Heart
        className={cn("transition-all duration-300", {
          "text-red-500 fill-red-500": liked,
          "text-foreground/70": !liked,
          "animate-pulse-gentle": isAnimating,
        })}
        size={20}
        onAnimationEnd={() => setIsAnimating(false)}
      />
      <span className="font-medium">{likes}</span>
    </button>
  );
};

export default LikeButton;
