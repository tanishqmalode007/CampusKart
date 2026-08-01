const API = "http://127.0.0.1:8000";

export async function getProducts() {
    const response = await fetch(`${API}/products`);
    return response.json();
}

export async function getProduct(id) {
    const response = await fetch(`${API}/products/${id}`);
    return response.json();
}