/**
 * Get current signed and unsigned queues
 */
import {
  ProposalCounter,
  ProposalItem,
  ProposalStatus,
  ProposalStatusCount,
  ProposalTimelineStatus,
  ProposalType,
  ProposalTypeCount,
  ProposalVote,
  Proposer,
  UnsignedProposalsQueue,
  UnsignedProposalsQueueItem,
} from "../../types"
import {
  DkgRuntimePrimitivesProposalDkgPayloadKey,
  WebbProposalsHeaderTypedChainId,
} from "@polkadot/types/lookup"
import { ensureAccount, ensureBlock } from "../../handlers"

export interface UnsignedProposalQueueItem {
  key: Key
  value: Value
}

export interface Key {
  id: string
  chainId: string
  dkgKey: DkgKey
}

export type DkgKey = Record<ProposalType, string>

export interface Unsigned {
  kind: ProposalType
  data: string
}

export interface Value {
  proposal: Proposal
  timestamp: number
}

export interface Signed {
  kind: string
  data: string
  signature: string
}

export interface Proposal {
  unsigned: Unsigned
  signed: Signed
}

export function dkgPayloadKeyToProposalType(
  dkgKey: DkgRuntimePrimitivesProposalDkgPayloadKey
): ProposalType {
  switch (dkgKey.type) {
    case "EvmProposal":
      return ProposalType.EvmProposal
    case "RefreshVote":
      return ProposalType.RefreshVote
    case "ProposerSetUpdateProposal":
      return ProposalType.ProposerSetUpdateProposal
    case "AnchorCreateProposal":
      return ProposalType.AnchorCreateProposal
    case "AnchorUpdateProposal":
      return ProposalType.AnchorUpdateProposal
    case "TokenAddProposal":
      return ProposalType.TokenAddProposal
    case "TokenRemoveProposal":
      return ProposalType.TokenRemoveProposal
    case "WrappingFeeUpdateProposal":
      return ProposalType.WrappingFeeUpdateProposal
    case "ResourceIdUpdateProposal":
      return ProposalType.ResourceIdUpdateProposal
    case "RescueTokensProposal":
      return ProposalType.RescueTokensProposal
    case "MaxDepositLimitUpdateProposal":
      return ProposalType.MaxDepositLimitUpdateProposal
    case "MinWithdrawalLimitUpdateProposal":
      return ProposalType.MinWithdrawalLimitUpdateProposal
    case "SetVerifierProposal":
      return ProposalType.SetVerifierProposal
    case "SetTreasuryHandlerProposal":
      return ProposalType.SetTreasuryHandlerProposal
    case "FeeRecipientUpdateProposal":
      return ProposalType.FeeRecipientUpdateProposal
  }
}

export async function ensureProposalQueue(blockId: string) {
  const queue = await UnsignedProposalsQueue.get(blockId)
  if (queue) {
    return queue
  }
  const newQueue = UnsignedProposalsQueue.create({
    id: blockId,
    blockId,
    blockNumber: Number(blockId),
  })
  await newQueue.save()
  return newQueue
}

export async function ensureProposalQueueItem(
  blockId: string,
  proposalId: string
) {
  const id = `${blockId}-${proposalId}`
  const item = await UnsignedProposalsQueueItem.get(id)
  // TODO : Debug this more as the proposal isn't created while it should be
  await ensureProposalItem({ blockId, nonce: proposalId })
  if (item) {
    return item
  }
  const newItem = UnsignedProposalsQueueItem.create({
    id,
    queueId: blockId,
    proposalId,
    blockNumber: Number(blockId),
  })
  await newItem.save()
  return newItem
}

export function createProposalId(
  chainId: WebbProposalsHeaderTypedChainId,
  dkgKey: DkgRuntimePrimitivesProposalDkgPayloadKey
): string {
  const dkgKeyHash = dkgKey.hash.toString()
  const chainIdValue = chainId.value.toString()
  return `${dkgKeyHash.replace("0x", "")}-${chainIdValue.trim() || "0"}`
}

export type ProposalCreateInput = {
  blockId: string
  proposalId: string
  type: ProposalType
  data: string
  signature?: string
  nonce: number
}

function constructProposalItemId(
  input: Omit<ProposalCreateInput, "signature"> & {
    signature?: string
    removed?: boolean
  }
): string {
  return `${input.blockId}-${input.proposalId}-${input.nonce}-${
    input.removed ? "0" : "1"
  }${input.signature ? "1" : "0"}`
}

/**
 *
 * Ensure a proposal item is added
 * return the proposal item if exists or creates a new unsigned empty votes proposal item
 * */
export async function ensureProposalItemStorage(
  input: ProposalCreateInput
): Promise<ProposalItem> {
  const id = String(input.nonce)
  const proposalItem = await ProposalItem.get(id)
  if (proposalItem) {
    return proposalItem
  }
  const { blockId, type, data, nonce } = input

  const block = await ensureBlock(blockId)
  const status = {
    blockNumber: blockId,
    status: ProposalStatus.Open.toString(),
    txHash: "",
    timestamp: block.timestamp ?? new Date(),
  }
  const newProposalItem = ProposalItem.create({
    blockId,
    data,
    removed: false,
    nonce,
    id,
    type,
    status: status.status.toString(),
    blockNumber: Number(blockId),
  })
  await newProposalItem.save()
  return newProposalItem
}

type ProposalItemFindInput = {
  blockId: string
  nonce: string
}

export async function ensureProposalItem(input: ProposalItemFindInput) {
  const { blockId, nonce } = input
  const id = String(nonce)
  const proposal = await ProposalItem.get(id)
  if (proposal) {
    return proposal
  }
  const block = await ensureBlock(blockId)
  const status = {
    blockNumber: blockId,
    status: ProposalStatus.Open.toString(),
    txHash: "",
    timestamp: block.timestamp ?? new Date(),
  }
  const newProposal = ProposalItem.create({
    id,
    blockId: input.blockId,
    data: "0x00",
    removed: false,
    nonce: Number(id),
    type: ProposalType.Unknown,
    status: status.status.toString(),
    signature: undefined,
    blockNumber: Number(blockId),
  })
  await newProposal.save()
  return newProposal
}

export async function ensureProposer(accountId: string) {
  const proposer = await Proposer.get(accountId)
  if (proposer) {
    return proposer
  }
  await ensureAccount(accountId)
  const newProposer = Proposer.create({
    id: accountId,
    accountId,
  })
  await newProposer.save()
  return newProposer
}

export async function addVote(
  input: ProposalItemFindInput,
  voter: string,
  isFor = true,
  blockId: string
) {
  const proposal = await ensureProposalItem(input)
  const block = await ensureBlock(blockId)
  await ensureProposer(voter)
  const newVote = await ProposalVote.create({
    id: `${proposal.id}-${voter}`,
    blockId,
    blockNumber: block.number,
    for: isFor,
    proposalId: proposal.id,
    voterId: voter,
  })
  await newVote.save()
}

async function updateProposalStatus(
  findInput: ProposalItemFindInput,
  status: ProposalStatus,
  blockId: string
) {
  const proposal = await ensureProposalItem(findInput)
  const block = await ensureBlock(blockId)

  const currentStatus = proposal.status as ProposalStatus
  let nextStatus = currentStatus
  const statusId = `${proposal.id}-${status}`
  switch (currentStatus) {
    case ProposalStatus.Signed:
      {
        switch (status) {
          case ProposalStatus.Rejected:
          case ProposalStatus.Accepted:
          case ProposalStatus.Executed:
          case ProposalStatus.FailedToExecute:
            nextStatus = status
        }
      }
      break
    case ProposalStatus.Open:
      {
        switch (status) {
          case ProposalStatus.Signed:
          case ProposalStatus.Rejected:
          case ProposalStatus.Accepted:
          case ProposalStatus.Executed:
          case ProposalStatus.FailedToExecute:
            nextStatus = status
        }
      }
      break
  }
  proposal.status = nextStatus
  const newStatus = ProposalTimelineStatus.create({
    id: statusId,
    status,
    proposalItemId: proposal.id,
    blockNumber: block.number,
    timestamp: block.timestamp,
  })
  await Promise.all([proposal.save(), newStatus.save()])
  return proposal
}

export async function approveProposal(
  findInput: ProposalItemFindInput,
  blockId: string
) {
  await updateProposalStatus(findInput, ProposalStatus.Accepted, blockId)
}

export async function rejectProposal(
  findInput: ProposalItemFindInput,
  blockId: string
) {
  await updateProposalStatus(findInput, ProposalStatus.Rejected, blockId)
}

export async function signProposal(
  findInput: ProposalItemFindInput,
  sig: string,
  blockId
) {
  const proposal = await updateProposalStatus(
    findInput,
    ProposalStatus.Signed,
    blockId
  )
  proposal.signature = sig
  await proposal.save()
}

export async function removeProposal(
  findInput: ProposalItemFindInput,
  blockId: string
) {
  const proposal = await updateProposalStatus(
    findInput,
    ProposalStatus.Removed,
    blockId
  )
  proposal.removed = true
  await proposal.save()
}

export async function executedProposal(
  findInput: ProposalItemFindInput,
  blockId: string
) {
  const proposal = await updateProposalStatus(
    findInput,
    ProposalStatus.Executed,
    blockId
  )
  proposal.removed = true
  await proposal.save()
}

export async function failedProposal(
  findInput: ProposalItemFindInput,
  blockId: string
) {
  const proposal = await updateProposalStatus(
    findInput,
    ProposalStatus.FailedToExecute,
    blockId
  )
  proposal.removed = true
  await proposal.save()
}

export async function createProposalCounter(
  blockId: string
): Promise<ProposalCounter> {
  const signedProposalsData = await api.query.dkgProposalHandler.signedProposals.entries()
  const unSignedProposalsData = await api.query.dkgProposalHandler.unsignedProposalQueue.entries()
  const parsedSigProposals = signedProposalsData.map(([key]) => {
    const [_chainId, dkgKey] = (key.args as unknown) as [
      WebbProposalsHeaderTypedChainId,
      DkgRuntimePrimitivesProposalDkgPayloadKey
    ]
    const proposalType = dkgPayloadKeyToProposalType(dkgKey as any)
    const nonce = dkgKey.value.toString()
    return {
      proposalId: nonce,
      proposalType,
    }
  })
  const parsedUnSigProposals = unSignedProposalsData.map(([key]) => {
    const [_chainId, dkgKey] = (key.args as unknown) as [
      WebbProposalsHeaderTypedChainId,
      DkgRuntimePrimitivesProposalDkgPayloadKey
    ]
    const proposalType = dkgPayloadKeyToProposalType(dkgKey as any)
    const nonce = dkgKey.value.toString()
    return {
      proposalId: nonce,
      proposalType,
    }
  })
  const signedCounter: Partial<Record<ProposalType, ProposalTypeCount>> = {}
  const unSignedCounter: Partial<Record<ProposalType, ProposalTypeCount>> = {}

  parsedSigProposals.forEach((proposal) => {
    if (signedCounter[proposal.proposalType]) {
      signedCounter[proposal.proposalType].count = String(
        Number(signedCounter[proposal.proposalType].count) + 1
      )
      signedCounter[proposal.proposalType].proposalId.push(proposal.proposalId)
    } else {
      signedCounter[proposal.proposalType] = {
        count: "1",
        type: proposal.proposalType.toString(),
        proposalId: [proposal.proposalId],
      }
    }
  })

  parsedUnSigProposals.forEach((proposal) => {
    if (unSignedCounter[proposal.proposalType]) {
      unSignedCounter[proposal.proposalType].count = String(
        Number(unSignedCounter[proposal.proposalType].count) + 1
      )
      unSignedCounter[proposal.proposalType].proposalId.push(
        proposal.proposalId
      )
    } else {
      unSignedCounter[proposal.proposalType] = {
        count: "1",
        type: proposal.proposalType.toString(),
        proposalId: [proposal.proposalId],
      }
    }
  })
  const proposalStatusMap: Partial<Record<
    ProposalStatus,
    ProposalStatusCount
  >> = {}
  const proposalsStatuses = [
    ProposalStatus.Open,
    ProposalStatus.Signed,
    ProposalStatus.Accepted,
    ProposalStatus.Rejected,
    // ProposalStatus.Removed,
    ProposalStatus.Executed,
    ProposalStatus.FailedToExecute,
  ].map(async (status) => {
    const proposals = await ProposalItem.getByStatus(String(status))
    proposals.forEach((proposal) => {
      if (proposalStatusMap[status]) {
        proposalStatusMap[status].count = String(
          Number(proposalStatusMap[status].count) + 1
        )
        proposalStatusMap[status].proposalId.push(proposal.id)
      } else {
        proposalStatusMap[status] = {
          count: "1",
          status: status.toString(),
          proposalId: [proposal.id],
        }
      }
    })
  })
  await Promise.all(proposalsStatuses)
  const signedProposalsCount = signedProposalsData.length
  const unSignedProposalsCount = unSignedProposalsData.length
  const counterId = blockId
  const counter = ProposalCounter.create({
    id: counterId,
    blockNumber: Number(blockId),
    blockId,
    signedProposalsCount,
    unSignedProposalsCount,
    signedProposalsMap: Object.values(signedCounter),
    unSignedProposalsMap: Object.values(unSignedCounter),
    statusMap: Object.values(proposalStatusMap),
  })
  await ensureProposalQueue(blockId)
  await Promise.all(
    parsedUnSigProposals.map((p) => {
      return ensureProposalQueueItem(blockId, p.proposalId)
    })
  )
  await counter.save()
  return counter
}
