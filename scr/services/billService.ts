import { Bill } from "../models/Bill";
import { Vote } from "../models/Vote";
import { YES, NO } from "../utils/constants";
import { Legislator } from "../models/Legislator";
import { VoteResult } from "../models/VoteResult";
import { BillsVotesResponse } from "../models/responseModels/BillsVotesResponse";

/**
 * @param billId 
 * @param votes 
 * @returns Returns the list of vote ids for a specific bill
 */
const getListOfBillVotes = function (billId: number, votes: Vote[]): number[] {
  return votes.filter((vote) => billId == vote.bill_id).map((vote)=> vote.id);
}

/**
 * @param votesIdsBillFiltered
 * @param allVotes 
 * @param voteType 
 * @returns Returns the votes for a given bill by checking the type of vote
 */
const getBillVotes = function (votesIdsBillFiltered: number[], allVotes: VoteResult[], voteType: number): VoteResult[] {
  return allVotes.filter((vote) => votesIdsBillFiltered.includes(vote.vote_id) && vote.vote_type == voteType);
}


/**
 * Makes the relationship between the entities of the parameters according to the bill
 * @param bills 
 * @param allVotes 
 * @param votes 
 * @param legislators 
 * @returns Returns how many and which legislators voted yes and no for each bill
 */
const billsVotes = function (bills: Bill[], allVotes: VoteResult[], votes: Vote[], legislators: Legislator[]): BillsVotesResponse[] {
  return bills.map((bill) => {

    let votesIdsBillFiltered = getListOfBillVotes(bill.id, votes);

    const votesYes = getBillVotes(votesIdsBillFiltered, allVotes, YES);
    const votesNo = getBillVotes(votesIdsBillFiltered, allVotes, NO);

      return {
        billId: bill.id,
        title: bill.title,
        sponsorId: bill.sponsor_id,
        sponsorName: getSponsorById(bill.sponsor_id, legislators),
        votesYes: votesYes.length,
        votesNo: votesNo.length
      }
    })
}

/**
 * @param sponsorId 
 * @param legislators 
 * @returns Returns the name of a sponsor according to its Id
 */
const getSponsorById = function (sponsorId: number, legislators: Legislator[]): string {
  const sponsor = legislators.find((legislator) => legislator.id == sponsorId);
  return sponsor ? sponsor.name : 'unknow';
}

export { billsVotes }