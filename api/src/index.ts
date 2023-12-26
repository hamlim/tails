import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'

const app = new Hono()

app.use('*', poweredBy())

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
