import axios from "axios";
import UserForCreate from "../models/forCreate/UserForCreate";
import Users from "../models/users";

interface DisableUsers {
  id: string
}

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

export const disableUser = async (userId: DisableUsers) => {
  
  const user = (await axios.post("http://localhost:6060/users/disable", userId)).data;
  return user;
};
