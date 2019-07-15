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

 
  if(!a || typeof a !== 'number') {
    
    return res.status(400).send('Please provide a number');
  }
 
  if(!b || typeof b !== 'number') {
    
    return res.status(400).send('Please provide a number');
  }



  
  res.send(sum)
})


app.get('/cipher', (req, res) => {
  console.log(req.method);
  const text = req.query.text;
  const shift = Number(req.query.shift);
  let ciphertext = '';
  let re = /[a-z]/;

for(i=0; i<text.length; i++){ 
   if(re.test(text.charAt(i))) ciphertext += String.fromCharCode((text.charCodeAt(i) - 97 + shift)%26 + 97); 
   else ciphertext += text.charAt(i); 
} 

if(!text || typeof text === 'number' ) {
    
  return res.status(400).send('Please provide a string');
}

if(!shift || typeof shift != 'number') {
  
  return res.status(400).send('Please provide a number');
}

  res.send(ciphertext)
})


app.listen(8080, () => console.log('Server on 8080 is running'))