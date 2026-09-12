/**
 * Global footer shared across all site routes.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10 text-muted-foreground">
      <div className="container mx-auto px-4">
        <p className="text-sm text-center">
          © {new Date().getFullYear()} TechTonic Club. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
}
