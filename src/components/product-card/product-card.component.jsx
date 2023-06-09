import './product-card.styles.scss';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductTooCart = () => addItemToCart(product);
    
    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={name}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='cost'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductTooCart}>Add to card</Button>
        </div>
    );
}

export default ProductCard;