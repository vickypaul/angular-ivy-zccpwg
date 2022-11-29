import { SentimentDetails } from './sentimentDetails.model';

export interface Sentiment {
  data: Array<SentimentDetails>;
  symbol: string;
}
