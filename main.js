/**
 * add a slash (/) at the start of
 * a section to uncomment it's solution:
 *  (/* X.Y.) --> (//*)
 */

//*
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const app = express();
let id = 0;

const dbFilePath = path.resolve('./users.json');
fs.writeFileSync(dbFilePath, JSON.stringify([]));

app.use(express.json());

app.post('/user', (req, res) => {
  const rawUsers = fs.readFileSync(dbFilePath, {
    encoding: 'utf-8',
  });
  const dbUsers = JSON.parse(rawUsers);

  const { name, age, email } = req.body;
  if (!name || !age || !email)
    return res
      .status(400)
      .json({ message: 'missing either name, age, or email' });

  const user = dbUsers.find((usr) => usr.email === email);
  if (user) {
    return res.status(409).json({
      message: 'Email already exists',
    });
  }

  dbUsers.push({ id: id++, name, age, email });

  fs.writeFileSync(dbFilePath, JSON.stringify(dbUsers));

  res.status(201).json({ user: { name, age, email } });
});

app.patch('/user/:id', (req, res) => {
  const rawUsers = fs.readFileSync(dbFilePath, {
    encoding: 'utf-8',
  });
  const dbUsers = JSON.parse(rawUsers);
  const id = Number(req.params.id);

  const { name, age, email } = req.body;
  if (!name && !age && !email)
    return res
      .status(400)
      .json({ message: 'missing either name, age, or email' });

  let flag = false;
  dbUsers.forEach((user, i) => {
    if (user.id === id) {
      dbUsers[i] = { ...dbUsers[i], ...req.body };
      flag = true;
    }
  });

  if (flag) {
    fs.writeFileSync(dbFilePath, JSON.stringify(dbUsers));
    res.status(200).json({
      message: `USer ${Object.keys(req.body).join(',')} updated successfully.`,
    });
  } else {
    res.status(404).json({ message: 'User ID not found.' });
  }
});

app.delete('/user/:id', (req, res) => {
  const rawUsers = fs.readFileSync(dbFilePath, {
    encoding: 'utf-8',
  });
  const dbUsers = JSON.parse(rawUsers);
  const id = Number(req.params.id);

  let flag = false;
  dbUsers.forEach((user, i) => {
    if (user.id === id) {
      dbUsers.splice(i, 1);
      flag = true;
    }
  });

  if (flag) {
    fs.writeFileSync(dbFilePath, JSON.stringify(dbUsers));
    res.status(200).json({ message: 'User deleted successfully.' });
  } else {
    res.status(404).json({ message: 'User ID not found.' });
  }
});

app.get('/user', (req, res) => {
  const rawUsers = fs.readFileSync(dbFilePath, {
    encoding: 'utf-8',
  });
  const dbUsers = JSON.parse(rawUsers);

  const { name, filter } = req.query;

  let result = dbUsers;
  if (name) {
    result = result.filter((user) => user.name === name);
    console.log(result);
  }

  if (filter) {
    result.sort((a, b) => a.age - b.age);
  }

  res.status(200).json(result);
});

app.get('/user/:id', (req, res) => {
  const rawUsers = fs.readFileSync(dbFilePath, {
    encoding: 'utf-8',
  });
  const dbUsers = JSON.parse(rawUsers);
  const id = Number(req.params.id);

  const user = dbUsers.find((usr) => usr.id === id);
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(4000);
// */
