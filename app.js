
const express = require('express');
const moment = require('moment');
const app = express();

app.get('/', (req, res) => {
  res.send("Please use /time, either unix or in YYYY-MM-DD fromat");
});

app.get('/:time', (req, res) => {

  let formats = [
    "YYYY-MM-DD",
  ];

  var isnum = /^\d+$/.test(req.params.time);
  if(isnum){
    res.json({
      "UnixTime": req.params.time,
      "Standard Time": moment.unix(req.params.time).format("DD/MM/YYYY")
    });

  }else if(moment(req.params.time, formats, true).isValid()){
    // let yr = (req.params.time).slice(0, 4);
    // let mnth = (req.params.time).slice(5, 7);
    // let day = (req.params.time).slice(8, 10);
    res.json({
      "UnixTime": moment(req.params.time + " " + '00:00:00').unix(),
      // "Standard Time": day + "-" + mnth + "-" + yr
      "Standard Time": req.params.time
    });
  }else{
    res.json({success: false, msg: "Please use correct unix time or this format YYYY-MM-DD"});
  }
});

app.listen(3000, ()=> {
  console.log("Server running at port 3000");
});
