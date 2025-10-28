import api from "../utils/axios";
import type { User } from "../Types/User";

const USERS_ENDPOINT = "/users";

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>(USERS_ENDPOINT);
  return data;
}

export async function createUser(payload: Omit<User, "id">): Promise<User> {
  const { data } = await api.post<User>(USERS_ENDPOINT, payload);
  return data;
}

export async function updateUser(payload: User): Promise<User> {
  const { data } = await api.put<User>(USERS_ENDPOINT + '/' +  payload.id, payload);
  return data;
}