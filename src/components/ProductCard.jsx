import { Card, CardContent, CardActions, Typography, Button, Box, Rating, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import useThemeStore from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';

function ProductCard({ id, title, price, thumbnail, category, rating, discountPercentage, stock }) {
  const dispatch  = useDispatch();
  const { theme } = useThemeStore();
  const { t }     = useLanguage();

  const bg     = theme === 'dark' ? '#171717' : '#fff';
  const bgImg  = theme === 'dark' ? '#0a0a0a' : '#fafafa';
  const border = theme === 'dark' ? '#262626' : '#f0f0f0';
  const text   = theme === 'dark' ? '#fff' : '#0a0a0a';
  const muted  = theme === 'dark' ? '#737373' : '#a3a3a3';
  const sub    = theme === 'dark' ? '#a3a3a3' : '#737373';

  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <Card sx={{
      height: '100%', display: 'flex', flexDirection: 'column',
      backgroundColor: bg, border: `1px solid ${border}`, boxShadow: 'none', borderRadius: 2,
      transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(255,255,255,0.05)' : '0 8px 32px rgba(0,0,0,0.08)',
        borderColor: theme === 'dark' ? '#404040' : '#d4d4d4',
      },
    }}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{
          height: 200, backgroundColor: bgImg, borderBottom: `1px solid ${border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2,
        }}>
          <Box component="img" src={thumbnail} alt={title}
            sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
        </Box>
        {discountPercentage > 5 && (
          <Chip label={`-${Math.round(discountPercentage)}%`} size="small" sx={{
            position: 'absolute', top: 10, right: 10,
            backgroundColor: '#dc2626', color: '#fff', fontSize: '10px', height: 22, fontWeight: 500, borderRadius: '4px',
          }} />
        )}
        {stock <= 10 && (
          <Chip label={t('lowStock')} size="small" sx={{
            position: 'absolute', top: 10, left: 10,
            backgroundColor: '#f59e0b', color: '#fff', fontSize: '10px', height: 22, fontWeight: 500, borderRadius: '4px',
          }} />
        )}
      </Box>

      <CardContent sx={{ flex: 1, px: 2, pt: 1.75, pb: 1 }}>
        <Typography sx={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: muted, fontWeight: 500, mb: 0.75 }}>
          {category}
        </Typography>
        <Typography fontWeight={500} sx={{
          color: text, fontSize: '14px', lineHeight: 1.4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {title}
        </Typography>
        {rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.75 }}>
            <Rating value={rating} precision={0.5} size="small" readOnly
              sx={{ '& .MuiRating-iconFilled': { color: '#f59e0b' }, fontSize: '14px' }} />
            <Typography sx={{ fontSize: '11px', color: muted }}>{rating}</Typography>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{
        px: 2, pb: 2, pt: 1, borderTop: `1px solid ${border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Box>
          <Typography component="span" fontWeight={500} sx={{ fontSize: '18px', color: text }}>
            ${price}
          </Typography>
          {originalPrice && (
            <Typography component="span" sx={{ fontSize: '12px', color: muted, textDecoration: 'line-through', ml: 0.75 }}>
              ${originalPrice}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          <Button size="small" variant="outlined" component={Link} to={`/product/${id}`}
            sx={{ borderColor: border, color: sub, borderRadius: '6px', fontSize: '12px', px: 1.5,
                  '&:hover': { borderColor: text, color: text, backgroundColor: 'transparent' } }}>
            {t('details')}
          </Button>
          <Button size="small" variant="contained"
            onClick={() => dispatch(addToCart({ id, title, price, image: thumbnail, category, rating, quantity: 1 }))}
            sx={{ backgroundColor: text, color: bg, borderRadius: '6px', fontSize: '12px', px: 1.5,
                  '&:hover': { backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626' } }}>
            {t('addToCart')}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ProductCard;