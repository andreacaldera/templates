import express from 'express';

export default () => {
  const router = express.Router();

  router.get('/jeremy-corbyn', (req, res) => {
    res.send({ message: 'I (heart) Karl Marx.' });
  });

  router.get('/theresa-may', (req, res) => {
    res.send({ message: 'I am the face of of a strong and stable leadership. And by that I mean you need to help lifting a feather and not complain when I change my mind in 20 seconds time.' });
  });

  router.get('/leanne-wood', (req, res) => {
    res.send({ message: 'Chwyrligwgan' });
  });

  router.get('/nicola-sturgeon', (req, res) => {
    res.send({ message: 'Just another wee drum and then I\'m gonna call it a day.' });
  });

  router.get('/caroline-lucas', (req, res) => {
    res.send({ message: 'We are all gonna die once our planet implodes but other than that it\'s all good and well.' });
  });

  return router;
};
