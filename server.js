const dotenv=require('dotenv').config()
const express=require("express")
const connectDB=require('./connectDB')
const Task = require('./taskmodel')
const cors = require("cors");
const app=express()

//post Task.create(req.body)
//get Task.find()
//get Task.findById(id)
//delete Task.findByIdAndDelete(id)
//put Task.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true,} )




app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("home page")
})

app.post('/api/tasks',async(req,res)=>{
    try {
   const task=await Task.create(req.body)     
    res.status(200).json(task)
    } catch (error) {
    res.status(500).json({msg:error.message})
        
    }
})


app.get('/api/tasks',async(req,res)=>{
    try {
   const task=await Task.find()     
    res.status(200) .json(task)
    } catch (error) {
    res.status(500).json({msg:error.message})
        
    }
})
app.get('/api/tasks/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const task=await Task.findById(id)
        if(!task){
            return res.status(404).json(`no task with id :${id} is present`)
        }
res.status(200).json(task)
      } 
    catch (error) {
        res.status(500).json({msg:error.message})
        
    }
})

app.delete('/api/tasks/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const task=await Task.findByIdAndDelete(id)
        if(!task){
            return res.status(404).json(`no task with id :${id} is present`)
        }
res.status(200).json(task)
      } 
    catch (error) {
        res.status(500).json({msg:error.message})
        
    }
})

app.put('/api/tasks/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const task=await Task.findByIdAndUpdate({_id:id},req.body,{new:true,
            runValidators:true,
        });
        if(!task){
            return res.status(404).json(`no task with id :${id} is present`)
        }
        res.status(200).json(task)
      } 
    catch (error) {
        res.status(500).json({msg:error.message})
        
    }
})




const PORT=process.env.PORT|| 2000
const startserver =async()=>{

    try {
    await  connectDB();
app.listen(PORT,()=>{
console.log(`server running on port ${PORT}`)
        })
        
        
    } catch (error) {
        console.log(error)
        
    }

}
startserver();