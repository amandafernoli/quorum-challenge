import { YES, NO } from "../utils/constants";
import { Legislator } from "../models/Legislator";
import { VoteResult } from "../models/VoteResult";
import { LegislatorBillsVotesResponse } from "../models/responseModels/LegislatorsBillsVotes";

const billsVotedForEachLegislator = function (
  legislators: Legislator[],
  votes: VoteResult[]
): LegislatorBillsVotesResponse[] {
  return legislators.map((legislator) => {
    const resultYes = votes.filter(
      (vote) => legislator.id == vote.legislator_id && vote.vote_type == YES
    );
    const resultNo = votes.filter(
      (vote) => legislator.id == vote.legislator_id && vote.vote_type == NO
    );
    return {
      id: legislator.id,
      name: legislator.name,
      num_supported_bills: resultYes.length,
      num_opposed_bills: resultNo.length,
    };
  });
};

export { billsVotedForEachLegislator };
