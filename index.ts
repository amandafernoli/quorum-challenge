import { Bill } from "./scr/models/Bill";
import { Vote } from "./scr/models/Vote";
import { Legislator } from "./scr/models/Legislator";
import { VoteResult } from "./scr/models/VoteResult";
import { readCSVFile } from "./scr/services/csvService";
import { billsVotedForEachLegislator } from "./scr/services/legislatorService";
import { billsVotes } from "./scr/services/billService";

console.log('Iniciando aplicação...');

async function main(): Promise<void> {
  const bills = await readCSVFile<Bill>('bills.csv');
  const votes = await readCSVFile<Vote>('votes.csv');
  const legislators = await readCSVFile<Legislator>('legislators.csv');
  const voteResult = await readCSVFile<VoteResult>('vote_results.csv');

  // console.log(billsVotedForEachLegislator(legislators, voteResult))
  // console.log(billsVotes(bills, voteResult, votes, legislators));
  
}

main();
