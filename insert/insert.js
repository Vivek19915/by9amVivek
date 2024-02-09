//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()




//create rest api
router.post("/",(req,res)=>{
    let obj = {
        "p_id":req.body.p_id,
        "p_name":req.body.p_name,
        "p_cost":req.body.p_cost,
    }
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)console.log('Error in connection:- ',err)
        else{
            let db = conn.db('nodedb')                                       //connection nodedb
            db.collection('products').insertOne(obj, (err) => {              // inserting obj to the nodedb
                if (err)
                    res.send({ 'insert': 'error' })
                else {
                    console.log("Data inserted")
                    res.json({ 'insert': 'success' })
                    conn.close()
                }
            })
        }
    })
})



// Insert USER ------>
router.post("/createUser",(req,res)=>{
    let obj = {
        "u_id":req.body.u_id,
        "u_name":req.body.u_name,
        "u_pwd":req.body.u_pwd,
        "u_email":req.body.u_email,
        "u_address":req.body.u_address,
        "u_contact":req.body.u_contact,
    }
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)console.log('Error in connection:- ',err)
        else{
            let db = conn.db('vkcmalls')                                       //connection nodedb
            db.collection('users').insertOne(obj, (err) => {              // inserting obj to the nodedb
                if (err)
                    res.send({ 'insert': 'error' })
                else {
                    console.log("Data inserted")
                    res.json({ 'insert': 'success' })
                    conn.close()
                }
            })
        }
    })
})




// Cart Insert ------>
router.post("/cartInsert",(req,res)=>{
    let obj = {
        "p_id":req.body.p_id,
        "p_cost":req.body.p_cost,
        "qty":1,
        "p_img":req.body.p_img,
        "u_name":req.body.u_name
    }
    let u_name = req.body.u_name;
    let my_token = req.body.u_token;
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)console.log('Error in connection:- ',err)
        else{
            let db = conn.db('vkcmalls')  
            db.collection('users').find({"u_name":u_name ,"u_token":my_token }).toArray((err,array)=>{
                if (array.length != 0) {  
                    db.collection('cart').insertOne(obj, (err) => {              
                        if (err)
                            res.send({ 'insert': 'error' })
                        else {
                            console.log("Data inserted")
                            res.json({ 'insert': 'success' })
                            conn.close()
                        }
                    })
                    
                }
                else
                    res.send({ 'auth': 'failed' })
            })                                    
        }
    })
})






//export router
module.exports = router

