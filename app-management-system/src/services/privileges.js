export const getPrivileges = (name) => {
    const privileges = localStorage.getItem("user");
    if (!privileges) return [];
    const privilegesObject = JSON.parse(privileges);
    const privilegesReport = privilegesObject.filter((privilege) =>
        privilege.name.includes(name)
    );
    return privilegesReport;
};
