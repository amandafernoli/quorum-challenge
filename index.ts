import { Bill } from "./scr/models/Bill";
import { Vote } from "./scr/models/Vote";
import { Legislator } from "./scr/models/Legislator";
import { VoteResult } from "./scr/models/VoteResult";
import { billsVotes } from "./scr/services/billService";
import { readCSVFile, writeCSVFile } from "./scr/services/csvService";
import { billsVotedForEachLegislator } from "./scr/services/legislatorService";

async function main(): Promise<void> {
  const bills = await readCSVFile<Bill>("bills.csv");
  const votes = await readCSVFile<Vote>("votes.csv");
  const legislators = await readCSVFile<Legislator>("legislators.csv");
  const voteResult = await readCSVFile<VoteResult>("vote_results.csv");

  const legislatorsSupportOpposeCountResult = billsVotedForEachLegislator(
    legislators,
    voteResult
  );
  const billsResult = billsVotes(bills, voteResult, votes, legislators);

  await writeCSVFile(
    "legislators-support-oppose-count.csv",
    legislatorsSupportOpposeCountResult
  );
  await writeCSVFile("bills.csv", billsResult);
}

main();
