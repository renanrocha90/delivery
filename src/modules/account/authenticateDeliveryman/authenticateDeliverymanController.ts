import { Request, Response } from "express";
import { AutheticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";

export class AuthenticateDeliverymanController {
    async handle(request: Request, response: Response) {
        const { username, password } = request.body;

        const autheticateDeliverymanUseCase = new AutheticateDeliverymanUseCase();

        const result = await autheticateDeliverymanUseCase.execute({
            username,
            password
        })

        return response.json(result);
    }
}