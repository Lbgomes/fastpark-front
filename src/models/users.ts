interface Users {
  status: number;
  users: [
    {
      id: string;
      email: string;
      name: string;
      disabled: boolean;
    }
  ];
}

export default Users;
