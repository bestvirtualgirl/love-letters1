const express = require('express');
const connectDb = require('./config/database');

// Delete method override 
const methodOverride = require('method-override');

// Import letter model 

const Letter = require('./models/letters');

const app = express();

connectDb();


// Parse form data

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(methodOverride('_method'));

//  View engine 
app.set('view engine', 'ejs');

// Connect to css
app.use(express.static('public'));






// Routes



app.get('/', (req, res) => {
    res.render('../views/index', { error: null }); 
});


// app.get('/letters', (req, res) => {
//     res.render('letters', { letters: [] }); // Passing an empty array for now
// });

// app.get('/letters', (req,res) => {
//     res.render('letters');
// });



// Post letter 

app.post('/letters', async (req,res) =>{
   try {
    const {recipient, sender, message, design } = req.body;
    await Letter.create({ recipient, sender, message, design });
    res.redirect('/letters');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Route to display letters

app.get('/letters', async (req,res) =>{
    try {
        const letters = await Letter.find().sort({ createdAt: -1 }); 
        // console.log(letters);
        res.render('letters', { letters });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }

});


// Delete test from chatgpt :(

app.delete('/letters/:id', async (req, res) => {
    try {
        const letterId = req.params.id;
        const deletedLetter = await Letter.findByIdAndDelete(letterId);

        if (!deletedLetter) {
            return res.status(404).send('Letter not found');
        }

        res.redirect('/letters'); // Redirect after deletion
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


// Letter.find().then(letters => console.log(letters));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });