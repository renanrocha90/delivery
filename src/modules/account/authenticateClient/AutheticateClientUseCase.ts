import { prisma } from "../../../database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
   username: string;
   password: string
}

export class AutheticateClientUseCase {
   async execute({ username, password }: IAuthenticateClient) {

      // Verificar se o username está cadastrado
      const client = await prisma.clients.findFirst({
         where: {
            username
         }
      })

      if (!client) {
         throw new Error("Username or password invalid")
      }

      // Verificar se a senha corresponde ao username
      const passwordMatch = await compare(password, client.password);

      if (!passwordMatch) {
         throw new Error("Username or password invalid")
      }

      // Gerar o token
      const token = sign({ username }, "81e45b4291394ceefb436754994e03d2", {
         subject: client.id,
         expiresIn: "1d"
      })

      return token;

   }
}