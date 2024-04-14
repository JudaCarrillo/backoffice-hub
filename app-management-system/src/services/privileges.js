export const getPrivilegesReport = () => {
    const privileges = localStorage.getItem("user");
    const privilegesObject = JSON.parse(privileges);
    const privilegesReport = privilegesObject.filter((privilege) =>
        privilege.name.includes("Report")
    );
    return privilegesReport;
};

export const privilegesReport = getPrivilegesReport();

export const getPrivilegesWrite = () => {
    const privileges = localStorage.getItem("user");
    const privilegesObject = JSON.parse(privileges);
    const privilegesWrite = privilegesObject.filter((privilege) =>
        privilege.name.includes("Write")
    );
    return privilegesWrite;
}

export const privilegesWrite = getPrivilegesWrite()