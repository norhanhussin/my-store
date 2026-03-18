import { AppBar, Toolbar, Typography, Button, Box, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useThemeStore from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';
import useAuthStore from '../store/useAuthStore';
import Footer from './Footer';

function MainLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme }             = useThemeStore();
  const { t, language, toggleLanguage }    = useLanguage();
  const { token, logout }                  = useAuthStore();
  const cartItems  = useSelector(state => state.cart.cartItems);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const bg     = theme === 'dark' ? '#0a0a0a' : '#fff';
  const border = theme === 'dark' ? '#262626' : '#f0f0f0';
  const text   = theme === 'dark' ? '#fff' : '#0a0a0a';
  const muted  = theme === 'dark' ? '#a3a3a3' : '#404040';
  const hover  = theme === 'dark' ? '#262626' : '#f5f5f5';

  return (
    <Box sx={{ backgroundColor: bg, minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{
        backgroundColor: theme === 'dark' ? '#171717' : '#fff',
        borderBottom: `1px solid ${border}`, boxShadow: 'none',
      }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500, letterSpacing: '-0.5px', color: text }}>
            my<span style={{ fontWeight: 700 }}>store</span>
          </Typography>

          {/* Language Toggle */}
          <Button onClick={toggleLanguage} sx={{
            color: muted, borderRadius: '8px', mr: 1, fontSize: '13px', fontWeight: 500,
            border: `1px solid ${border}`,
            '&:hover': { backgroundColor: hover },
          }}>
            {language === 'en' ? 'عربي' : 'EN'}
          </Button>

          {/* Theme Toggle */}
          <Button onClick={toggleTheme} sx={{
            minWidth: 40, borderRadius: '8px', mr: 1, color: muted,
            '&:hover': { backgroundColor: hover },
          }}>
            {theme === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </Button>

          {/* Home */}
          <Button component={Link} to="/"
            sx={{ color: muted, borderRadius: '8px', '&:hover': { backgroundColor: hover } }}>
            {t('home')}
          </Button>

          {/* Cart */}
          <Button component={Link} to="/cart"
            sx={{
              ml: 1, color: text, border: `1px solid ${border}`, borderRadius: '8px',
              display: 'flex', alignItems: 'center', gap: 0.75,
              '&:hover': { backgroundColor: hover },
            }}>
            <Badge badgeContent={totalItems} sx={{ '& .MuiBadge-badge': { backgroundColor: '#0a0a0a', color: '#fff' } }}>
              <ShoppingCartOutlinedIcon fontSize="small" />
            </Badge>
            {t('cart')} ({totalItems})
          </Button>

          {/* Logout */}
          {token && (
            <Button onClick={() => { logout(); navigate('/login'); }}
              sx={{
                ml: 1, color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px',
                '&:hover': { backgroundColor: '#fef2f2' },
              }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Box sx={{ minHeight: '100vh', backgroundColor: bg }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default MainLayout;