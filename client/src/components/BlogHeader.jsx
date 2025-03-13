import React from "react";
import { ChevronLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BlogHeader = ({ title,author, date,  className }) => {
  return (
    <div className="mx-2">
    <div className={cn("space-y-6", className)}>
      <Link
        href="/blog"
        className="inline-flex mt-20 items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft size={16} />
        <span>Back to blogs</span>
      </Link>

      <div className="space-y-4 animate-fade-up">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-inter font-bold leading-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User size={14} className="opacity-70" />
            <span>{author}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="opacity-70" />
            <span>{date}</span>
          </div>

          
        </div>
      </div>
    </div>
    </div>
  );
};

export default BlogHeader;
