import mongoose,{Document,Schema} from "mongoose";


 
// Define the Admin schema

interface Admin extends Document{

  name:string,
  email:string,
  password:string,
  is_admin:number,
}

const adminSchema:Schema<Admin>= new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Number,
    required: true,
  },
});

// Export the Admin model

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
