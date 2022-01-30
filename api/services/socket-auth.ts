/* eslint @typescript-eslint/no-explicit-any: "off" */
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export default async function socketAuth(
  socket: Socket,
  next: (error: Error | undefined) => void
) {
  const { token } = socket.handshake.auth;
  const { verify } = jwt;
  const secretUrl = "https://dev-6vs4dnoj.us.auth0.com/.well-known/jwks.json";

  const client = jwksClient({
    jwksUri: secretUrl,
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
    (socket as any).email = decodedJwt["https://sikaeducation.com/email"];
    next(error as Error | undefined);
  });
}
