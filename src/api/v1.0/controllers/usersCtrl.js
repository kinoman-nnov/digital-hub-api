export async function users(ctx, next){
  const usersFromDb = [
    {
      id: 'user_67890abc',
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
      id: 'user_37390dfe',
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
  
  const totalCount = 42; // Общее количество пользователей в БД
  
  ctx.status = 200;
  ctx.body = {
    data: usersFromDb,
    meta: {
      total: totalCount,
      limit: 10,
      page: 1
    }
  };

  console.log("[GET USERS]");
}