import Link from 'next/link';

export function Header() {
  const menuItems = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'من نحن' },
    { href: '/services', label: 'خدماتنا' },
    { href: '/products', label: 'المنتجات' },
    { href: '/media', label: 'الوسائط' },
    { href: '/memberships', label: 'العضويات' },
    { href: '/contact', label: 'اتصل بنا' },
    { href: '/appointment', label: 'حجز موعد' },
  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            Elite Vet
          </Link>
          
          <div className="hidden md:flex space-x-6 space-x-reverse">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
