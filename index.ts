import { Bill } from "./scr/models/Bill";
import { Vote } from "./scr/models/Vote";
import { Legislator } from "./scr/models/Legislator";
import { VoteResult } from "./scr/models/VoteResult";
import { billsVotes } from "./scr/services/billService";
import { readCSVFile } from "./scr/services/csvService";
import { billsVotedForEachLegislator } from "./scr/services/legislatorService";

console.log('Iniciando aplicação...');

async function main(): Promise<void> {
  const bills = await readCSVFile<Bill>('bills.csv');
  const votes = await readCSVFile<Vote>('votes.csv');
  const legislators = await readCSVFile<Legislator>('legislators.csv');
  const voteResult = await readCSVFile<VoteResult>('vote_results.csv');

  // console.log(billsVotedForEachLegislator(legislators, voteResult));
  console.log(billsVotes(bills, voteResult, votes, legislators));
  
}

main();
