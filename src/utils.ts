import { verifyKey } from "discord-interactions";
import "dotenv/config";
import { Request, Response } from "express";
import fetch, { RequestInit } from "node-fetch";
import { DiscordError } from "type";

export function VerifyDiscordRequest(clientKey: string | undefined) {
  return function (req: Request, res: Response, buf: Buffer) {
    const signature = req.get("X-Signature-Ed25519");
    const timestamp = req.get("X-Signature-Timestamp");

    if (!clientKey || !signature || !timestamp) {
      res.status(401).send("Unauthorized");
      return;
    }

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send("Bad request signature");
    }
  };
}

export async function DiscordRequest(endpoint: string, options: RequestInit) {
  if (!process.env.DISCORD_TOKEN) {
    throw new Error("DISCORD_TOKEN is not set");
  }

  // append endpoint to root API URL
  const url = `https://discord.com/api/v9/${endpoint}`;

  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = (await res.json()) as DiscordError;
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}
