// backend/routes/index.js
// import packages and routers
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// connect api routers
router.use('/api', apiRouter);

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;
