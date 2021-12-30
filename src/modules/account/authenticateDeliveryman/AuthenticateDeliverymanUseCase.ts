import { prisma } from "../../../database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string
}

export class AutheticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {

        // Verificar se o username está cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if (!deliveryman) {
            throw new Error("Username or password invalid")
        }

        // Verificar se a senha corresponde ao username
        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("Username or password invalid")
        }

        // Gerar o token
        const token = sign({ username }, "81e45b4291394ceefb436754994e03d2", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token;

    }
}