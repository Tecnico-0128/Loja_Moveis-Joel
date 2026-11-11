import express from 'express'
import cliente_routes from './routes/cliente_routes.js'
import produto_routes from './routes/produto_routes.js'
import venda_routes from './routes/venda_routes.js'
import sequelize from './config/database.js'
import './models/bd_cliente.js'
import './models/bd_produto.js'
import './models/bd_venda.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ message: 'servidor funcionando.', success: true })
})

app.use('/cliente', cliente_routes)
app.use('/produto', produto_routes)
app.use('/venda', venda_routes)

const PORT = process.env.PORT || 3000

try {
  await sequelize.authenticate()
  await sequelize.sync()
  app.listen(PORT, () => console.log('\x1b[1;4;36m', `Server inicializado na porta ${PORT}.`))
} catch (erro) {
  console.error('Falha ao Iniciar:', erro)
  process.exit(1)
}