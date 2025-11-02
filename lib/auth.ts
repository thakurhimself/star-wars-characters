import crypto from "crypto";

const SECRET = "b0de4d55314960e28144b8518f7ddbf50bc4b68e047e8adafe9e2492d3d53d0a";

export function createToken(payload: object, expiresInSec: number = 60) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + expiresInSec,
    })
  ).toString("base64url");
  const signature = crypto.createHmac("sha256", SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string) {
  try {
    const [header, body, signature] = token.split(".");
    const validSig = crypto.createHmac("sha256", SECRET).update(`${header}.${body}`).digest("base64url");
    if (validSig !== signature) {
        return null;
    }
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) { 
        return null;
    }
    return payload;
  } catch {
    return null;
  }
}
