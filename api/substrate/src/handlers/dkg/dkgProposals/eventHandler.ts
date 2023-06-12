import { SubstrateEvent } from '@subql/types';
import { DKGProposalsSection, DKGSections } from '../type';
import { createProposerThreshold } from './proposerThreshold';
import '@webb-tools/types';

import { DKGProposalsEvent } from './types';
import { EventDecoder } from '../../../utils';
import { createOrUpdateSession, currentSessionId } from '../../session';
import {
  addVote,
  approveProposal,
  executedProposal,
  failedProposal,
  rejectProposal,
} from '../../../utils/proposals/getCurrentQueues';

export async function dkgProposalEventHandler(event: SubstrateEvent) {
  if (event.event.section !== DKGSections.DKGProposals) {
    logger.error(`dkgProposalEventHandler: event.event.section(${event.event.section}) !== DKGSections.DKGProposals`);
    return;
  }
  const method = event.event.method as DKGProposalsSection;
  const eventDecoded = new EventDecoder<DKGProposalsEvent>(event);
  switch (method) {
    case DKGProposalsSection.ProposerThresholdChanged:
      {
        const eventData = eventDecoded.as(DKGProposalsSection.ProposerThresholdChanged);
        const thresholdValue = eventData.newThreshold.toString();
        await createProposerThreshold(thresholdValue, eventDecoded.metaData);
        const pendingThreshold = eventData.newThreshold.toString();
        const { sessionNumber: sessionId, sessionBlock } = await currentSessionId(eventDecoded.blockNumber);
        await createOrUpdateSession({
          blockId: sessionBlock,
          sessionId,
          proposerThreshold: {
            current: Number(thresholdValue.toString()),
            pending: Number(pendingThreshold),
            next: Number(pendingThreshold.toString()),
          },
        });
      }
      break;
    case DKGProposalsSection.ChainWhitelisted:
      break;
    case DKGProposalsSection.ProposerAdded:
      break;
    case DKGProposalsSection.ProposerRemoved:
      break;
    case DKGProposalsSection.VoteFor:
      {
        const eventData = eventDecoded.as(DKGProposalsSection.VoteFor);
        await addVote(
          {
            blockId: eventDecoded.blockNumber,
            nonce: String(parseInt(eventData.proposalNonce.toHex())),
            chainId: eventData.chainId.toHex(),
          },
          eventData.who.toString(),
          true,
          eventDecoded.blockNumber
        );
      }
      break;

    case DKGProposalsSection.VoteAgainst:
      {
        const eventData = eventDecoded.as(DKGProposalsSection.VoteAgainst);
        await addVote(
          {
            blockId: eventDecoded.blockNumber,
            nonce: String(parseInt(eventData.proposalNonce.toHex())),
            chainId: eventData.chainId.toHex(),
          },
          eventData.who.toString(),
          false,
          eventDecoded.blockNumber
        );
      }
      break;
    case DKGProposalsSection.ProposalApproved:
      {
        const eventData = eventDecoded.as(DKGProposalsSection.ProposalApproved);
        await approveProposal(
          {
            blockId: eventDecoded.blockNumber,
            nonce: String(parseInt(eventData.proposalNonce.toHex())),
            chainId: eventData.chainId.toHex(),
          },
          eventDecoded.blockNumber
        );
      }
      break;
    case DKGProposalsSection.ProposalRejected:
      {
        const eventData = eventDecoded.as(DKGProposalsSection.ProposalRejected);
        await rejectProposal(
          {
            blockId: eventDecoded.blockNumber,
            nonce: String(parseInt(eventData.proposalNonce.toHex())),
            chainId: eventData.chainId.toHex(),
          },
          eventDecoded.blockNumber
        );
      }
      break;
    case DKGProposalsSection.ProposalSucceeded:
      {
        const eventData = eventDecoded.as(DKGProposalsSection.ProposalSucceeded);
        await executedProposal(
          {
            blockId: eventDecoded.blockNumber,
            nonce: String(parseInt(eventData.proposalNonce.toHex())),
            chainId: eventData.chainId.toString(),
          },
          eventDecoded.blockNumber
        );
      }
      break;
    case DKGProposalsSection.ProposalFailed:
      {
        const eventData = eventDecoded.as(DKGProposalsSection.ProposalFailed);
        await failedProposal(
          {
            blockId: eventDecoded.blockNumber,
            nonce: String(parseInt(eventData.proposalNonce.toHex())),
            chainId: eventData.chainId.toString(),
          },
          eventDecoded.blockNumber
        );
      }
      break;
    case DKGProposalsSection.AuthorityProposersReset:
      {
        const eventData = eventDecoded.as(DKGProposalsSection.AuthorityProposersReset);
        const proposers = eventData.proposers.map((i) => i.toString());
        const { sessionNumber: sessionId, sessionBlock } = await currentSessionId(eventDecoded.blockNumber);
        await createOrUpdateSession({
          blockId: sessionBlock,
          sessionId,
          proposers,
          proposersCount: proposers.length,
        });
      }
      break;
  }
}