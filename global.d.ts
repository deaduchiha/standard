import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: {
      statusCode: number;
      message: string;
    };
  }
}
