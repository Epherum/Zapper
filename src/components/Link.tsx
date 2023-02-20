import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Link({
  children,
  href,
  prefetch = true,
  replace = false,
  shallow = false,
  openNewWindow = true,
  ...props
}: any) {
  const router = useRouter();
  const { asPath } = router;
  const externalLink =
    href.startsWith("https://") || href.startsWith("http://");

  /* Prefetching */
  useEffect(() => {
    if (prefetch && !externalLink) {
      router.prefetch(href);
    }
  }, [router, href, prefetch, externalLink]);

  /* If href is equal to current route, return children */
  if (asPath == href) return <span {...props}>{children}</span>;

  /* Create custom event on click and dispatch it */
  const clickHandler = (event: any) => {
    if (externalLink) return;
    event.preventDefault();
    const linkClickedEvent = new CustomEvent("onLinkClicked", {
      detail: { href: href, replace: replace, shallow: shallow },
    });
    document.dispatchEvent(linkClickedEvent);
  };

  return (
    <a {...props} href={href} onClick={clickHandler}>
      {children}
    </a>
  );
}
