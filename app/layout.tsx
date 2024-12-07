import '@coinbase/onchainkit/styles.css';
import "./globals.css";
import { Providers } from './Providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`dark`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html >
  );
}
