const express = require('express');
const app = express();
const port = 2014;
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const Ticket = require("./models/ticketSchema");
app.set('view engine', 'ejs');
app.use(express.static('public'));
var moment = require('moment');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
 


///auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());



liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


const { CLIENT_RENEG_LIMIT } = require('tls');

//Get request

app.get('/', (req, res) => {

    console.log("-------------------------------")
    Ticket.find().then((result) => {
        
    
        res.render("index", {arr : result, moment : moment});
        })
        .catch((err) => {
            console.log(err); 
        });

  
});






app.get("/user/add.html", (req, res) => {
    res.render("user/add");
});



app.get("/edit/:id", (req, res) => {
    
    Ticket.findById(req.params.id).then((result) => {
        res.render("user/edit", {obj: result, moment : moment});
     
    }).catch((err) => {
         console.log(err); 
        });

});

app.get('/view/:id', (req, res) => {

    Ticket.findById(req.params.id).then((result) => {
        res.render("user/view", {obj: result, moment : moment});
     
    }) .catch((err) => {
            console.log(err); 
        });

});


//post request

app.post("/user/add.html", (req, res) => {
    Ticket.create(req.body).then(() => {
        res.redirect("/")
        })
        .catch((err) => {
            console.log(err); 
        });

});



app.post("/search", (req, res) => {
    const searchText = req.body.searchText.trim()
    Ticket.find({$or: [{Titre : searchText},{Ville : searchText}]}).then((result) => {
        console.log(result)
        res.render("user/search", {arr: result, moment : moment});
        })
        .catch((err) => {
            console.log(err); 
        });

});

//delete request
app.delete("/edit/:id", (req, res) => {
    Ticket.deleteOne({_id: req.params.id}).then((result) => {
        res.redirect("/");
        console.log(result)
        })
        .catch((err) => {
            console.log(err); 
        });
    });
  


//Put request
app.put("/edit/:id", (req, res) => {
   console.log(req.body)
   Ticket.updateOne({_id: req.params.id}, req.body).then(() => {
    
    res.redirect("/")
    })
    .catch((err) => {
        console.log(err); 
    });
    });





mongoose.connect('mongodb+srv://wafae:aq1234aq@cluster0.blthnfg.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`);});}).catch((err) => {console.log(err); });




 

        