import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getProducts, getOneProduct, addProduct, updateProduct, deleteProduct } from './controllers/products.ts';

const router = new Router();

router.get('/api/v1/products', getProducts);
router.get('/api/v1/products/:productId', getOneProduct);
router.post('/api/v1/addProduct', addProduct);
router.put('/api/v1/updateProduct/:productId', updateProduct);
router.delete('/api/v1/deleteProduct/:id', deleteProduct)

export default router;