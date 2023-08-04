const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{type: String , required: true},
    email:{type: String , required: true , unique: true},
    password:{type: String , required: true},
    registered_Date: {type: String , default: new Date().toLocaleString("en-US")},
    is_delete:{type: Number , default: 0},
    last_login:{type: String , default: '00/00/0000 00:00:00'},
});

module.exports=mongoose.model('user_details',UserSchema);