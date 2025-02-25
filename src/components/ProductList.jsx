import React,{ useState, useEffect } from 'react'

const ProductList = () => {
    const [productsList, setProductsList] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json(); // Convert response to JSON
            console.log(data)
            setProductsList(data); // Store data in state
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchProducts();
      }, []);
        // Get stored view preference or default to list view
        const [isGridView, setIsGridView] = useState(() => {
          return JSON.parse(localStorage.getItem("isGridView")) || false;
        });
      
        useEffect(() => {
          localStorage.setItem("isGridView", JSON.stringify(isGridView));
        }, [isGridView]);
  return (
    <div className="catalog-container">
    <button
      id="toggleViewBtn"
      onClick={() => setIsGridView((prev) => !prev)}
    >
      {isGridView ? "📃 Switch to List View" : "📦 Switch to Grid View"}
    </button>

    <div className={`product-container ${isGridView ? "grid-view" : "list-view"}`}>
      {productsList.slice(0,10).map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} style={{width:"200px",height:"200px"}}/>
          <div className="product-info">
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default ProductList
