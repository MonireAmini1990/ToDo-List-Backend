import * as userService from '../services/user.service.js';

 export const registerUser = async (req, res) => {
  try {
    const { name, last_name, email, password } = req.body;

    const { user, token } = await userService.registerUser({
      name,
      last_name,
      email,
      password,
    });

    res.status(201).json({
      user: {
        user_id: user.user_id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      },
      token,
    });

  } catch (err) {
    if (err.message === 'Email already exists') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: err.message });
  }
};

 export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await userService.loginUser({ email, password });

    await userService.updateUserToken(user.user_id, token);

    res.json({
      user: {
        user_id: user.user_id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      },
      token,
    });

  } catch (err) {
    if (err.message === 'User not found' || err.message === 'Invalid credentials') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(500).json({ message: err.message });
  }
};

 export const guestLogin = async (req, res) => {
  try {
    const { user, token } = await userService.guestLogin();

    await userService.updateUserToken(user.user_id, token);

    res.json({
      user: {
        user_id: user.user_id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 export const getCurrentUser = async (req, res) => {
  try {
    const user_id = req.user.user_id; 
    const user = await userService.getUserById(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });
        console.log("getCurrentUser response:", user);


    res.json({
      user_id: user.user_id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 export const getUserById = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id); 
    const user = await userService.getUserById(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      user_id: user.user_id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};