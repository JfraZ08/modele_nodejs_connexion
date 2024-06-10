const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

sequelize.sync()  // synchroniser la base de données
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database:', err));

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
