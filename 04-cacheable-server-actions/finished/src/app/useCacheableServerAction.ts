import { useEffect } from "react";
import sha256 from "crypto-js/sha256";

export function useCacheableServerAction() {
  useEffect(() => {
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      let [resource, config] = args;
      if (
        // @ts-ignore
        config?.headers?.["Next-Action"] &&
        config.method === "POST" &&
        config.body
      ) {
        // @ts-ignore
        const json = JSON.parse(config.body);
        const hash = await sha256(
          // @ts-ignore
          `${config?.headers?.["Next-Action"]}:${JSON.stringify(json)}`
        );
        resource = `?hash=${hash}`;
      }
      const response = await originalFetch(resource, config);
      return response;
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, []);
}
