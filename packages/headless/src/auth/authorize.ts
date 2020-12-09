import {
  isServerSide,
  parseUrl,
  trimLeadingSlashes,
  trimTrailingSlash,
} from '../utils';
import { getAccessToken } from './cookie';

const WP_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL,
);
const AUTH_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_AUTHORIZATION_URL ||
    process.env.AUTHORIZATION_URL ||
    '/api/auth/wpe-headless',
);

const API_CLIENT_SECRET = process.env.WPE_HEADLESS_SECRET;

if (!API_CLIENT_SECRET && isServerSide()) {
  throw new Error(
    'WPE_HEADLESS_SECRET environment variable is not set. Please set it to your WPGraphQL endpoint if you wish to use authenticated API calls.',
  );
}

export async function authorize(code: string) {
  const response = await fetch(
    `${WP_URL as string}/wp-json/wpac/v1/authorize`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-wpe-headless-secret': API_CLIENT_SECRET as string,
      },
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
    },
  );

  const result = (await response.json()) as { access_token?: string };

  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw {
      error: result,
      status: response.status,
    };
  }

  return result;
}

// eslint-disable-next-line consistent-return
export function ensureAuthorization<T>(
  url: string,
): string | { redirect: string } {
  const accessToken = getAccessToken();

  if (!!accessToken && accessToken.length > 0) {
    return accessToken;
  }

  const parsedUrl = parseUrl(url);

  if (!parsedUrl) {
    throw new Error('Invalid url for authorization');
  }

  const { baseUrl } = parsedUrl;

  return {
    redirect: `${WP_URL as string}/generate?redirect_uri=${encodeURIComponent(
      `${baseUrl}/${
        trimLeadingSlashes(AUTH_URL as string) as string
      }?redirect_uri=${encodeURIComponent(url)}`,
    )}`,
  };
}