const API_URL = 'https://jsonplaceholder.typicode.com';
const POSTS_ENDPOINT = `${API_URL}/posts`;
const USERS_ENDPOINT = `${API_URL}/users`;

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
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

/**
 * Fetches a single user by id from JSONPlaceholder
 */
export async function fetchUserById(id: number | string): Promise<User> {
  const response = await fetch(`${USERS_ENDPOINT}/${id}`);
  return parseResponse<User>(response);
}

export const apiClient = {
  fetchPosts,
  fetchPostById,
  fetchUserById,
};


