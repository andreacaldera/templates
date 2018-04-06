import express from 'express';

export default () => {
  const router = express.Router();

  const POLITICIANS = ['theresa-may', 'jeremy-corbyn', 'leanne-wood', 'nicola-sturgeon', 'caroline-lucas'];
  const SPEECHES = {
    'jeremy-corbyn': 'I (heart) Karl Marx.',
    'theresa-may': 'I am the face of of a strong and stable leadership. And by that I mean you need to help lifting a feather and not complain when I change my mind in 20 seconds time.',
    'leanne-wood': 'Chwyrligwgan',
    'nicola-sturgeon': 'Let me just another wee drum and then I\'ll be ready to call an indipendence referendum',
    'caroline-lucas': 'We are all gonna die once our planet implodes but other than that it\'s all good and well.',
  };

  router.get('/speech/:politician', (req, res) => {
    if (!POLITICIANS.includes(req.params.politician)) return res.sendStatus(400);
    res.send({ message: SPEECHES[req.params.politician] });
  });

  const strongAndStable = (req, res) => {
    if (Math.round(Math.random(1))) {
      return res.status(500).send({ error: 'I could not find Theresa May. I looked for her everywhere, even at national election debates.' });
    }
    const randomDelay = Math.round(Math.random(100) * 3000);
    setTimeout(() => res.send({ votedCasted: req.params.politician }), randomDelay);
  };

  router.post('/vote/:politician', (req, res) => {
    const { politician } = req.params;
    if (!POLITICIANS.includes(req.params.politician)) return res.sendStatus(400);
    if (politician === 'theresa-may') {
      return strongAndStable(req, res);
    }
    res.send({ votedCasted: req.params.politician });
  });

  return router;
};
