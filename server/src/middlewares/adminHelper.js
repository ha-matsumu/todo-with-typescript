module.exports = userRoleId => {
  USER_ROLE_ADMIN_ID = 1;

  if (userRoleId === USER_ROLE_ADMIN_ID) {
    return true;
  }
  return false;
};
