const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const c = a + b;
  const sum = `The sum of ${a} and ${b} is ${c}`;

  if(!a || typeof a !== 'number') {
    return res.status(400).send('Please provide a number');
  }
  if(!b || typeof b !== 'number') { 
    return res.status(400).send('Please provide a number');
  }
  res.send(sum);
});


app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = Number(req.query.shift);
  let ciphertext = '';
  let re = /[a-z]/;

  for(let i=0; i<text.length; i++){ 
    if(re.test(text.charAt(i))) ciphertext += String.fromCharCode((text.charCodeAt(i) - 97 + shift)%26 + 97); 
    else ciphertext += text.charAt(i); 
  } 

  if(!text || typeof text === 'number' ) {
    return res.status(400).send('Please provide a string');
  }

  if(!shift || typeof shift !== 'number') {
    return res.status(400).send('Please provide a number');
  }

  res.send(ciphertext);
});

app.get('/lotto', (req, res) => {
  const numbers = []; 
  for (let i=0; i < 6; i++){
    numbers.push(Math.floor(Math.random() * (20 - 1 + 1)) + 1);
  }

  req.query.arr.forEach(number => {
    number = Number(number);
    if(!number || typeof number !== 'number') {
      return res.status(400).send('Please provide a number');
    }
  });

  if(req.query.arr.length !== 6){
    return res.status(400).send('Please provide 6 numbers');
  }

  let count = 0;
  numbers.forEach(number => {
    let checkNumber = number.toString();
    if(req.query.arr.includes(checkNumber)){
      count ++;
    }
  });

  let result = '';
  if(count < 4 ){
    result = 'Sorry, you lose';
  }
  else if (count === 4){
    result = 'Congratulations, you win a free ticket';
  }
  else if (count === 5){
    result = 'Congratulations! You win $100!';
  } 
  else {
    result = 'Wow! Unbelievable! You could have won the mega millions!';
  }

  res.send(result);
});

app.listen(8080, () => console.log('Server on 8080 is running'));