import { ThemeProvider } from '@material-ui/styles';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
