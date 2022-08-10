require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const File = require('./models/File');

//TODO: TEST ME!
//TODO: MAKE ME A GIT REPO!

const app = express(); //remember we are initalizing an express server!!!
app.use(express.urlencoded({ extended: true })); //tell express how to use data sent from form tag properly !
const upload = multer({ dest: './uploads' }); //put all uploads in this 
mongoose.connect(process.env.DATABASE_URL); 

app.set('view engine','ejs'); //allows us to render something to our view! This is a new thing...

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/upload', upload.single('file'), async (req,res)=>{
    fileData = { //multer gives us the 'file' obj on the request, hence where it is coming from when we call the single method on our upload obj, here
        path: req.file.path,
        originalName: req.file.originalname,
    };

    if (req.body.password != null && req.body.password !== ''){ //TODO: PUT ME IN A CUSTOM WARE !
        fileData.password = await bcrypt.hash(req.body.password, 8);
    } 

    const file = await File.create(fileData); //remember, all db access calls should be asynchronous!
    
    res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
});

app.route('/file/:id').get(handleDownload).post(handleDownload); //this is the same as writing the two routes out by hand, BUT a little cleaner since we are only defining the route once. Very useful for this use case!


async function handleDownload(req,res){
    const file = await File.findById(req.params.id);

    //password checky
    if (file.password != null){
        if (req.body.password == null){
            res.render('password');
            return;
        }
        if (!(await bcrypt.compare(req.body.password, file.password))){
            res.render('password', { error: true }); //returned as locals.error in the front end
            return;
        }
    }
    file.downloadCount ++;
    await file.save();

    res.download(file.path, file.originalName);
    console.log(file.downloadCount);
}

app.listen(process.env.PORT);