import bcrypt from "bcryptjs";
import { getPrisma } from "../prisma";
import jwt from "jsonwebtoken";


interface SignInInterface {
    email: string
    password: string
}

const JWT_SECRET = process.env.JWT_SECRET || "your_dev_secret_key";


export const signIn = async (payload: SignInInterface) => {
    const prisma = getPrisma();
    const { email, password } = payload;
    let validateUser = await prisma.users.findUnique({ where: { email: email.toLowerCase() } });
    if (!validateUser) {
        return {
            error: "Email not exists"
        }
    }

    let checkPassword = await bcrypt.compare(password, validateUser.password);
    if (!checkPassword) {
        return {
            error: "Invalid Credentials"
        }
    }

    // 3. Generate JWT
    const token = jwt.sign(
        { id: validateUser.id, email: validateUser.email },
        JWT_SECRET,
        { expiresIn: "1d" } // token valid for 1 day
    );


    const { password: _, ...userWithoutPassword } = validateUser;

    return {
        user: userWithoutPassword,
        token
    }
}   