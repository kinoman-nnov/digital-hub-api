const usersDb = [
  {
    id: 'user_60c72b2f9b1d8b001558f65a',
    username: 'johndoe',
    firstName: 'Иван',
    surName: 'Иванов',
    middleName: 'Иванович',
    image: '/storage/img/user_1.png',
    properties: {
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
    properties: {
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

export function deleteUser(ctx, next) {
  const copyDB = [...usersDb];
  const userId = ctx.request.params.id;

  const indexUserToDelete = copyDB.findIndex(elem => userId === elem.id);

  copyDB.slice(indexUserToDelete, 1)
  
  ctx.status = 200;
  ctx.body = `Пользователь ${copyDB[indexUserToDelete].username} успешно удален.`;

  console.log("[DELETE USER]");
}