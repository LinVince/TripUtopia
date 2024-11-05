import mongoose from 'mongoose';

const itinerarydataSchema = new mongoose.Schema({
    data:{type:Object, required: true},
    email:{type:String, required:true}
    
  },{timestamps:true})

export default mongoose.models.Itinerarydata || mongoose.model('Itinerarydata', itinerarydataSchema);



