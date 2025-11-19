const API_URL = 'https://jsonplaceholder.typicode.com';
const POSTS_ENDPOINT = `${API_URL}/posts`;

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/**
 * Generic helper to validate fetch responses and parse JSON
 */
async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorMessage = `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

/**
 * Fetches all posts from JSONPlaceholder
 */
export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(POSTS_ENDPOINT);
  return parseResponse<Post[]>(response);
}

/**
 * Fetches a single post by id from JSONPlaceholder
 */
export async function fetchPostById(id: number | string): Promise<Post> {
  const response = await fetch(`${POSTS_ENDPOINT}/${id}`);
  return parseResponse<Post>(response);
}

export const apiClient = {
  fetchPosts,
  fetchPostById,
};


