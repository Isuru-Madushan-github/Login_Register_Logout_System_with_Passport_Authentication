const express=require('express');
const router=express.Router();
const {ensureAuthenticated}=require('../config/auth');

router.get('/',(req,res)=>{
    res.render('index',{title: 'Login'});
});

router.get('/dashboard',ensureAuthenticated,((req,res)=>{
    res.render('dashboard',{
        title: 'Dashboard',
        username: req.user.name
    });
}));

module.exports=router;