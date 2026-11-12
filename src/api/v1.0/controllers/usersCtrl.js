const usersDb = [
  {
    id: 'user_60c72b2f9b1d8b001558f65a',
    username: 'johndoe',
    firstName: 'Иван',
    surName: 'Иванов',
    middleName: 'Иванович',
    image: '/storage/img/user_1.png',
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    }
  },
  {
    id: 'user_37390dfe3f4g5gdfs5454df3',
    username: 'janedoe',
    firstName: 'Мария',
    surName: 'Иванова',
    middleName: 'Ивановна',
    image: '/storage/img/user_2.png',
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    }
  }
];

export async function getUsers(ctx, next) {

  const totalCount = 42; // Общее количество пользователей в БД

  ctx.status = 200;
  ctx.body = {
    data: usersDb,
    meta: {
      total: totalCount,
      limit: 10,
      page: 1
    }
  };

  console.log("[GET USERS]");
}

export async function patchUser(ctx, next) {
  const copyDB = [...usersDb];

  const { permission } = ctx.request.body;
  const userId = ctx.request.params.id;

  const editItem = copyDB.find(item => item.id === userId);

  if (!editItem) ctx.throw(500, 'Ошибка: пользователь не найден');

  editItem.permission = permission;

  ctx.status = 200;
  ctx.body = editItem;

  console.log("[PATCH USER]");
}

export function deleteUser(ctx, next) {
  const copyDB = [...usersDb];
  const userId = ctx.request.params.id;

  const indUserById = copyDB.findIndex(item => item.id === userId);

  if (indUserById === -1) ctx.throw(500, 'Ошибка: пользователь не найден');

  copyDB.slice(indUserById, 1);

  ctx.status = 200;
  ctx.body = `Пользователь ${copyDB[indUserById].username} успешно удален.`;

  console.log("[DELETE USER]");
}

export async function getProfile(ctx, next) {

  ctx.status = 200;
  ctx.body = usersDb[0];

  console.log("[GET PROFILE]");
}

export async function patchProfile(ctx, next) {
  const { firstName, middleName, surName, oldPassword, newPassword, avatar } = ctx.request.body;

  let fileName;
  if (ctx.file) fileName = ctx.file.originalname;
  if (!fileName) fileName = 'default.png';

  ctx.status = 200;
  ctx.body = {
    ...usersDb[0],
    firstName,
    surName,
    middleName,
    image: `/storage/temp/${fileName}`
  };

  console.log("[PATCH PROFILE]");
}