export function Footer() {
  return (
    <footer className="w-full py-6 border-t text-center text-muted-foreground text-xs sm:text-sm bg-background">
      &copy; {new Date().getFullYear()} YourPlatformName. All rights reserved.
    </footer>
  );
}
