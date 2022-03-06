const express = require("express");
const path = require('path');
const { Pool, defaults } = require('pg')

const pg = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}
const connString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:localpostgresport/yourlocaldbname';
const pool = new Pool({
  connectionString : connString,
  ssl: { rejectUnauthorized: false }
});

const buildPath = path.normalize(path.join(__dirname, '../client/build'));
app.use(express.static(buildPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.get("/subscriptions", (req, res) => {
  let pageToken = req.query.page || '';
  let pageLimit = req.query.limit || '5';

  queryPaginatedTable('subscriptions', pageToken, pageLimit, res)
})

app.get("/videos", (req, res) => {
  let pageToken = req.query.page || '';
  let pageLimit = req.query.limit || '5';

  queryPaginatedTable('video_metadata', pageToken, pageLimit, res)
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

function queryPaginatedTable(tableName, pageToken, pageLimit, res) {
  pool.query(`SELECT * FROM ${tableName} WHERE page_token > $1 ORDER BY page_token LIMIT $2`, [pageToken, pageLimit], (err, poolRes) => {
    if (err) {
      throw err
    }
    
    let nextPage = ''
    if (poolRes.rows.length != 0) {
      nextPage = poolRes.rows[poolRes.rows.length - 1].page_token
    }

    res.json({
      'next_page': nextPage,
      'results': poolRes.rows
    })
  });
}