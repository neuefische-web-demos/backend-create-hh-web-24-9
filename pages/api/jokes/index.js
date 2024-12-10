import dbConnect from "@/db/connect";
import Joke from "@/db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const jokes = await Joke.find();
    response.status(200).json(jokes);
    return;
  }

  if (request.method === "POST") {
    const jokeDataBackend = request.body;
    await Joke.create(jokeDataBackend);
    response.status(201).json({ status: "Joke created" });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
