import React, { useState, useEffect } from "react";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "@/actions/blog.action";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);
    const [isEditBlogOpen, setIsEditBlogOpen] = useState(false);
    const [editBlogData, setEditBlogData] = useState({
        id: "",
        name: "",
        description: "",
        image: null, // File uchun null
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogs = await getBlogs();
                console.log("Fetched Blogs:", blogs.data);
                setBlogs(blogs.data || []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogs([]);
            }
        };
        fetchBlogs();
    }, []);

    const handleAddBlog = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const description = e.target[1].value;
        const image = e.target[2].files[0]; // File inputdan file olish

        try {
            const blog = await addBlog({ name, description, image });
            // `data` null bo'lishi mumkin, shuning uchun tekshiruv qo'shamiz
            const newBlog = blog.data || null;
            if (newBlog && newBlog.id) { // Faqat to'g'ri ma'lumotlarni qo'shamiz
                setBlogs([...blogs, newBlog]);
            } else {
                console.warn("New blog data is null or missing ID, not adding to list");
            }
            setIsAddBlogOpen(false);
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    const handleUpdateBlog = async (e) => {
        e.preventDefault();
        try {
            const updatedBlog = await updateBlog(editBlogData.id, {
                name: editBlogData.name,
                description: editBlogData.description,
                image: editBlogData.image, // File yoki null
            });
            setBlogs(
                blogs.map((blog) => (blog.id === editBlogData.id ? updatedBlog.data : blog))
            );
            setIsEditBlogOpen(false);
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    console.log("data: ", blogs);

    const handleDeleteBlog = async (id) => {
        try {
            console.log("Deleting blog with ID:", id);
            if (!id) {
                throw new Error("Blog ID is undefined");
            }
            const response = await deleteBlog(id);
            console.log("Delete Response:", response);
            setBlogs(blogs.filter((blog) => blog.id !== id));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const openEditModal = (blog) => {
        console.log("Opening edit modal for blog:", blog);
        setEditBlogData({
            id: blog.id, // `id` ga o'zgartirildi
            name: blog.name,
            description: blog.description,
            image: blog.image, // Backenddan qaytgan image (URL yoki file)
        });
        setIsEditBlogOpen(true);
    };

    return (
        <div>
            <section className="bg-transparent w-full rounded-xl  p-3 sm:p-5">
                <div className="mx-auto max-w-xl px-4 lg:px-12">
                    <button
                        onClick={() => setIsAddBlogOpen(true)}
                        className="bg-blue-600 p-2 text-white rounded-xl mb-4"
                    >
                        Add Blog
                    </button>
                    <div className="overflow-x-auto w-full">
                        {blogs.length === 0 ? (
                            <p className="text-gray-500">No blogs available</p>
                        ) : (
                            <div className="flex space-x-4">
                                {blogs
                                    .filter((blog) => blog !== null && blog !== undefined) // `null` qiymatlarini filterlaymiz
                                    .map((blog) => (
                                        <div
                                            key={blog.id}
                                            className="min-w-[300px] bg-white rounded-lg shadow dark:bg-gray-800 p-4"
                                        >
                                            <img
                                                src={blog.image || "https://via.placeholder.com/300x200"} // `null` bo'lsa, placeholder rasm
                                                alt={blog.name || "Blog image"}
                                                className="w-full h-48 object-cover rounded-t-lg mb-2"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/300x200"; // Xatolik bo'lsa, placeholder rasm
                                                }}
                                            />
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {blog.name || "No name"}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                                {blog.description || "No description"}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                Created: {new Date(blog.created_at).toLocaleDateString()}
                                            </p>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openEditModal(blog)}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBlog(blog.id)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Add Blog Modal */}
            {isAddBlogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-5 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Add Blog
                        </h3>
                        <form onSubmit={handleAddBlog}>
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                className="border p-2 w-full mb-2 rounded"
                            />
                            <textarea
                                placeholder="Description"
                                required
                                className="border p-2 w-full mb-2 rounded"
                            />
                            <input
                                type="file" // File input qo‘shildi
                                required
                                className="border p-2 w-full mb-2 rounded"
                            />
                            <button
                                type="submit"
                                className="bg-blue-700 text-white p-2 rounded-lg w-full"
                            >
                                Add
                            </button>
                        </form>
                        <button
                            onClick={() => setIsAddBlogOpen(false)}
                            className="mt-2 text-red-500 w-full text-center"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Blog Modal */}
            {isEditBlogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-5 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Edit Blog
                        </h3>
                        <form onSubmit={handleUpdateBlog}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={editBlogData.name}
                                onChange={(e) => setEditBlogData({ ...editBlogData, name: e.target.value })}
                                required
                                className="border p-2 w-full mb-2 rounded"
                            />
                            <textarea
                                placeholder="Description"
                                value={editBlogData.description}
                                onChange={(e) => setEditBlogData({ ...editBlogData, description: e.target.value })}
                                required
                                className="border p-2 w-full mb-2 rounded"
                            />
                            <input
                                type="file" // File input qo‘shildi
                                onChange={(e) => setEditBlogData({ ...editBlogData, image: e.target.files[0] })}
                                className="border p-2 w-full mb-2 rounded"
                            />
                            <button
                                type="submit"
                                className="bg-blue-700 text-white p-2 rounded-lg w-full"
                            >
                                Update
                            </button>
                        </form>
                        <button
                            onClick={() => setIsEditBlogOpen(false)}
                            className="mt-2 text-red-500 w-full text-center"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}