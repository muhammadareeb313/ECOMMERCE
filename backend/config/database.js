const mongoose=require("mongoose");

module.exports = mongoose.connect(process.env.DB_URI)
.then((data)=>{
  console.log(`Database Connect${data.connection.host}`)
});