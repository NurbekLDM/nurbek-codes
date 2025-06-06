import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getBlog } from "@/actions/blog.action";
import BlogHeader from "@/components/BlogHeader";
import BlogImage from "@/components/BlogImage";
import LikeButton from "@/components/LikeButton";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NextSeo } from "next-seo";

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await getBlog(id);
        setPost(fetchedBlog);
      } catch (error) {
        toast({ description: "Error fetching blog data" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post?.name,
          text: "Check out this interesting article!",
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div>
      {/* SEO meta teglar */}
      <NextSeo
        title={post?.name || "Blog Detail"}
        description={post?.description?.slice(0, 150) || "Nurbek Blog"}
        canonical={`https://nurbek.codes/blog/${post?.id}`}
        openGraph={{
          type: "article",
          url: `https://nurbek.codes/blog/${post?.id}`,
          title: post?.name,
          description: post?.description?.slice(0, 150),
          images: [
            {
              url: post?.image || "https://nurbek.codes/default-image.jpg",
              alt: post?.name || "Blog Image",
            },
          ],
          site_name: "Nurbek Blog",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@nurbek_codes",
          title: post?.name,
          description: post?.description?.slice(0, 150),
          image: post?.image,
        }}
      />

      <div className="h-screen sm:flex sm:justify-center sm:pb-12 pb-20 overflow-y-auto bg-background">
        {isLoading ? (
          <div className="container max-w-3xl py-10 space-y-8">
            <div className="h-8 w-32 rounded-md bg-muted animate-shimmer"></div>
            <div className="h-16 w-full rounded-md bg-muted animate-shimmer"></div>
            <div className="h-8 w-64 rounded-md bg-muted animate-shimmer"></div>
            <div className="h-[400px] w-full rounded-2xl bg-muted animate-shimmer"></div>
          </div>
        ) : (
          post && (
            <article className="container max-w-3xl py-10 space-y-8">
              <BlogHeader
                title={post.name}
                author="Nurbek Aliqo'ziyev"
                date={new Date(post.created_at).toLocaleString("uz-UZ")}
              />
              <BlogImage
                src={post.image}
                alt={post.name}
                className="my-6 rounded-2xl shadow-sm"
              />
              <div
                className="blog-content md:mx-0 prose prose-lg font-lora dark:prose-invert mx-3 text-left animate-fade-up"
                style={{ animationDelay: "0.2s" }}
                dangerouslySetInnerHTML={{
                  __html: post.description.replace(
                    /(https?:\/\/[^\s]+)/g,
                    `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>`
                  ),
                }}
              />
              <div
                className="flex flex-wrap pb-12 justify-between items-center gap-4 pt-6 border-t animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                <LikeButton initialLikes={post.likes || 0} blogId={post.id} />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareClick}
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                    aria-label="Share this article"
                  >
                    <Share2 size={20} className="text-foreground/70" />
                  </button>
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
