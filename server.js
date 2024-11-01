const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

// CORSを有効にする
app.use(cors());

// プロキシのエンドポイント
app.get('/proxy', (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    // リクエストを送信
    request(url)
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Error fetching the URL');
        })
        .pipe(res);
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
