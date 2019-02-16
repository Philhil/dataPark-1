const express = require('express')
const app = express()
const port = 3000

const fs = require('fs')

const contract_address_source = fs.readFileSync("../contract/build/contracts/ParKing.json");
var contract_address_source_obj = JSON.parse(contract_address_source);
var contract_address = contract_address_source_obj.networks[5777].address;

app.get('/address', (req, res) => res.send(contract_address));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))