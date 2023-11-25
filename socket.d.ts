import "socket.io";

declare module "socket.io" {
  interface Socket {
    user?: import("./src/models/User").User;
  }
}
