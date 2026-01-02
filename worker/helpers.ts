export async function getUserChatURL(username: string): Promise<string> {
  try {
    const response = await fetch(`https://www.reddit.com/user/${username}/about.json`);
    const data = await response.json();
    const userId = data.data.id;
    return `https://chat.reddit.com/user/t2_${userId}`;
  } catch (error) {
    console.error(`Failed to fetch user ID for ${username}:`, error);
    return '';
  }
}