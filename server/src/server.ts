import express from 'express'

const app = express()

//localhost:3333/home
//rotas das aplicacoes
app.get('/home', (request, response) => {
    return response.json([
        {id: 1, name: "Response"},
    ])
})

app.listen(3333)