// Load books on books.html
if (document.getElementById("book-list")) {
  const container = document.getElementById("book-list");
  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Price: ₹${book.price}</p>
      <button onclick="addToCart(${book.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Add to cart
function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${book.title} added to cart!`);
}

// Show cart
if (document.getElementById("cart-items")) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalDiv = document.getElementById("total");
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((book, index) => {
      total += book.price;
      const item = document.createElement("div");
      item.className = "card";
      item.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>Price: ₹${book.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      container.appendChild(item);
    });
    totalDiv.innerHTML = `<h2>Total: ₹${total}</h2>`;
  }
}

// Remove from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}