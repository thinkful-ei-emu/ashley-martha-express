const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'))

app.get('/sum', (req, res) => {
  console.log(req.method);
  const a = Number(req.query.a);
  console.log('a as number', a)
  const b = Number(req.query.b);
  const c = a + b;
  const sum = `The sum of ${a} and ${b} is ${c}`;
  
  res.send(sum)
})

app.listen(8080, () => console.log('Server on 8080 is running'))