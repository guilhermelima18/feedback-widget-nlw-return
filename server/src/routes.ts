import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import { SubmitFeedback } from "./useCases/submit-feedback";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks";

export const routes = express.Router();

/* const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0972556c80ff3a",
    pass: "53769ca98e39b7",
  },
}); */

routes.post("/feedbacks", async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedback(prismaFeedbackRepository);

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  /* await transport.sendMail({
    from: "Equipe Feedget <oi@feedget.com>",
    to: "Guilherme Lima <guilhermelima18@hotmail.com>",
    subject: "Novo feedback",
    html: [
      `<div style='font-family: sans-serif; font-size: 16px; color: #111'>`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Tipo do feedback: ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  }); */

  return res.status(201).send();
});
