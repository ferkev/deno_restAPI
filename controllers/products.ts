import { Product } from '../types.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This is product one",
    price: 29.99,
  },
  {
    id: "2",
    name: "Product Two",
    description: "This is product two",
    price: 39.99,
  },
  {
    id: "3",
    name: "Product Three",
    description: "This is product three",
    price: 59.99,
  },
];
/**
 * 
 * @desc get all products
 * @route GET /api/v1/products
 */
const getProducts = ({ response }: { response: any}) => {
  response.body = {
    success: true,
    data: products,
  }
}

/**
 * @param { string } productId
 * @desc get one products
 * @route GET /api/v1/product/:productID
 */
const getOneProduct = ({ params, response }: { params: { productId: string }, response: any}): any => {
  const productId = params.productId;
  const product: Product | undefined = products.find((product: any) => product.id == productId); 

  if (!product) {
    response.body = {
      success: false,
      error: 'Product not found',
    }

    return response.body;
  }

  response.body = {
    success: true,
    data: product,
  }
}

/**
 * 
 * @desc add one product
 * @route POST /api/v1/addProduct
 */
const addProduct = async ({ request, response }: { request: any, response: any}) => {

  const body = await request.body();
  
  if (!request.hasBody) {
    response.status = 404;
    response.body = { 
      success: false,
      message: 'no data',
    }
  }
  
  const product: Product = body.value;
  product.id = v4.generate();

  products = [...products, product];

  response.status = 201;
  response.body = {
    success: true,
    data: product,
  }
}

/**
 * @param { string } productId
 * @desc get update product
 * @route PUT /api/v1/updateProduct/:productId
 */
const updateProduct = async ({ params, request, response }: { params: { productId: string }, request: any, response: any}) => {

  const productId = params.productId;

  const product: Product | undefined = products.find((product: Product) => {
    return product.id === productId;
  })

  if (!product) {
    response.status = 404;
    response.body = {
      success: false,
      error: 'Product not found',
    }
  } else {

    const body = await request.body()

    const updateData: {name?: string, description?: string, price?: number} = body.value;
    products = products.map((product: Product) => product.id === productId ? {...product, ...updateData } : product)

    response.body = {
      success: true,
      data: products
    }
  }
}

/**
 * 
 * @desc delete product
 * @route DELETE /api/v1/deleteProduct/:productId
 */
const deleteProduct = ({ params, response }: { params: { id: string }, response: any }) => {
  products = products.filter(p => p.id !== params.id)
  response.body = { 
      success: true,
      msg: 'Product removed'
  }
}
export { getProducts, getOneProduct, addProduct, updateProduct, deleteProduct };