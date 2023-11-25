import { RequestHandler, Request, Response } from "express";

type RaiseException = (
  status: number,
  message: string,
  payload?: any
) => HandlerResponse<any>;

type GenerateController<Payload> = (
  handler: Handler<Payload>
) => RequestHandler;

type Handler<Payload> = (
  request: Request,
  response: Response,
  raiseException: RaiseException
) => Promise<HandlerResponse<Payload>>;

export type HandlerResponse<Payload> = {
  message: string;
  payload: Payload;
};

export const generateController: GenerateController<any> = (handler) => {
  const requestHandler: RequestHandler = async (request, response) => {
    let isException = false;

    const raiseException: RaiseException = (status, message, payload = {}) => {
      isException = true;
      response.status(status).json({
        message,
        success: false,
        payload,
      });

      return {
        message,
        payload,
      };
    };

    try {
      const handlerResponse = await handler(request, response, raiseException);

      if (!isException) {
        return response.status(200).json({
          message: handlerResponse.message,
          payload: handlerResponse.payload,
          success: true,
        });
      }
    } catch (e) {
      response.status(500).json({
        message:
          "Failed to complete your request due to some internal server error",
        success: false,
        payload: {
          errorMessage: e.message,
        },
      });
    }
  };
  return requestHandler;
};
