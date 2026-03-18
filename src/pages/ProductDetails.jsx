import { Box, Typography, Button, Rating, Chip, Skeleton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import useThemeStore from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';

function ProductDetails() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { theme } = useThemeStore();
  const { t }     = useLanguage();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const bg     = theme === 'dark' ? '#0a0a0a' : '#fff';
  const bgCard = theme === 'dark' ? '#171717' : '#fff';
  const bgImg  = theme === 'dark' ? '#0a0a0a' : '#fafafa';
  const border = theme === 'dark' ? '#262626' : '#f0f0f0';
  const text   = theme === 'dark' ? '#fff' : '#0a0a0a';
  const sub    = theme === 'dark' ? '#a3a3a3' : '#737373';
  const skBg   = theme === 'dark' ? '#262626' : '#f5f5f5';

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => { if (!res.ok) throw new Error('Product not found'); return res.json(); })
      .then(data  => { setProduct(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, [id]);

  return (
    <Box sx={{ backgroundColor: bg, minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 700, mx: 'auto', px: 3, py: 4 }}>
        <Typography sx={{ fontSize: '12px', color: sub, mb: 2 }}>
          <span style={{ color: text, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/')}>{t('home')}</span> / {t('details')}
        </Typography>

        {loading && (
          <Box sx={{ border: `1px solid ${border}`, borderRadius: 3, overflow: 'hidden', backgroundColor: bgCard }}>
            <Skeleton variant="rectangular" height={300} sx={{ backgroundColor: skBg }} />
            <Box sx={{ p: 3 }}>
              <Skeleton width="30%" sx={{ backgroundColor: skBg, mb: 1 }} />
              <Skeleton width="80%" height={32} sx={{ backgroundColor: skBg }} />
              <Skeleton width="20%" height={40} sx={{ backgroundColor: skBg, mt: 1 }} />
              <Skeleton sx={{ backgroundColor: skBg, mt: 2 }} />
              <Skeleton sx={{ backgroundColor: skBg }} />
            </Box>
          </Box>
        )}

        {error && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography sx={{ color: '#dc2626', mb: 2 }}>⚠ {error}</Typography>
            <Button variant="outlined" onClick={() => navigate('/')}
              sx={{ borderColor: border, color: sub, borderRadius: '8px' }}>
              {t('back')}
            </Button>
          </Box>
        )}

        {!loading && !error && product && (
          <Box sx={{ border: `1px solid ${border}`, borderRadius: 3, overflow: 'hidden', backgroundColor: bgCard }}>
            <Box sx={{
              height: 300, backgroundColor: bgImg, borderBottom: `1px solid ${border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4,
            }}>
              <Box component="img" src={product.thumbnail} alt={product.title}
                sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </Box>

            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                <Box sx={{
                  backgroundColor: theme === 'dark' ? '#262626' : '#f5f5f5',
                  color: sub, fontSize: '11px', px: 1.25, py: 0.5, borderRadius: '6px', fontFamily: 'monospace',
                }}>
                  {t('productId')}: {product.id}
                </Box>
                <Chip label={product.category} size="small" sx={{
                  fontSize: '11px', height: 22,
                  backgroundColor: theme === 'dark' ? '#262626' : '#f5f5f5', color: sub,
                }} />
                {product.stock <= 10 && (
                  <Chip label={t('lowStock')} size="small" sx={{
                    fontSize: '11px', height: 22, backgroundColor: '#fef3c7', color: '#92400e',
                  }} />
                )}
              </Box>

              <Typography variant="h5" fontWeight={500} sx={{ color: text, lineHeight: 1.3 }}>
                {product.title}
              </Typography>

              {product.brand && (
                <Typography sx={{ fontSize: '13px', color: sub, mt: 0.5 }}>
                  {t('by')} <strong>{product.brand}</strong>
                </Typography>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Rating value={product.rating} precision={0.5} size="small" readOnly
                  sx={{ '& .MuiRating-iconFilled': { color: '#f59e0b' } }} />
                <Typography sx={{ fontSize: '12px', color: sub }}>
                  {product.rating} / 5 — {t('reviews')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mt: 1.5 }}>
                <Typography variant="h4" fontWeight={500} sx={{ color: text }}>
                  ${product.price}
                </Typography>
                {product.discountPercentage > 5 && (
                  <Chip label={`-${Math.round(product.discountPercentage)}% OFF`} size="small" sx={{
                    backgroundColor: '#dc2626', color: '#fff', fontSize: '11px', height: 22, fontWeight: 500,
                  }} />
                )}
              </Box>

              <Typography sx={{ color: sub, mt: 2, lineHeight: 1.7, fontSize: '14px' }}>
                {product.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
                <Button variant="outlined" onClick={() => navigate('/')}
                  sx={{ borderColor: border, color: sub, borderRadius: '8px',
                        '&:hover': { borderColor: text, color: text, backgroundColor: 'transparent' } }}>
                  {t('back')}
                </Button>
                <Button variant="contained"
                  onClick={() => dispatch(addToCart({
                    id: product.id, title: product.title, price: product.price,
                    image: product.thumbnail, category: product.category, quantity: 1,
                  }))}
                  sx={{ flex: 1, backgroundColor: text, color: bg, borderRadius: '8px',
                        '&:hover': { backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626' } }}>
                  {t('addToCartFull')}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProductDetails;