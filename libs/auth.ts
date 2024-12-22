import * as Link from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { OAuthProvider } from 'react-native-appwrite';

import { account } from '@/libs/appwrite';

export const login = async () => {
  try {
    const redirectURL = Link.createURL('/');
    const url = account.createOAuth2Token(OAuthProvider.Google, redirectURL);

    if (!url) throw new Error('Failed google authorize');

    const browserResult = await openAuthSessionAsync(url.href.toString(), redirectURL);

    if (browserResult.type !== 'success') throw new Error('Failed google session');

    const urlObject = new URL(browserResult.url);
    const secret = urlObject.searchParams.get('secret')?.toString();
    const userId = urlObject.searchParams.get('userId')?.toString();

    if (!secret || !userId) throw new Error('Failed to login');

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error('Failed create session');

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
