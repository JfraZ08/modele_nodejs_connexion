const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

sequelize.sync()  // synchroniser la base de données
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database:', err));

app.use(express.json());
app.use('/api/auth', authRoutes);
const corsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization'] // Autoriser le header Content-Type
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
