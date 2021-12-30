import { Request, Response } from "express";
import { AutheticateClientUseCase } from "./AutheticateClientUseCase";

export class AuthenticateClientController {
    async handle(request: Request, response: Response) {
        const { username, password } = request.body;

        const authenticateClientUseCase = new AutheticateClientUseCase();

        const result = await authenticateClientUseCase.execute({
            username,
            password
        })

        return response.json(result);
    }
}