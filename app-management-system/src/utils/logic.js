export const getCsv = async ({ callback, name }) => {
  try {
    const response = await callback();
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al descargar CSV:", error);
  }
};

export const getPrivileges = (name) => {
  const item = localStorage.getItem("user");

  if (!item) return [];

  const { privileges } = JSON.parse(item);
  const privilegesReport = privileges.filter((privilege) =>
    privilege.name.includes(name)
  );

  return privilegesReport;
};
