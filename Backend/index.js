const connectToDB = require('./dbConnect');
const express = require('express');
const cors = require('cors');
connectToDB();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/quiz',require('./routes/quiz'));
app.use('/api/getdata',require('./routes/getdata'));


app.listen(port,()=>{
    console.log(`My Quiz game is running on http://localhost:${port}`);
});
