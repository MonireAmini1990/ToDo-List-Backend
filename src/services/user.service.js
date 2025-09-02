import db from '../core/dataBase/connection.js';
import { users } from '../core/dataBase/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

 export const signToken = (user_id) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  
  const token = jwt.sign(
    { user_id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );

  if (!token) throw new Error('Failed to generate JWT token');
  return token;
};

 export const updateUserToken = async (user_id, token) => {
  if (!token) throw new Error("Token is undefined, cannot update user");
  await db.update(users).set({ token }).where(eq(users.user_id, user_id));
};

 export const registerUser = async ({ name, last_name, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.insert(users).values({
      name,
      last_name,
      email,
      password: hashedPassword,
    }).returning();

    const user = result[0];
    const token = signToken(user.user_id);

     await updateUserToken(user.user_id, token);

    return { user, token };

  } catch (error) {
    if (error.code === '23505') {  
      throw new Error('Email already exists');
    }
    throw error;
  }
};

 export const loginUser = async ({ email, password }) => {
  const usersList = await db.select().from(users).where(eq(users.email, email));
  const user = usersList[0];

  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = signToken(user.user_id);

   await updateUserToken(user.user_id, token);

   const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};

 export const guestLogin = async () => {
  const timestamp = Date.now();
  const hashedPassword = await bcrypt.hash('guest_password', 10);

  const guestResult = await db.insert(users).values({
    email: `guest_${timestamp}@example.com`,
    password: hashedPassword,
    name: 'Guest',
    last_name: '',
  }).returning();

  const user = guestResult[0];
  const token = signToken(user.user_id);

   await updateUserToken(user.user_id, token);

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};

 export const getUserById = async (user_id) => {
  const userList = await db.select().from(users).where(eq(users.user_id, user_id));
  const user = userList[0];
  if (!user) throw new Error('User not found');

  const { password, token, ...rest } = user; 
  return rest;
};