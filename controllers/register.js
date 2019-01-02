const handleRegister = (req, res, knex, bcrypt) => {
  const { email, name, password } = req.body
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission')
  }
  const hash = bcrypt.hashSync(password)
  knex.transaction(trx => {
    trx.insert({
      hash,
      email,
    }).into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .insert({
            name,
            email: loginEmail[0],
            joined: new Date()
          })
          .returning('*').then(users => {
            res.json(users[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  }).catch(err => res.status(400).json('Unable to register'))
}

module.exports = {
  handleRegister
}