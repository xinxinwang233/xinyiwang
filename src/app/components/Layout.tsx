import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { profileInfo } from '../data';

export function Layout() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 text-center text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} {profileInfo.name}. 保留所有权利。</p>
      </footer>
    </div>
  );
}