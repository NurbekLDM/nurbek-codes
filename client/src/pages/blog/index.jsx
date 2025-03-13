import React, { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { getBlogs } from "@/actions/blog.action";
import Head from "next/head";
import Link from "next/link";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogs();
        console.log("Fetched Blogs:", response.data);

        // API javobining to'g'ri formatini tekshirish
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid blog data format");
        }

        // Har bir blogning image URL sini tekshirish
        const validBlogs = response.data.map((blog) => ({
          ...blog,
          image: blog.image || "https://via.placeholder.com/300",
        }));

        setBlogs(validBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message || "An error occurred while fetching blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center sm:pb-0 pb-60  items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      <Head>
        <title>Blog</title>
        <meta name="description" content="This is the blog page" />
        <meta name="keywords" content="blog, blogs, articles, posts" />
        <meta name="author" content="Nurbek" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="container h-full sm:mt-32 px-4 sm:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} data={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ data }) => {
  const formattedDate = format(new Date(data.created_at), "dd MMM, yyyy HH:mm");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-md transition-all duration-300 hover:shadow-xl">
      {/* Card Image */}
      <div className="relative h-48 w-full">
        <Image
          src={data.image} // Supabase Storage URL si
          alt="img"
          loading="lazy"
          fill
          className="object-center object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={true}
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">
            {data.name || "Unnamed Blog"}
          </h2>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>

        <p className="text-gray-600 line-clamp-3 mb-4">
          {data.description || "No description available"}
        </p>

        <Link href={`/blog/${data.id}`}>Read more</Link>
      </div>
    </div>
  );
};

export default Blog;
