@error
model NotFoundError {
  code: "NOT_FOUND";
  message: string;
}

@error
model BadRequestError {
  code: "BAD_REQUEST";
  message: string[];
}

@error
model InternalServerError {
  code: "INTERNAL_SERVER_ERROR";
  message: string;
}
