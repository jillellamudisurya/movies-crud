const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://surya:surya123@cluster0.tncgqxn.mongodb.net/mernstack?retryWrites=true&w=majority'

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Database Connected"))
.catch((err)=>console.log(err))