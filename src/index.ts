import "reflect-metadata";
import {createConnection} from "typeorm";
import {Tblsekolah} from "./entity/User";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {getRepository} from 'typeorm';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


createConnection().then(async connection => {
    app.get("/",(req,res)=>{
        res.send("hello success run")
    })

    app.post("/add",async(req,res)=>{
        try{
                let repo = getRepository(Tblsekolah)
         let user = new Tblsekolah()
         user.name = req.body.name
         user.address = req.body.address
         user.age = req.body.age
         let result = await repo.save(user)
            res.send("success created")
        }catch(err){
            console.log(err)
            res.send(err)
        }
    })
    app.delete("/delete/:id",async(req,res)=>{
        let id = parseInt(req.params.id)
        let repo = getRepository(Tblsekolah)
        let find = await repo.findOne({id:id})
        let del = await repo.remove(find)
        if(del){
            res.send("delete cuccess")
            console.log("Delete success")
        }else{
            console.log("error")
            res.send("error")
        }
    })
    app.get("/search/:id",async(req,res)=>{
        let id = parseInt(req.params.id)
         let repo = getRepository(Tblsekolah)
        let find = await repo.findOne({id:id})
        if(find){
            console.log(JSON.stringify(find))
            res.send(JSON.stringify(find))
        }
        else{
            console.log("Error not found")
        }
    })
    app.listen(8080,()=>console.log("server at 8080 running"))
       
}).catch(error => console.log(error));
