import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 mt-8 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Dream Canvas by{' '}
          <span className="font-semibold text-indigo-600">Nikilesh Reddy T</span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}