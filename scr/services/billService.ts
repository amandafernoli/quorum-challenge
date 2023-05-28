import { Bill } from "../models/Bill";
import { Vote } from "../models/Vote";
import { YES, NO } from "../utils/constants";
import { Legislator } from "../models/Legislator";
import { VoteResult } from "../models/VoteResult";
import { BillsVotesResponse } from "../models/responseModels/BillsVotesResponse";

/**
 * @param billId 
 * @param votes 
 * @returns Retorna a lista de ids dos votos de um projeto de lei especifico
 */
const getListOfBillVotes = function (billId: number, votes: Vote[]): number[] {
  return votes.filter((vote) => billId == vote.bill_id).map((vote)=> vote.id);
}

/**
 * @param votesIdsBillFiltered
 * @param allVotes 
 * @param voteType 
 * @returns Retorna os votos de um determinado projeto de lei verificando o tipo do voto
 */
const getBillVotes = function (votesIdsBillFiltered: number[], allVotes: VoteResult[], voteType: number): VoteResult[] {
  return allVotes.filter((vote) => votesIdsBillFiltered.includes(vote.vote_id) && vote.vote_type == voteType);
}


/**
 * Faz a relação entre as entidades dos parâmetros de acordo com o projeto de lei
 * @param bills 
 * @param allVotes 
 * @param votes 
 * @param legislators 
 * @returns Retorna quantos e quais legislators votaram sim e não pra cada projeto de lei
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
 * @returns Retorna o nome de um sponsor de acordo com o Id dele
 */
const getSponsorById = function (sponsorId: number, legislators: Legislator[]): string {
  const sponsor = legislators.find((legislator) => legislator.id == sponsorId);
  return sponsor ? sponsor.name : 'unknow';
}

export { billsVotes }