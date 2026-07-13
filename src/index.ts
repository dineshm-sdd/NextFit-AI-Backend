import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Generate 100 fake products
const categories = ['Dress', 'Sunglasses', 'Sneakers', 'Shirt', 'Hat', 'Jacket'];
const images = [
  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80', // Dress
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80', // Sunglasses
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80', // Sneakers
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', // Shirt (Fixed)
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80', // Hat (Fixed)
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80'  // Jacket
];

const products = Array.from({ length: 100 }).map((_, i) => {
  const catIndex = i % categories.length;
  // Make the first 5 match our specific IDs for the 3D model mapping
  const idMap = ['dress', 'sunglasses', 'shoes', 'shirt', 'dress2', 'shoes2'];
  const id = i < idMap.length ? idMap[i] : `prod_${i}`;
  
  return {
    id,
    name: `Premium ${categories[catIndex]} ${i + 1}`,
    category: categories[catIndex],
    description: `High-quality futuristic ${categories[catIndex]} for your spatial wardrobe.`,
    price: Math.floor(Math.random() * 300) + 50,
    stock: Math.floor(Math.random() * 50) + 1,
    img: images[catIndex],
    aiScore: (Math.random() * (9.9 - 8.0) + 8.0).toFixed(1)
  };
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

// AI Recommendation Mock Endpoint
app.post('/api/ai/recommend', (req, res) => {
  const { prompt } = req.body;
  console.log(`Received AI styling request: ${prompt}`);
  
  // Return a subset of products that "match" the prompt
  setTimeout(() => {
    const recommended = products.slice(0, 5).sort(() => 0.5 - Math.random());
    res.json({
      message: "Here is your custom curated look for the beach party.",
      recommendations: recommended
    });
  }, 1500); // Simulate network latency/thinking
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Spatial Commerce Backend running on port ${PORT}`);
});
