const newsDb = [
  {
    id: 'news_6745670cvb',
    created_at: '2026-11-08T11:00:00.000Z',
    title: "Очень важная новость",
    text: "Текст",
    user: {
      id: 'user_37390dfe',
      username: 'johndoe',
      firstName: 'Иван',
      surName: 'Иванов',
      middleName: 'Иванович',
      image: '/storage/img/user_1.png'
    }
  },
  {
    id: 'news_3678346dfe',
    created_at: '2026-11-09T12:00:00.000Z',
    title: "Не очень важная новость",
    text: "Текст",
    user: {
      id: "user_97475nvo",
      username: 'janedoe',
      firstName: 'Мария',
      surName: 'Иванова',
      middleName: 'Ивановна',
      image: '/storage/img/user_2.png'
    }
  }
];

export function getNews(ctx, next) {
  // const totalCount = 42; // Общее количество пользователей в БД

  ctx.status = 200;
  ctx.body = { data: newsDb };

  console.log("[GET NEWS]");
}

export function postNews(ctx, next) {
  const { text, title } = ctx.request.body;

  const copyDB = [...newsDb];

  const addNew = {
    id: 'news_94762084sch',
    created_at: new Date(),
    title,
    text,
    user: {
      id: "user_3334jil",
      username: 'testUser',
      firstName: 'Петр',
      surName: 'Петров',
      middleName: 'Петрович',
      image: '/storage/img/user_3.png'
    }
  }

  copyDB.push(addNew);

  ctx.status = 200;
  ctx.body = { data: copyDB };

  console.log("[POST NEWS]");
}

export function patchNews(ctx, next) {
  const { text, title } = ctx.request.body;
  const id = ctx.request.params.id;

  // const getUserById = readUserData from newsDb

  ctx.status = 200;
  ctx.body = {
    data: newsDb,
    // meta: { ?????????????????????????????????
    //   total: totalCount,
    //   limit: 10,
    //   page: 1
    // }
  };

  console.log("[PATCH NEWS]");
}

export function deleteNews(ctx, next) {

  ctx.status = 200;
  ctx.body = {
    data: newsDb,
    // meta: { ?????????????????????????????????
    //   total: totalCount,
    //   limit: 10,
    //   page: 1
    // }
  };

  console.log("[DELETE NEWS]");
}