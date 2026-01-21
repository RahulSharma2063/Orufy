require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use('/api/products', productRoutes);

app.get('/db-monitor', async (req, res) => {
    try {
        const Product = require('./models/Product');
        const products = await Product.find();

        let html = `
            <html>
            <head>
                <title>Local Database Monitor</title>
                <style>
                    body { font-family: sans-serif; padding: 40px; }
                    table { border-collapse: collapse; width: 100%; border: 1px solid #ddd; }
                    th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
                    th { background-color: #f4f4f4; }
                    .status-published { color: green; font-weight: bold; }
                    .status-unpublished { color: orange; font-weight: bold; }
                    h1 { color: #333; }
                </style>
            </head>
            <body>
                <h1>Database Monitor</h1>
                <p>Total Products: ${products.length}</p>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products.map(p => `
                            <tr>
                                <td>${p._id}</td>
                                <td>${p.name}</td>
                                <td>${p.price}</td>
                                <td>${p.type}</td>
                                <td class="${p.status === 'published' ? 'status-published' : 'status-unpublished'}">${p.status}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;
        res.send(html);
    } catch (e) {
        res.status(500).send("Error reading database: " + e.message);
    }
});

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/orufy";

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.log("MongoDB Connection Error:", err);
    });

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
