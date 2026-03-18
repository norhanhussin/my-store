import { Box, Typography, Button, Skeleton, Card, CardContent } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import useThemeStore from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';

function ProductSkeleton() {
  const { theme } = useThemeStore();
  const skBg = theme === 'dark' ? '#262626' : '#f5f5f5';
  return (
    <Card sx={{ border: `1px solid ${theme === 'dark' ? '#262626' : '#f0f0f0'}`, boxShadow: 'none', borderRadius: 2, backgroundColor: theme === 'dark' ? '#171717' : '#fff' }}>
      <Skeleton variant="rectangular" height={200} sx={{ backgroundColor: skBg }} />
      <CardContent>
        <Skeleton width="40%" sx={{ backgroundColor: skBg, mb: 1 }} />
        <Skeleton sx={{ backgroundColor: skBg }} />
        <Skeleton width="60%" sx={{ backgroundColor: skBg }} />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" height={32} sx={{ flex: 1, backgroundColor: skBg }} />
          <Skeleton variant="rounded" height={32} sx={{ flex: 1, backgroundColor: skBg }} />
        </Box>
      </CardContent>
    </Card>
  );
}

function ProductsList() {
  const { theme }  = useThemeStore();
  const { t }      = useLanguage();

  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data.slice(0, 6)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = category
      ? `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=12`
      : 'https://dummyjson.com/products?limit=12';
    fetch(url)
      .then(res => { if (!res.ok) throw new Error('Failed to fetch'); return res.json(); })
      .then(data => { setProducts(data.products); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, [category]);

  const bg   = theme === 'dark' ? '#0a0a0a' : '#fff';
  const border = theme === 'dark' ? '#262626' : '#f0f0f0';
  const text = theme === 'dark' ? '#fff' : '#0a0a0a';
  const muted = theme === 'dark' ? '#a3a3a3' : '#737373';

  const heading = category
    ? `${t('currBrowse')} ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : t('allProducts');

  return (
    <Box sx={{ backgroundColor: bg }}>
      {/* Hero */}
      <Box sx={{ borderBottom: `1px solid ${border}`, px: 4, py: 5.5, backgroundColor: bg }}>
        <Box sx={{
          display: 'inline-flex', backgroundColor: theme === 'dark' ? '#262626' : '#f5f5f5',
          color: theme === 'dark' ? '#fff' : '#171717',
          fontSize: '12px', px: 1.5, py: 0.5, borderRadius: '6px', fontWeight: 500, mb: 1.5,
        }}>
          {t('heroTag')}
        </Box>
        <Typography variant="h3" fontWeight={500} sx={{ color: text, letterSpacing: '-1px', lineHeight: 1.2 }}>
          {t('heroTitle1')}<br />{t('heroTitle2')} <span style={{ fontWeight: 700 }}>{t('heroTitle3')}</span>
        </Typography>
        <Typography sx={{ color: muted, mt: 1.25, fontSize: '15px', lineHeight: 1.6 }}>
          {t('heroSub')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.25, mt: 2.25 }}>
          <Button variant="contained"
            sx={{ backgroundColor: text, color: bg, borderRadius: '8px', px: 3,
                  '&:hover': { backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626' } }}>
            {t('shopNow')}
          </Button>
          <Button variant="outlined"
            sx={{ borderColor: border, color: muted, borderRadius: '8px', px: 3,
                  '&:hover': { borderColor: text, color: text, backgroundColor: 'transparent' } }}>
            {t('viewColl')}
          </Button>
        </Box>
      </Box>

      {/* Toolbar */}
      <Box sx={{
        borderBottom: `1px solid ${border}`, px: 4, py: 1.5, backgroundColor: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1,
      }}>
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          <Button size="small" onClick={() => setSearchParams({})}
            variant={category === '' ? 'contained' : 'outlined'}
            sx={category === ''
              ? { backgroundColor: text, color: bg, borderRadius: '6px', fontSize: '12px', '&:hover': { backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626' } }
              : { borderColor: border, color: muted, borderRadius: '6px', fontSize: '12px', '&:hover': { borderColor: text, color: text, backgroundColor: 'transparent' } }
            }>
            {t('all')}
          </Button>
          {categories.map(cat => {
            const val   = typeof cat === 'string' ? cat : cat.slug;
            const label = typeof cat === 'string' ? cat : cat.name;
            return (
              <Button key={val} size="small"
                onClick={() => setSearchParams({ category: val })}
                variant={category === val ? 'contained' : 'outlined'}
                sx={category === val
                  ? { backgroundColor: text, color: bg, borderRadius: '6px', fontSize: '12px', '&:hover': { backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626' } }
                  : { borderColor: border, color: muted, borderRadius: '6px', fontSize: '12px', '&:hover': { borderColor: text, color: text, backgroundColor: 'transparent' } }
                }>
                {label}
              </Button>
            );
          })}
        </Box>
        <Typography sx={{ fontSize: '13px', color: muted }}>
          <strong style={{ color: text }}>{loading ? '...' : products.length}</strong> {t('products')}
        </Typography>
      </Box>

      {/* Products */}
      <Box sx={{ px: 4, py: 2.5, backgroundColor: bg }}>
        <Typography sx={{ fontSize: '13px', color: muted, mb: 1.5 }}>
          {t('showing')} <strong style={{ color: text }}>{heading}</strong>
        </Typography>

        {error && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography sx={{ color: '#dc2626', mb: 2 }}>⚠ {error}</Typography>
            <Button variant="outlined" onClick={() => setSearchParams({})}
              sx={{ borderColor: border, color: muted, borderRadius: '8px' }}>
              Try again
            </Button>
          </Box>
        )}

        {!error && (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2,
          }}>
            {loading
              ? Array(6).fill(0).map((_, i) => <ProductSkeleton key={i} />)
              : products.map(product => <ProductCard key={product.id} {...product} />)
            }
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProductsList;