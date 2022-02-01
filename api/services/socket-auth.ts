/* eslint @typescript-eslint/no-explicit-any: "off" */
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { Socket } from "socket.io";

type SikaSocket = Socket & { email?: string; role?: string };

export default async function socketAuth(
  socket: SikaSocket,
  next: (error: Error | undefined) => void
) {
  const { token } = socket.handshake.auth;
  const { verify } = jwt;

  const client = jwksClient({
    jwksUri: process.env.AUTH_KEY_URL || "",
  });

  const getKey = (
    header: any,
    callback: (error: Error | null, signingKey: string) => void
  ) => {
    client.getSigningKey(header.kid, (error, key) => {
      const signingKey = key.getPublicKey();
      callback(error, signingKey);
    });
  };

  verify(token, getKey, (error, decodedJwt: any) => {
    // eslint-disable-next-line
    socket.email = decodedJwt["https://sikaeducation.com/email"];
    // eslint-disable-next-line
    socket.role = decodedJwt["https://sikaeducation.com/role"];
    next(error as Error | undefined);
  });
}
