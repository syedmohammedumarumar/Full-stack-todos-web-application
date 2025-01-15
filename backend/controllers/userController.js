import User from "../models/userModel.js";


export const create = async(req,res)=>{
   try {
    const userData = new User(req.body);

   if(!userData){
    return res.status(404).json({message:"Unable to create Todo"});
   }

   await userData.save();
   res.status(200).json({message:"Todo Created successfully"})

   } catch (error) {
        res.status(500).json({error : error});
   }


} 

export const getAll = async( req, res) => {
  try {
    const userData = await User.find();
    if(!userData){
        return res.status(404).json({message:"Todo not found"})
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({error : error});
  }
}

export const getOne = async(req,res) => {
    try {
        const id = req.params.id;
        const todoExists = await User.findById(id);
        if(!todoExists){
            return res.status(404).json({message:"Todo not found"});
        }

        res.status(200).json(todoExists);
    } catch (error) {
        res.status(500).json({error : error});
    }
}

export const update = async(req,res) => {
   try {
    const id = req.params.id;
    const todoExists = await User.findById(id);

    if(!todoExists){
        return res.status(404).json({message:"unable to update"});
    }

    const updateTodo = await User.findByIdAndUpdate(id,req.body, {new:true});
    res.status(200).json({message:"todo updated successfully"});
   } catch (error) {
    res.status(500).json({error:"error"})
   }
}

export const deleteTodo = async(req,res) => {
   try {
    const id = req.params.id;
    const todoExists = await User.findById(id);
    if(!todoExists){
        return res.status(404).json({message:"unable to delete todo"});
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({message:"todo deleted successfully"})
   } catch (error) {
    res.status(500).json({error:"error"})
   }

}





