import { typeReport } from "../../constants/index.js";
import { getFilesWithRange, getUsers } from "../db/index.js";

export const getDataWhithRange = async (req, res, next) => {

  const { startDate, endDate, report } = req.body;

  let start = new Date();
  let end = new Date();

  if (report === typeReport.MENSUAL) {

    start.setMonth(0);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    end.setDate(0);
    end.setHours(23, 59, 59, 999);

  } else {
    if (!startDate) {
      start = new Date('2024-07-01').setHours(0, 0, 0, 0);
    } else {
      start = new Date(startDate)
    }

    if (!endDate) {
      end = new Date();
    } else {
      end = new Date(endDate)
    }
  }

  try {
    const newUsers = await getUsers({
      createAt: {
        $gte: start,
        $lte: end
      }
    });

    const accessUsers = await getUsers({
      access: {
        $gte: start,
        $lte: end
      }
    });

    const downloadsFiles = await getFilesWithRange({
      downloads: {
        $gte: start,
        $lte: end
      }
    })

    // req.body.data = {
    //   newUsers,
    //   accessUsers,
    //   downloadsFiles,
    //   start,
    //   end
    // }

    res.send({
      newUsers,
      accessUsers,
      downloadsFiles,
      start,
      end
    })

  } catch (error) {
    next(error);
  }
}