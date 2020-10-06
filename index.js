const express = require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const ObjectId=require('mongodb').ObjectId;
const port = 5000
const app = express()

app.use(bodyParser.json())
app.use(cors())
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saqeeb:saqeeb@cluster0.euyqv.mongodb.net/volunteer?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const bookings = client.db("volunteer").collection("volunteers");
  // perform actions on the collection object

  app.post('/addBook',(req,res)=>{
      const newBooking=req.body
      bookings.insertOne(newBooking).then(result=>{
          console.log(result)
      })
      console.log(newBooking)
  })

  app.get('/bookings',(req,res)=>{
    bookings.find({email:req.query.email})
    .toArray((err,document)=>{
     res.send(document)
    })
    
  })
  app.delete('/delete/:id',(req,res)=>{
    console.log(req.params.id);
    bookings.deleteOne({_id:ObjectId(req.params.id)})
    .then(result=>{
      console.log('success');
    })
  })
  console.log('connect');
});


app.get('/', (req, res) => {
 res.send('hellow')
})

app.listen(port, () => {
  
})