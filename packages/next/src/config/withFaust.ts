import { trim } from 'lodash';
import isFunction from 'lodash/isFunction.js';
import { NextConfig } from 'next';
import { Redirect } from 'next/dist/lib/load-custom-routes.js';

export interface WithFaustConfig {
  previewDestination?: string;
}

export function previewSourceRedirectRegex(previewDestination: string) {
  return `/((?!${previewDestination}).*)`;
}

export const DEFAULT_PREVIEW_DESTINATION = '/preview';

export async function createRedirects(
  redirectFn?: NextConfig['redirects'],
  previewDestination = DEFAULT_PREVIEW_DESTINATION,
): Promise<Redirect[]> {
  let redirects: Redirect[] = [];

  if (isFunction(redirectFn)) {
    redirects = await redirectFn();
  }

  redirects.unshift({
    source: previewSourceRedirectRegex(previewDestination),
    has: [
      {
        type: 'query',
        key: 'preview',
        value: 'true',
      },
    ],
    destination: `/${trim(previewDestination, '/')}`,
    permanent: false,
  });

  return redirects;
}

/**
 * A helper function to merge Faust.js related Next.js config with a user defined Next.js config.
 *
 * @param {NextConfig} config
 * @param {withFaustConfig} withFaustConfig
 * @returns {NextConfig}
 */
export function withFaust(
  config?: NextConfig,
  withFaustConfig?: WithFaustConfig,
): NextConfig {
  const { previewDestination } = withFaustConfig || {};

  const nextConfig = config ?? {};

  const existingRedirects = nextConfig.redirects;
  nextConfig.redirects = () =>
    createRedirects(existingRedirects, previewDestination);

  return nextConfig;
}
