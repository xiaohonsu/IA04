import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const { email, password } = registerUserDto;

    try {
      // Check if user already exists
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const newUser = new this.userModel({
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      // Save to database
      const savedUser = await newUser.save();

      // Return success response without password
      return {
        success: true,
        message: 'User registered successfully',
        user: {
          id: savedUser._id,
          email: savedUser.email,
          createdAt: savedUser.createdAt,
        },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to register user. Please try again.',
      );
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  async setRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken });
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
  }
}
