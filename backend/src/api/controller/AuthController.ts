import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { SignupUsecase } from "../../application/usecases/auth/SignupUsecase";
import { LoginUsecase } from "../../application/usecases/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../../application/usecases/auth/RefreshTokenUsecase";
import { AuthResponse } from "../response/AuthResponse";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.SignupUseCase) private readonly signupUsecase: SignupUsecase,
    @inject(TYPES.LoginUseCase) private readonly loginUsecase: LoginUsecase,
    @inject(TYPES.RefreshTokenUseCase)
    private readonly refreshTokenUsecase: RefreshTokenUsecase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.signupUsecase.execute(req.body);
      const response = AuthResponse.toResponse(
        result,
        "User registered successfully",
        201
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.loginUsecase.execute(req.body);
      const response = AuthResponse.toResponse(result, "Login successful", 200);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.refreshTokenUsecase.execute(req.body.token);
      const response = AuthResponse.toResponse(
        result,
        "Token refreshed successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
