const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const { stringify } = require("querystring");
mongoose.connect('mongodb://localhost/shubhgym', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 800;

//mongoose schema

const formSchema = new mongoose.Schema({
    name: String,
    Address: String,
    email: String,
    phone: String
  });

  const contactusSchema = new mongoose.Schema({
    contactusemail: String,
    comment: String
  });

  const form = mongoose.model('form', formSchema);
  const contactform = mongoose.model('contactform', contactusSchema);

// EXPRESS SPECIFIC STUFF

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

 app.get('/', (req, res)=>{
    
    res.status(200).render('main.pug');
})

app.get('/main.html', (req, res)=>{
    
    res.status(200).render('main.pug');
})

app.get('/contactus.html', (req, res)=>{
    
    res.status(200).render('contactus.pug');
})

app.get('/aboutus.html', (req, res)=>{
    
    res.status(200).render('aboutus.pug');
})

app.post('/main.html', (req, res)=>{
    var myData = new form(req.body);
    myData.save().then(()=>{
        res.send("you are registered succesfully")
    }).catch(()=>{
        res.status(400).send("please try again after some time or contact us")
    });
    res.status(200).render('aboutus.pug');
})

app.post('/contactus.html', (req, res)=>{
    var contactData = new contactform(req.body);
    contactData.save().then(()=>{
        res.send("you are registered succesfully")
    }).catch(()=>{
        res.status(400).send("please try again after some time or contact us")
    });
    res.status(200).render('aboutus.pug');
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});