import { Box, Typography, Divider } from '@mui/material';
import useThemeStore from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { theme } = useThemeStore();
  const { t }     = useLanguage();

  const bg    = theme === 'dark' ? '#0a0a0a' : '#fff';
  const border = theme === 'dark' ? '#262626' : '#f0f0f0';
  const text  = theme === 'dark' ? '#fff' : '#0a0a0a';
  const muted = theme === 'dark' ? '#737373' : '#a3a3a3';
  const sub   = theme === 'dark' ? '#a3a3a3' : '#737373';

  return (
    <>
      <Divider sx={{ borderColor: border }} />
      <Box sx={{
        px: 4, py: 4, backgroundColor: bg,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 2,
      }}>
        <Typography sx={{ fontSize: '15px', fontWeight: 500, color: text, letterSpacing: '-0.5px' }}>
          my<span style={{ fontWeight: 700 }}>store</span>
        </Typography>
        <Typography sx={{ fontSize: '13px', color: muted }}>
          © {new Date().getFullYear()} mystore. {t('rights')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {[t('privacy'), t('terms'), t('contact')].map(link => (
            <Typography key={link} sx={{
              fontSize: '13px', color: sub, cursor: 'pointer',
              '&:hover': { color: text }, transition: 'color 0.15s',
            }}>
              {link}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Footer;