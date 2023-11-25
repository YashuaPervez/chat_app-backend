declare namespace Express {
  export interface Request {
    user?: import("./src/models/User").User;
    token?: string;
    io: import("socket.io").Server;
  }
}
