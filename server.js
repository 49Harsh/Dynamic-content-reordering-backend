const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));


const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articles', articleRoutes);

// for itertion of user
const userInteractionRoutes = require('./routes/userInteractionRoutes');
app.use('/api/interactions', userInteractionRoutes);




const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`));
