import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useThemeStore from '../store/useThemeStore';

// ===== 1. Zod Schema =====
const schema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

function Login() {
  const navigate  = useNavigate();
  const login     = useAuthStore(state => state.login);
  const { theme } = useThemeStore();

  const bg     = theme === 'dark' ? '#0a0a0a' : '#fff';
  const bgCard = theme === 'dark' ? '#1e1e1e' : '#fff';
  const border = theme === 'dark' ? '#262626' : '#f0f0f0';
  const text   = theme === 'dark' ? '#fff' : '#0a0a0a';
  const sub    = theme === 'dark' ? '#a3a3a3' : '#737373';

  // ===== 2. useForm + zodResolver =====
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ===== 3. onSubmit =====
  const onSubmit = (data) => {
    console.log('Validated data:', data);

    // Simulate API response بـ fake token
    const fakeToken = 'fake-jwt-token-123';
    login(fakeToken);

    // روح الـ home بعد اللوجين
    navigate('/');
  };

  return (
    <Box sx={{ backgroundColor: bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{
        width: '100%', maxWidth: 420, mx: 'auto', px: 3,
      }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" fontWeight={500} sx={{ color: text, letterSpacing: '-0.5px' }}>
            my<span style={{ fontWeight: 700 }}>store</span>
          </Typography>
          <Typography sx={{ color: sub, mt: 1, fontSize: '14px' }}>
            Sign in to your account
          </Typography>
        </Box>

        {/* Card */}
        <Box sx={{ backgroundColor: bgCard, border: `1px solid ${border}`, borderRadius: 3, p: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              {/* Email */}
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 500, color: text, mb: 0.75 }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  placeholder="you@example.com"
                  type="email"
                  size="small"
                  {...register('email')}
                  error={!!errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: bg,
                      borderRadius: '8px',
                      '& fieldset': { borderColor: border },
                      '&:hover fieldset': { borderColor: text },
                      '& input': { color: text, fontSize: '14px' },
                    },
                  }}
                />
                {/* Error Message */}
                {errors.email && (
                  <Typography sx={{ fontSize: '12px', color: '#dc2626', mt: 0.5 }}>
                    {errors.email.message}
                  </Typography>
                )}
              </Box>

              {/* Password */}
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 500, color: text, mb: 0.75 }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  placeholder="••••••••"
                  type="password"
                  size="small"
                  {...register('password')}
                  error={!!errors.password}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: bg,
                      borderRadius: '8px',
                      '& fieldset': { borderColor: border },
                      '&:hover fieldset': { borderColor: text },
                      '& input': { color: text, fontSize: '14px' },
                    },
                  }}
                />
                {/* Error Message */}
                {errors.password && (
                  <Typography sx={{ fontSize: '12px', color: '#dc2626', mt: 0.5 }}>
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              {/* Hint */}
              <Alert severity="info" sx={{ fontSize: '12px', py: 0 }}>
                Use any email + password (8+ chars)
              </Alert>

              {/* Submit */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  backgroundColor: text, color: bg, borderRadius: '8px',
                  py: 1.25, fontSize: '14px', fontWeight: 500,
                  '&:hover': { backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626' },
                }}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>

            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;