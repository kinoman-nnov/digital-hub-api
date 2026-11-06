export async function getProfile(ctx, next) {

  ctx.status = 200;
  ctx.body = {
    id: "60c72b2f9b1d8b001558f65a",
    username: 'john_doe',
    firstName: 'Иван',
    surName: 'Иванов',
    middleName: 'Иванович',
    image: '/public/img/avatar-default.png',
    properties: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    }
  };

  console.log("[GET PROFILE]");
}

export async function patchProfile(ctx, next) {
  const { firstName, middleName, surName, oldPassword, newPassword} = ctx.request.body;

  let fileName;
  if (ctx.file) fileName = ctx.file.originalname;
  if (!fileName) fileName = 'default.png'
  
  ctx.status = 200;
  ctx.body = {
    id: "60c72b2f9b1d8b001558f65a",
    username: 'john_doe',
    firstName,
    surName,
    middleName,
    image: `/storage/temp/${fileName}`,
    properties: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    }
  };

  console.log("[PATCH PROFILE]");
}