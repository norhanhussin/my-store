import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';

function NotFound() {
  const navigate  = useNavigate();
  const { theme } = useThemeStore();
  const { t }     = useLanguage();

  const bg   = theme === 'dark' ? '#0a0a0a' : '#fff';
  const text = theme === 'dark' ? '#fff' : '#0a0a0a';

  return (
    <Box sx={{ textAlign: 'center', py: 10, backgroundColor: bg, minHeight: '100vh' }}>
      <Typography variant="h1" sx={{ color: theme === 'dark' ? '#262626' : '#f0f0f0', fontWeight: 500, fontSize: '96px' }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ color: theme === 'dark' ? '#a3a3a3' : '#737373', fontWeight: 400 }}>
        {t('notFoundSub')}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}
        sx={{ mt: 3, backgroundColor: text, color: bg, borderRadius: '8px',
              '&:hover': { backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626' } }}>
        {t('goHome')}
      </Button>
    </Box>
  );
}

export default NotFound;