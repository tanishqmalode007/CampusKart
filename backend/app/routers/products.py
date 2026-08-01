from fastapi import APIRouter

router = APIRouter()

products = [
    {
        "id": 1,
        "name": "HP Laptop",
        "price": 25000,
        "seller": "Rahul",
        "category": "Electronics",
        "location": "IT Department",
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700"
    },
    {
        "id": 2,
        "name": "Engineering Mechanics Book",
        "price": 350,
        "seller": "Amit",
        "category": "Books",
        "location": "Library",
        "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700"
    },
    {
        "id": 3,
        "name": "Scientific Calculator",
        "price": 650,
        "seller": "User",
        "category": "Calculator",
        "location": "IT Department",
        "image": "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=700"
    }
]


@router.get("/products")
def get_products():
    return products


@router.get("/products/{product_id}")
def get_product(product_id: int):

    for product in products:
        if product["id"] == product_id:
            return product

    return {
        "message": "Product not found"
    }