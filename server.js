const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const FILE = "users.json"

function readUsers(){
if(!fs.existsSync(FILE)){
fs.writeFileSync(FILE, JSON.stringify({}))
}
return JSON.parse(fs.readFileSync(FILE))
}

function saveUsers(users){
fs.writeFileSync(FILE, JSON.stringify(users,null,2))
}

/* REGISTRAR CONTA */

app.post("/register",(req,res)=>{

const {name,email,password} = req.body

let users = readUsers()

if(users[email]){
return res.json({
error:"Este email já está cadastrado"
})
}

users[email] = {
name:name,
password:password,
habits:[]
}

saveUsers(users)

res.json({
success:true
})

})

/* LOGIN */

app.post("/login",(req,res)=>{

const {email,password} = req.body

let users = readUsers()

if(!users[email]){
return res.json({error:"Usuário não existe"})
}

if(users[email].password !== password){
return res.json({error:"Senha incorreta"})
}

res.json({
success:true,
name:users.name
})

})

/* SALVAR HÁBITOS */

app.post("/saveHabits",(req,res)=>{

const {email,habits} = req.body

let users = readUsers()

if(!users[email]){
return res.json({error:"Usuário não existe"})
}

users[email].habits = habits

saveUsers(users)

res.json({success:true})

})

/* CARREGAR HÁBITOS */

app.post("/getHabits",(req,res)=>{

const {email} = req.body

let users = readUsers()

if(!users[email]){
return res.json({error:"Usuário não existe"})
}

res.json({
habits: users[email].habits || []
})

})

/* SERVIDOR */

app.listen(3000,()=>{
console.log("Servidor rodando em http://localhost:3000")
})
