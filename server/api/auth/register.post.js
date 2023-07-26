import { sendError } from 'h3';
import { createUser } from 'server/db/users';

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
      createError({ statusCode: 400, statusMessage: 'Password do not match' })
    );
    return;
  }

  const userData = {
    username,
    email,
    password,
    name,
  };

  const user = await createUser();

  return { body };
});
