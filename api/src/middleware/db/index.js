import Files from "../../models/Files.js";
import Users from "../../models/Users.js";

export const createUserDB = async (input) => {

  const { father, mother, children, email, subCognito } = input;

  try {
    const newUser = new Users({
      subCognito,
      fa_firstname: father.firstname,
      fa_lastname: father.lastname,
      mo_firstname: mother.firstname,
      mo_lastname: mother.lastname,
      ch_firstname: children.firstname,
      ch_lastname: children.lastname,
      ch_birthday: new Date(children.birthdate).toISOString(),
      correo: email
    });

    const response = await newUser.save();

    return {
      id: response.id,
      father: {
        firstname: father.firstname,
        lastname: father.lastname
      },
      mother: {
        firstname: mother.firstname,
        lastname: mother.lastname,
      },
      children: {
        firstname: children.firstname,
        lastname: children.lastname,
        birthday: children.birthdate,
      },
      email: email
    };
  } catch (error) {
    throw error;
  }
}

export const getDataUserById = async ({ id }) => {
  try {
    return await Users.findById(id).exec();
  } catch (error) {
    throw error;
  }
}

export const getDataUserByEmail = async ({ correo }) => {
  try {
    const user = await Users.find({ correo: correo }).exec();

    if (user.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  } catch (error) {
    throw error;
  }
}

export const addAccessUser = async ({ id }) => {
  const accessNow = new Date();
  try {
    const user = await Users.findByIdAndUpdate(
      id,
      { $push: { access: accessNow } },
      { new: true }
    );

    if (!user) {
      new Error('Usuario no encontrado');
    }

    return true;
  } catch (error) {
    throw error;
  }
}

export const getUsers = async (options) => {
  try {
    const users = await Users.find(options);
    return users;
  } catch (error) {
    throw error;
  }
}

export const getFiles = async () => {
  try {
    const users = await Files.aggregate([
      {
        $project: {
          namefile: 1,
          path: 1,
          downloads: {
            $size: "$access"
          },
          createdAt: 1
        }
      }
    ]);
    return users;
  } catch (error) {
    throw error;
  }
}

export const getFilesWithRange = async ({ start, end }) => {
  try {
    const users = await Files.aggregate([
      {
        $project: {
          namefile: 1,
          path: 1,
          downloads: {
            $size: {
              $filter: {
                input: "$access",
                as: "accessDate",
                cond: {
                  $and: [
                    { $gte: ["$$accessDate", start] },
                    { $lte: ["$$accessDate", end] }
                  ]
                }
              }
            }
          },
          createdAt: 1
        }
      }
    ]);
    return users;
  } catch (error) {
    throw error;
  }
}