import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const BlogImage = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("image-wrapper md:mx-0 mx-1 rounded-2xl overflow-hidden", className)}>
      <div 
        className={cn(
          "w-full h-full bg-muted/50 animate-pulse",
          { "hidden": !isLoading }
        )} 
        style={{ aspectRatio: "16/9" }} 
      />
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full object-cover transition-opacity",
          { "opacity-0": isLoading, "opacity-100 animate-fade-in": !isLoading }
        )}
        style={{ aspectRatio: "16/9" }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default BlogImage;
