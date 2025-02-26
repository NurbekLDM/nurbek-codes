const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Blog yozuvlarni olish (GET)
router.get('/blogs', async (req, res) => {
    try {
        const { data: blogPosts, error } = await supabase
            .from('blog')
            .select('*');

        if (error) {
            console.log('Database error:', error);
            return res.status(500).json({ message: 'Error fetching blog posts' });
        }

        res.status(200).json(blogPosts);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Blog yozuv qo'shish (POST)
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Fayl nomi va buffer
        const fileName = `${Date.now()}-${req.file.originalname}`;
        const { data, error } = await supabase.storage
            .from("blog_images") // BUCKET NOMI
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
            });

        if (error) {
            console.error("Error uploading image:", error);
            return res.status(500).json({ message: "Image upload failed" });
        }

        // Rasmning URL'sini olish
        const { data: publicUrl } = supabase.storage.from("blog_images").getPublicUrl(fileName);

        // Ma'lumotlar bazasiga saqlash
        const { data: blogPost, error: dbError } = await supabase
            .from('blog')
            .insert([{ name, description, image: publicUrl.publicUrl }])
            .single();

        if (dbError) {
            console.log('Database insert error:', dbError);
            return res.status(500).json({ message: 'Error inserting blog post' });
        }

        res.status(201).json({message: 'Blog post added successfully'},blogPost);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Blog yozuvni yangilash (PUT)
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        let updateData = { name, description };

        if (req.file) {
            // Fayl nomi va buffer
            const fileName = `${Date.now()}-${req.file.originalname}`;
            const { data, error } = await supabase.storage
                .from("blog_images") // BUCKET NOMI
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                });

            if (error) {
                console.error("Error uploading image:", error);
                return res.status(500).json({ message: "Image upload failed" });
            }

            // Rasmning URL'sini olish
            const { data: publicUrl } = supabase.storage.from("blog_images").getPublicUrl(fileName);
            updateData.image = publicUrl.publicUrl;
        }

        // Ma'lumotlar bazasini yangilash
        const { data: blogPost, error: dbError } = await supabase
            .from('blog')
            .update(updateData)
            .eq('id', id)
            .single();

        if (dbError) {
            console.log('Database update error:', dbError);
            return res.status(500).json({ message: 'Error updating blog post' });
        }

        res.status(201).json({message: 'Blog post edited successfully'},blogPost);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Blog yozuvni o'chirish (DELETE)
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Ma'lumotlar bazasidan o'chirish
        const { data, error } = await supabase
            .from('blog')
            .delete()
            .eq('id', id);

        if (error) {
            console.log('Database delete error:', error);
            return res.status(500).json({ message: 'Error deleting blog post' });
        }

        res.status(200).json({ message: 'Blog post deleted successfully', data });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;