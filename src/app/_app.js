import "@/globals.css";
import AppProvider from "@/Constants/AppProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
