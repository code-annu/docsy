import { Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { GetProfileByIdUsecase } from "../../application/usecases/profile/GetProfileByIdUsecase";
import { UpdateProfileUsecase } from "../../application/usecases/profile/UpdateProfileUsecase";
import { DeleteProfileUsecase } from "../../application/usecases/profile/DeleteProfileUsecase";
import { ProfileResponse } from "../response/ProfileResponse";
import { AuthRequest } from "../middleware/validate-authorization";

@injectable()
export class ProfileController {
  constructor(
    @inject(TYPES.GetProfileByIdUseCase)
    private readonly getProfileByIdUsecase: GetProfileByIdUsecase,
    @inject(TYPES.UpdateProfileUseCase)
    private readonly updateProfileUsecase: UpdateProfileUsecase,
    @inject(TYPES.DeleteProfileUseCase)
    private readonly deleteProfileUsecase: DeleteProfileUsecase
  ) {}

  async getProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const result = await this.getProfileByIdUsecase.execute(userId);
      const response = ProfileResponse.toDetail(
        result,
        "Profile retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const result = await this.updateProfileUsecase.execute(userId, req.body);
      const response = ProfileResponse.toDetail(
        result,
        "Profile updated successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      await this.deleteProfileUsecase.execute(userId);
      res.status(200).json({
        status: "success",
        message: "Profile deleted successfully",
        code: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}
