import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Savaria Fashion — Premium Clothing & Style',
  description: 'Discover the latest fashion trends at Savaria Fashion. Shop premium clothing, accessories and more with fast delivery across India.',
  keywords: 'fashion, clothing, premium, online shopping, savaria',
  openGraph: {
    title: 'Savaria Fashion',
    description: 'Premium Clothing & Style',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: '#1a1a2e', color: '#fff', borderRadius: '12px', fontSize: '14px' },
            success: { iconTheme: { primary: '#c9a84c', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  );
}
