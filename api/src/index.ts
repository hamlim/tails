import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

app.get('/v1/login', (c) => {
  // login
})

app.get('/v1/signup', (c) => {
  // signup
})

app.get('/v1/recipes', (c) => {
  // return recipes
});

app.get('/v1/recipe/:id', (c) => {
  // get specific recipe
})

app.post('/v1/create-recipe', (c) => {
  // create recipe
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
