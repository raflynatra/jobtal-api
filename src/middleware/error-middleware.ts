import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { ResponseError } from "../error/response-error";
import { toApiResponse } from "../model/response-model";
import { logger } from "../application/logging";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const flattenError = error.flatten();
    const errorKey = Object.keys(flattenError.fieldErrors)[0];
    logger.error(error);

    res.status(400).json(
      toApiResponse("error", {
        message: "Validation error. Please check your input.",
        field: errorKey,
      })
    );
  } else if (error instanceof ResponseError) {
    logger.error(error);

    res.status(error.status).json(
      toApiResponse("error", {
        message: error.message,
      })
    );
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    logger.error(error);

    res.status(400).json(
      toApiResponse("error", {
        message: prismaErrorMessage(error),
      })
    );
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    logger.error(error);

    res.status(500).json(
      toApiResponse("error", {
        message: "Something went wrong. Please try again later.",
      })
    );
  } else {
    logger.error(error);

    res.status(500).json(
      toApiResponse("error", {
        message: "Internal server error. Please contact support.",
      })
    );
  }
};

const prismaErrorMessage = (
  error: Prisma.PrismaClientKnownRequestError
): string => {
  switch (error.code) {
    case "P2002":
      return "This data already exists. Please use a different value.";
    case "P2003":
      return "Invalid reference. Please check related data.";
    case "P2025":
      return "Requested record not found.";
    default:
      return "Something went wrong. Please try again later.";
  }
};
