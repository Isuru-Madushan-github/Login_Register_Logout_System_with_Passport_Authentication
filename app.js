const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const homeRoute=require('./routes/homeRoute');
const userRoute=require('./routes/userRoute');
const bodyParser=require('body-parser');
const flash=require('connect-flash');
const session=require('express-session');
const {v4:uuidv4}=require('uuid');
const passport=require('passport');

const app=express();
const port=process.env.PORT || 3000;

require('./config/passport')(passport);
//connect DB

const password='KveSdn8pNeOyHwR6';
const uri=`mongodb+srv://isuru:${password}@cluster0.nmmb0k6.mongodb.net/user_management?retryWrites=true&w=majority`;
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database Connected...');
}).catch((e)=>{
    console.log(e);
});

//ejs
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'/public')));
 
//body-parser
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

//session
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//variables for flash
app.use((req,res,next) =>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})



//routes
app.use('/',homeRoute);
app.use('/user',userRoute);

app.listen(port,()=>{console.log(`Server is running on port ${port}`)});