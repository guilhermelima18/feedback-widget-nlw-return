import { FeedbacksRepository } from "../repositories/feedbacks";

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  constructor(private feedbackRepository: FeedbacksRepository) {}

  async execute(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });
  }
}
