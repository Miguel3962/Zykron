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
habits:[],
weeklyData:[0,0,0,0,0,0,0],
calendarData:{}
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
name:users[email].name
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

/* SALVAR GRAFICO */

app.post("/saveWeekly",(req,res)=>{

const {email,weeklyData} = req.body

let users = readUsers()

if(!users[email]){
return res.json({error:"Usuário não existe"})
}

users[email].weeklyData = weeklyData

saveUsers(users)

res.json({success:true})

})

/* CARREGAR GRAFICO */

app.post("/getWeekly",(req,res)=>{

const {email} = req.body

let users = readUsers()

if(!users[email]){
return res.json({error:"Usuário não existe"})
}

res.json({
weeklyData: users[email].weeklyData || [0,0,0,0,0,0,0]
})

})

/* SALVAR CALENDARIO */

app.post("/saveCalendar",(req,res)=>{

const {email,calendarData} = req.body

let users = readUsers()

if(!users[email]){
return res.json({error:"Usuário não existe"})
}

users[email].calendarData = calendarData

saveUsers(users)

res.json({success:true})

})

/* CARREGAR CALENDARIO */

app.post("/getCalendar",(req,res)=>{

const {email} = req.body

let users = readUsers()

if(!users[email]){
return res.json({error:"Usuário não existe"})
}

res.json({
calendarData: users[email].calendarData || {}
})

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
