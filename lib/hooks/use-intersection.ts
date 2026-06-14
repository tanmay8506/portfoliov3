import { useEffect, useRef, useState } from "react";

interface UseIntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersection(
  options: UseIntersectionOptions = {}
) {
  const { threshold = 0, root = null, rootMargin = "0px", freezeOnceVisible = false } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = elementRef.current;
    if (!node || frozen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, frozen]);

  return [elementRef, entry] as const;
}
