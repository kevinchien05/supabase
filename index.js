import express from "express";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const app = express();
const port = process.env.PORT || 3000;
const hostname = "127.0.0.1";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, { db: { schema: 'public' } });
app.use(express.json());

app.get('/user', async (req, res) => {
    const { data, error } = await supabase.from('clients').select();
    res.json(data);
});

app.post('/user', async (req, res) => {
    const { error } = await supabase
        .from('clients')
        .insert({
            username: req.body.name,
            password: req.body.password,
        })
    if (error) {
        res.send(error);
    }
    res.json("created!!");
});

app.put('/user/:id', async (req, res) => {
    const { error } = await supabase
        .from('clients')
        .update({
            username: req.body.name,
            password: req.body.password,
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/user/:id', async (req, res) => {
    const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!");
});

app.listen(port, () => {
    console.log(`Server running at ${hostname}:${port}`);
});
