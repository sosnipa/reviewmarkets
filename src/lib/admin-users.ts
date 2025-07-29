import { prisma } from '@/lib/db';
import { AuthService, AdminUser } from '@/lib/auth';

export interface CreateAdminUserData {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateAdminUserData {
  email?: string;
  password?: string;
  name?: string;
}

export class AdminUserService {
  /**
   * Create a new admin user
   */
  static async createUser(data: CreateAdminUserData): Promise<AdminUser> {
    const hashedPassword = await AuthService.hashPassword(data.password);

    const user = await prisma.adminUser.create({
      data: {
        email: data.email.toLowerCase(),
        password: hashedPassword,
        name: data.name || data.email.split('@')[0],
        role: 'admin',
      },
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role as 'admin',
      createdAt: user.createdAt,
    };
  }

  /**
   * Get admin user by email
   */
  static async getUserByEmail(email: string): Promise<AdminUser | null> {
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role as 'admin',
      createdAt: user.createdAt,
    };
  }

  /**
   * Get admin user by ID
   */
  static async getUserById(id: string): Promise<AdminUser | null> {
    const user = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role as 'admin',
      createdAt: user.createdAt,
    };
  }

  /**
   * Update admin user
   */
  static async updateUser(id: string, data: UpdateAdminUserData): Promise<AdminUser | null> {
    const updateData: {
      email?: string;
      name?: string;
      password?: string;
    } = {};

    if (data.email) updateData.email = data.email.toLowerCase();
    if (data.name) updateData.name = data.name;
    if (data.password) {
      updateData.password = await AuthService.hashPassword(data.password);
    }

    const user = await prisma.adminUser.update({
      where: { id },
      data: updateData,
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role as 'admin',
      createdAt: user.createdAt,
    };
  }

  /**
   * Delete admin user
   */
  static async deleteUser(id: string): Promise<boolean> {
    try {
      await prisma.adminUser.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * List all admin users
   */
  static async listUsers(): Promise<AdminUser[]> {
    const users = await prisma.adminUser.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role as 'admin',
      createdAt: user.createdAt,
    }));
  }

  /**
   * Change admin password
   */
  static async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    const user = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!user) return false;

    // Verify current password
    const isValid = await AuthService.verifyPassword(currentPassword, user.password);
    if (!isValid) return false;

    // Hash and update new password
    const hashedNewPassword = await AuthService.hashPassword(newPassword);
    await prisma.adminUser.update({
      where: { id },
      data: { password: hashedNewPassword },
    });

    return true;
  }

  /**
   * Verify admin credentials
   */
  static async verifyCredentials(email: string, password: string): Promise<AdminUser | null> {
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) return null;

    const isValid = await AuthService.verifyPassword(password, user.password);
    if (!isValid) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role as 'admin',
      createdAt: user.createdAt,
    };
  }
}
