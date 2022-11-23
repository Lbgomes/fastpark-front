import axios from "axios";
import UserForCreate from "../models/forCreate/UserForCreate";
import Users from "../models/users";

export const getAllUsers = async (): Promise<Users> => {
  const user = (await axios.get("http://localhost:6060/users/list")).data;
  return user;
};

export const updateUser = async (updatedUser: UserForCreate) => {
  const user = (
    await axios.post("http://localhost:6060/users/update", updatedUser)
  ).data;
  return user;
};

export const handleUser = async (userId: { id: string }) => {
  const user = (await axios.post("http://localhost:6060/users/disable", userId))
    .data;
  return user;
};
