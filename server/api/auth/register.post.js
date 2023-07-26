import { sendError } from 'h3';
import { createUser } from '~/server/db/users';
import { userTransformer } from '~/server/transformers/user';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password, repeatPassword, name } = body;
  if (!username || !email || !password || !repeatPassword || !name) {
    sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Invalid params' })
    );
    return;
  }

  if (password !== repeatPassword) {
    sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Password does not match' })
    );
    return;
  }

  const userData = {
    username,
    email,
    password,
    name,
    profileImage: 'https://picsum.photos/200/200',
  };

  const user = await createUser(userData);

  return { body: userTransformer(user) };
});
