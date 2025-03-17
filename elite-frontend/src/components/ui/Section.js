export function Section({ children, className = '', bgColor = 'bg-white' }) {
  return (
    <section className={`py-16 ${bgColor} ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
