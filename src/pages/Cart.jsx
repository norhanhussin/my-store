import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import useThemeStore from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

function Cart() {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const cartItems  = useSelector(state => state.cart.cartItems);
  const { theme }  = useThemeStore();
  const { t }      = useLanguage();

  const bg     = theme === 'dark' ? '#0a0a0a' : '#fff';
  const bgCard = theme === 'dark' ? '#1e1e1e' : '#fff';
  const bgImg  = theme === 'dark' ? '#0a0a0a' : '#fafafa';
  const border = theme === 'dark' ? '#262626' : '#f0f0f0';
  const text   = theme === 'dark' ? '#fff' : '#0a0a0a';
  const sub    = theme === 'dark' ? '#a3a3a3' : '#737373';
  const muted  = theme === 'dark' ? '#737373' : '#a3a3a3';

  const total      = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (cartItems.length === 0) return (
    <Box sx={{ textAlign: 'center', backgroundColor: bg, minHeight: '100vh', pt: 15 }}>
      <ShoppingCartOutlinedIcon sx={{ fontSize: 64, color: border }} />
      <Typography variant="h5" sx={{ mt: 2, color: text, fontWeight: 500 }}>{t('emptyCart')}</Typography>
      <Typography sx={{ color: sub, mt: 1, fontSize: '14px' }}>{t('emptySub')}</Typography>
      <Button variant="contained" onClick={() => navigate('/')}
        sx={{ mt: 3, backgroundColor: text, color: bg, borderRadius: '8px',
              '&:hover': { backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626' } }}>
        {t('continueShopping')}
      </Button>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: bg, minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 600, mx: 'auto', px: 3, py: 4 }}>
        <Typography variant="h5" fontWeight={500} sx={{ color: text, mb: 3 }}>
          {t('yourCart')} ({totalItems} {t('items')})
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {cartItems.map(item => (
            <Box key={item.id} sx={{
              display: 'flex', alignItems: 'center', gap: 2,
              border: `1px solid ${border}`, borderRadius: 2, p: 2, backgroundColor: bgCard,
            }}>
              <Box sx={{
                width: 64, height: 64, borderRadius: 1.5, flexShrink: 0,
                backgroundColor: bgImg, border: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0.5,
              }}>
                <Box component="img" src={item.image} alt={item.title}
                  sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={500} sx={{
                  color: text, fontSize: '14px',
                  display: '-webkit-box', WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: muted, fontSize: '12px', mt: 0.25 }}>
                  ${item.price} {t('perItem')}
                </Typography>
              </Box>

              {/* Quantity Controls */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, border: `1px solid ${border}`, borderRadius: '8px', px: 0.5 }}>
                <IconButton size="small"
                  onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}
                  sx={{ color: sub, '&:hover': { color: text } }}>
                  <RemoveIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <Typography sx={{ color: text, fontWeight: 500, fontSize: '14px', minWidth: '24px', textAlign: 'center' }}>
                  {item.quantity || 1}
                </Typography>
                <IconButton size="small"
                  onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}
                  sx={{ color: sub, '&:hover': { color: text } }}>
                  <AddIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>

              <Typography fontWeight={500} sx={{ color: text, minWidth: '60px', textAlign: 'right' }}>
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </Typography>

              <IconButton size="small"
                onClick={() => {
                  dispatch(removeFromCart(item.id));
                  toast.error('Removed from cart', {
                    icon: '🗑️',
                    style: {
                      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
                      color: theme === 'dark' ? '#fff' : '#0a0a0a',
                      border: `1px solid ${theme === 'dark' ? '#262626' : '#f0f0f0'}`,
                    },
                  });
                }}
                sx={{ color: muted, '&:hover': { color: '#dc2626', backgroundColor: '#fef2f2' } }}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3, borderColor: border }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: sub, fontSize: '14px' }}>{t('items')} ({totalItems})</Typography>
            <Typography sx={{ color: sub, fontSize: '14px' }}>${total.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: sub, fontSize: '14px' }}>{t('shipping')}</Typography>
            <Typography sx={{ color: '#059669', fontSize: '14px' }}>{t('free')}</Typography>
          </Box>
          <Divider sx={{ borderColor: border, my: 0.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={500} sx={{ color: text }}>{t('total')}</Typography>
            <Typography variant="h5" fontWeight={500} sx={{ color: text }}>${total.toFixed(2)}</Typography>
          </Box>
        </Box>

        <Button fullWidth variant="contained"
          sx={{ backgroundColor: text, color: bg, borderRadius: '8px', py: 1.5, fontSize: '14px',
                '&:hover': { backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626' } }}>
          {t('checkout')}
        </Button>
      </Box>
    </Box>
  );
}

export default Cart;