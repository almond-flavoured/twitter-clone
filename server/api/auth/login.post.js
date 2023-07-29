import { getUserByUsername } from '~/server/db/users';
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt';
import bcrypt from 'bcrypt';
import { userTransformer } from '~/server/transformers/user';
import { createRefreshToken } from '~/server/db/refreshTokens';
import { sendError } from 'h3';

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
  const doesThePasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesThePasswordMatch) {
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid',
      })
    );
    return;
  }

  // Generate Tokens
  // Access token
  // Refresh token
  const { accessToken, refreshToken } = generateTokens(user);

  // Save it insdie db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  // add http only cookie
  sendRefreshToken(event, refreshToken);

  return {
    user: userTransformer(user),
    access_Token: accessToken,
  };
});
