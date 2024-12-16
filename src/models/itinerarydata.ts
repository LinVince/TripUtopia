import mongoose from 'mongoose';

const itinerarydataSchema = new mongoose.Schema({
    tripID:{type:String, required:true},
    tripName:{type:String, required:true},
    description:{type:String,required:true},
    data:{type:Object, required: true},
    email:{type:String, required:true},
    sharees:{type:String,required:false},
    sharer:{type:String, required:false}
    
  },{timestamps:true})

export default mongoose.models.Itinerarydata || mongoose.model('Itinerarydata', itinerarydataSchema);



