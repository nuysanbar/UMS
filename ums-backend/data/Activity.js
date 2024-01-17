const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const activitySchema=new Schema({
    username:{
        type:String,
        required:true
    },
    activity:String,
    time:Date
});
module.exports=mongoose.model('Activity',activitySchema);
