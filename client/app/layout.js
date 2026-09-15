import './globals.css';

export const metadata = {
  title: 'Todo App',
  description: 'A to-do app built with Next.js and Express'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}