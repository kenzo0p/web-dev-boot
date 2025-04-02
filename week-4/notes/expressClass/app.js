import express from "express"
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}));
const users = [{
    name : "john",
    kidneys :[{
        healthy : false
    }]
}]

app.get("/" , (req , res) => {
   const johnKidneys = users[0].kidneys;
   const numberOfKidnes = johnKidneys.length
   let numberOfHealthyKidneys = 0;
   for(let i = 0;i<johnKidneys.length;i++){
    if(johnKidneys[i].healthy){
        numberOfHealthyKidneys = numberOfHealthyKidneys +1;
    }
   }
   const numberOfUnhealthyKidneys = numberOfKidnes - numberOfHealthyKidneys;
   res.json({johnKidneys , numberOfHealthyKidneys , numberOfUnhealthyKidneys});

})
app.post("/" , (req,res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })
    res.json("done")
})
app.put("/" , (req,res) => {
    for(let i = 0;i<users[0].length;i++){
        users[i].kidneys[i].healthy = true;
    }
    res.json("Done the updation")

})
app.delete("/" , (req , res) => {
    const newKidneys = [];
    for(let i = 0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({healthy : true})
        }
    }
    res.json({});

})

const PORT = 3000 || 8000;
app.listen(PORT , () => {
    console.log(`App is listening on port ${PORT}`);
})