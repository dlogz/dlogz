import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          © 2025 Dlogz. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:underline"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:underline"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:underline"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
