import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';
import { IUserInput, ILoginInput, IAuthResponse } from '../types';
import { validateRegistration, validateLogin, sanitizeUserData } from '../utils/validators';

export const register = async (
  req: Request<{}, {}, IUserInput>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Validate input
    const validation = validateRegistration(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.errors.join(', ')
      });
    }
    
    // Sanitize input
    const sanitizedData = sanitizeUserData(req.body);
    const { name, email, password } = sanitizedData;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    const user = await User.create({ name, email, password });
    const token = user.getSignedJwtToken();

    const response: IAuthResponse = {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    };

    res.status(201).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, ILoginInput>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Validate input
    const validation = validateLogin(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.errors.join(', ')
      });
    }
    
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = user.getSignedJwtToken();

    const response: IAuthResponse = {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    };

    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
};