import { getUserByUsername } from '~/server/db/users';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;
  if (!username || !password) {
    sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Invalid params' })
    );
    return;
  }

  // Is the user registered
  const user = await getUserByUsername(username);
  console.log('🚀 ~ file: login.post.js:17 ~ defineEventHandler ~ user:', user);
  if (!user) {
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid',
      })
    );
    return;
  }

  // Compare passwords

  // Generate Tokens

  return {
    user,
  };
});
