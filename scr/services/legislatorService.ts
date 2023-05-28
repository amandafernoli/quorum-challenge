import { YES, NO } from "../utils/constants";
import { Legislator } from "../models/Legislator";
import { VoteResult } from "../models/VoteResult";
import { LegislatorBillsVotesResponse } from "../models/responseModels/LegislatorsBillsVotes";

const billsVotedForEachLegislator = function (legislators: Legislator[], votes: VoteResult[]): LegislatorBillsVotesResponse[] {
  return legislators.map((legislator) => {
    const resultYes = votes.filter((vote) => legislator.id == vote.legislator_id && vote.vote_type == YES)
    const resultNo = votes.filter((vote) => legislator.id == vote.legislator_id && vote.vote_type == NO)
    return {
      legislatorId: legislator.id,
      legislatorName: legislator.name,
      billsVotedYes: resultYes.length,
      billsVotedNo: resultNo.length
    }
  })
}

export { billsVotedForEachLegislator }