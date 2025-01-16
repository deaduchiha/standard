export type TWhoami = {
  statusCode: number;
  user: {
    fullname: string;
    id: number;
    role: "ADMIN";
    username: string;
  };
};

export type TUser = {
  id: number;
  fullname: string;
  username: string;
  mobile: string;
  role: "CEO" | "technicalInspector" | "technicalManager" | "accountant";
};

export type TUsers = {
  statusCode: number;
  users: TUser[];
};
