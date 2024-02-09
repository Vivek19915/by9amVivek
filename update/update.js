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
router.put("/", (req, res) => {
    let p_id = req.body.p_id                                    // fro this p_id obj values will be updating
    let obj = {
        "p_name": req.body.p_name,
        "p_cost": req.body.p_cost
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection')
        else {
            let db = conn.db('nodedb')
            db.collection('products').updateOne({ p_id }, { $set: obj }, (err, result) => {        //it will upadate the obj for the p_id
                if (err)
                    res.status(404).send({ 'update': 'error' })
                else {
                    if (result.matchedCount != 0) {
                        console.log("Data updated ")
                        res.status(200).send({ 'update': 'success' })
                    }
                    else {
                        console.log("Data not updated ")
                        res.status(200).send({ 'update': 'Record not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})






// Update users info 
router.put("/updateUser", (req, res) => {
    let u_id = req.body.u_id    
    let obj = {
        "u_pwd":req.body.u_pwd,
        "u_email":req.body.u_email,
        "u_address":req.body.u_address,
        "u_contact":req.body.u_contact,
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection')
        else {
            let db = conn.db('vkcmalls')
            db.collection('users').updateOne({ u_id }, { $set: obj }, (err, result) => {        //it will upadate the obj for the p_id
                if (err)
                    res.status(404).send({ 'update': 'error' })
                else {
                    if (result.matchedCount != 0) {
                        console.log("Data updated ")
                        res.status(200).send({ 'update': 'success' })
                    }
                    else {
                        console.log("Data not updated ")
                        res.status(200).send({ 'update': 'Record not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})





//Update cart ---->
router.put("/cartUpdate", (req, res) => {
    let u_name = req.body.u_name;
    let my_token = req.body.u_token;    
    let obj = {
        "qty":100,
    }
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)console.log('Error in connection:- ',err)
        else{
            let db = conn.db('vkcmalls')  
            db.collection('users').find({"u_name":u_name ,"u_token":my_token }).toArray((err,array)=>{
                if (array.length != 0) {  
                    db.collection('cart').updateOne({ u_name }, { $set: obj }, (err, result) => {        //it will upadate the obj for the p_id
                        if (err)
                            res.status(404).send({ 'update': 'error' })
                        else {
                            if (result.matchedCount != 0) {
                                console.log("Data updated ")
                                res.status(200).send({ 'update': 'success' })
                            }
                            else {
                                console.log("Data not updated ")
                                res.status(200).send({ 'update': 'Record not found' })
                            }
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

