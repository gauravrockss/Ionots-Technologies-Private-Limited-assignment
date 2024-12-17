import app from './app.js';

const port = process.env.port || 8001;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
