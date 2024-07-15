import xl from "excel4node";
import formatDate from "../../helpers/formatDate";

export const createFileWhithRange = (req, res, next) => {

  const { newUsers, accessUsers, downloadsFiles, start, end } = req.body.data;

  const workbook = xl.Workbook();
  const sheet01 = workbook.addWorksheet("Resumen");
  const sheet02 = workbook.addWorksheet("Usuarios Nuevos");
  const sheet03 = workbook.addWorksheet("Accesos");
  const sheet04 = workbook.addWorksheet("Materiales");

  // ------- HOJA DE RESUMEN ------- //

  sheet01.cell(1, 1, 1, 4, true).string("REPORTE - DOCTOR MUELITAS 2024");
  sheet01.cell(3, 1).string("Fecha inicio");
  sheet01.cell(3, 1).date(formatDate(start));
  sheet01.cell(4, 1).string("Fecha fin");
  sheet01.cell(3, 1).date(formatDate(end));

  sheet01.cell(5, 2).string("Cantidad");
  sheet01.cell(6, 1).string("Usuarios Nuevos");
  sheet01.cell(6, 2).number(newUsers.length);
  sheet01.cell(7, 1).string("Usuarios Accedidos");
  sheet01.cell(7, 2).number(accessUsers.length);
  sheet01.cell(8, 1).string("Materiales Descargados");
  sheet01.cell(8, 2).number(downloadsFiles.length);



}