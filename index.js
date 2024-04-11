const express = require("express");
const app = express();
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");

const mongoose = require("mongoose");

// middleware
app.use(express.json()); // notes-11
app.use(express.urlencoded({extended: false})); // notes-13

// routes
app.use('/api/products', productRoute);


app.get("/", (req, res) => {
  res.send("Hello from Node API dev");
});

// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.post("/api/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// update a product - PUT method is used to update

// app.put('/api/products/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByIdAndUpdate(id, req.body);

//     if (!product) {
//       return res.status(404).json({message: "Product not found"});
//     }

//     const updatedProduct = await Product.findById(id);
//     res.status(200).json(updatedProduct);

//   } catch (error) {
//     res.status(500).json({message: error.message});
//   }
// })

// delete a product

// app.delete('/api/products/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);

//     if (!product) {
//       return res.status(404).json({message: "Product not found"});
//     };

//     const getAllProducts = await Product.find({});

//     res.status(200).json({message:" Product deleted successfully"});
//   } catch (error) {
//     res.status(500).json({message: error.message});
//   }
// })



// notes-13

mongoose
  .connect(
    "mongodb+srv://HariNRS:harinrs@backenddb.4pjzrbr.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to Database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
