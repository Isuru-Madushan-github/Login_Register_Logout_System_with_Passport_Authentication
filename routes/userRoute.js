const express=require('express');
const router=express.Router();
const userModel=require('../models/userModel');
const bcrypt=require('bcrypt');
const passport=require('passport');
const {ensureAuthenticated}=require('../config/auth');


router.get('/register',((req,res)=>{
    res.render('register',{title: 'Register'});
}));


router.post('/register',(req,res)=>{
    const {name, email, password, password2}=req.body;
     
    let errors=[];

    if(name.trim().length==0 || email.trim().length==0 || password.trim().length==0 || password2.trim().length==0){
        errors.push({message: 'Please fill in all fields'});
    }
    
    if(password!=password2){
        errors.push({message: 'Passwords do not match'});
    }

    if(password.length<6){
        errors.push({message: 'Password should be at least 6 characters'});
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2,
            title: 'Register'
        });
    }else{
        userModel.findOne({email:email}).then((user)=>{
            if(user){
                errors.push({message: 'Email is already registered'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    title: 'Register'
                });
            }else{
                const user= new userModel({
                    name: name,
                    email: email,
                    password: password
                });
                
                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(user.password, salt, (err,hash)=>{
                        if(err){throw err;}
                        user.password=hash;
                        
                        user.save().then(()=>{
                            req.flash('success_msg', 'You are now successfully registered. Please login here');

                            res.redirect('/');
                        }).catch((e)=>{console.log(e)});
                    });
                });

                
            }
            
        }).catch((e)=>{
            console.log(e)
        });
    }

});


router.post('/login',((req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true,
    })(req,res,next)
}));

router.get('/logout',ensureAuthenticated,(req,res)=>{
    req.logout((err)=>{
        if(err){ return next(err);}

        req.flash('success_msg', 'You are successfully logged out');
        res.redirect('/');
    });
});



module.exports=router;