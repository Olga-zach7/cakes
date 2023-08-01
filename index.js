let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cakes-berries');

let cakesSchema = new mongoose.Schema({
    title: String,
    price: Number,
    weight: Number,
    img: String,
    description: String
})

let Cake = mongoose.model('cake', cakesSchema);

let ordersSchema = new mongoose.Schema({
    product: {
        type: mongoose.ObjectId,
        ref: 'cake'
    },
    name: String,
    status: Number,
    email: String,
    card: Number,
    taken: Boolean
}, {
    timestamps: true
})

let Order = mongoose.model('order', ordersSchema);

app.get('/products/all', async function(req, res) {
    let response = await Cake.find();
    res.send(response);
});

app.post('/my', async function(req, res) {
    let admin = Boolean(req.body.admin);
    let status = Number(req.body.status)
    let response;
    if(admin && status) {
        response = await Order.find({status: status}).sort({status: 1, createdAt: -1}).populate('product');
    } else if (admin && !status) {
        response = await Order.find().sort({status: 1, createdAt: -1}).populate('product');
    } else {
        response = await Order.find({taken: false}).sort({status: -1, createdAt: -1}).populate('product');
    }
    
    res.send(response);
});

app.get('/cake', async function(req,res) {
    let id = req.query.id;
    let response = await Cake.findOne({_id: id});
    res.send(response);
});

app.post('/order/create', async function (req, res) {
    let cake = req.body.cake;
    let card = Number(req.body.card);
    let {name, email} = req.body;
    let order = new Order({
        product: cake, 
        name: name,
        email: email,
        card: card,
        // Статус "В очереди"  
        status: 1,
        taken: false
    });
 
    await order.save();

    res.send(order);
});  


app.post('/order/update', async function (req, res) {
    let id = req.body.id;
    let status = Number(req.body.status);
    let order = await Order.findOne({_id: id});

    if(status == 3){
        order.taken = true;
    }

    order.status = status + 1;
    await order.save();

    res.send('ok');
});