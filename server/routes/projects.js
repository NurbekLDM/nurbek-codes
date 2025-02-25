const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');


router.post('/add', async (req, res) => {
    const {name , link} = req.body;
    const {data,error} = await supabase
    .from('projects')
    .insert([{name, link}]);

    if (error) {
        return res.status(400).json({error: error.message});
    } else{
        res.status(200).json({ message: 'Project added successfully', data });
    }
})

router.put('/update/:id', async (req, res) => {
    const {name, link} = req.body;
    const {id} = req.params;
    const {data, error} = await supabase
    .from('projects')
    .update({name, link})
    .eq('id', id);

    if (error) {
        return res.status(400).json({error: error.message});
    } else{
        res.status(200).json({ message: 'Project updated successfully', data });
    }
})

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    const {data, error} = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

    if (error) {
        return res.status(400).json({error: error.message});
    } else{
        res.status(200).json({ message: 'Project deleted successfully', data });
    }
})

router.get('/all', async (req, res) => {
    const {data, error} = await supabase
    .from('projects')
    .select('*');

    if (error) {
        return res.status(400).json({error: error.message});
    } else{
        res.status(200).json({ message: 'All projects', data });
    }
})

module.exports = router;