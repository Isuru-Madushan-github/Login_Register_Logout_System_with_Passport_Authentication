const localStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const userModel=require('../models/userModel');

module.exports=function(passport){
    passport.use(
        new localStrategy({usernameField: 'email'},(email,password,done)=>{

            userModel.findOne({email: email}).then((user)=>{
                if(!user){
                    return done(null,false, {message: 'Invalid email'});
                }

                bcrypt.compare(password,user.password,(err, isMatch)=>{
                    if(err){throw err;}

                    if(isMatch){

                        userModel.updateOne({email: user.email},{$set: {last_login: new Date().toLocaleString("en-US")}}).then(()=>{
                            return done(null,user);
                        }).catch((e)=>console.log(e));
                        
                    }else{
                        return done(null,false, {message: 'Invalid password'});
                    }
                });
            }).catch((e)=>{
                console.log(e);
            });
        }));

        passport.serializeUser((user,done)=>{
            done(null, user.id);
        });

        passport.deserializeUser( (id,done)=>{
            userModel.findById(id).then((user)=>{
                done(null,user)
            }).catch((e)=>{
                console.log(e)
            })
        });
}