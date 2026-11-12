import express from 'express'
import cliente_routes from './routes/cliente_routes.js'
import produto_routes from './routes/produto_routes.js'
import venda_routes from './routes/venda_routes.js'
import sequelize from './config/database.js'
import './models/bd_cliente.js'
import './models/bd_produto.js'
import './models/bd_venda.js'
import cors from 'cors'
const porta = 3000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ message: 'servidor funcionando.', success: true })
})

app.use('/cliente', cliente_routes)
app.use('/produto', produto_routes)
app.use('/venda', venda_routes)



try {
  await sequelize.authenticate()
  await sequelize.sync()
  app.listen(3000, () => {
    console.log('\x1b[36m%s\x1b[0m', '==========================================================')
    console.log('\x1b[33m', '                            (\\____/)')
    console.log('\x1b[33m', '                            (=^__^=) ')
    console.log('\x1b[33m', `                  (3 Server Online na porta ${porta} Ɛ)           `)
    console.log('\x1b[33m', "                          (''')____(''')")
    console.log('\x1b[36m%s\x1b[0m', '==========================================================')
  })
} catch (erro) {
  console.error('Falha ao Iniciar:', erro)
  process.exit(1)
}