import { content } from "@/config/content";

export function Footer() {
  const b = content.brand;
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-tight py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.logo} alt={b.name} className="h-12 w-auto mb-5" />
            <p className="text-sm text-muted leading-relaxed max-w-xs">{content.footer.tagline}</p>
          </div>

          {/* Link columns */}
          {content.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs uppercase tracking-[0.14em] text-muted-dim font-semibold mb-4">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm link-quiet">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-muted-dim font-semibold mb-4">Follow</h3>
            <ul className="space-y-3">
              <li>
                <a href={b.youtube} target="_blank" rel="noopener noreferrer" className="text-sm link-quiet">
                  YouTube
                </a>
              </li>
              <li>
                <a href={b.instagram} target="_blank" rel="noopener noreferrer" className="text-sm link-quiet">
                  Instagram
                </a>
              </li>
              <li>
                <a href={b.privacyUrl} target="_blank" rel="noopener noreferrer" className="text-sm link-quiet">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border">
          <p className="text-xs text-muted-dim leading-relaxed max-w-3xl">{content.footer.disclaimer}</p>
          <p className="mt-4 text-xs text-muted-dim">© 2026 {b.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
