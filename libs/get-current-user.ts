import { account, avatar } from '@/libs/appwrite';

export const getCurrentUser = async () => {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
