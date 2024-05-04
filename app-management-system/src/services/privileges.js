export const getPrivileges = (name) => {
  const item = localStorage.getItem("user");

  if (!item) return [];

  const { privileges } = JSON.parse(item);
  const privilegesReport = privileges.filter((privilege) =>
    privilege.name.includes(name)
  );

  return privilegesReport;
};
