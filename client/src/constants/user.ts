interface UserRole {
  ADMIN: number;
  NORMAL: number;
}

interface UserConstants {
  USER_ROLE: UserRole;
}

export const userConstants: UserConstants = {
  USER_ROLE: {
    ADMIN: 1,
    NORMAL: 2,
  },
};
