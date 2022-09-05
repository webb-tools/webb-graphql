import { ensureBlock } from "../../block"
import { PublicKey, SessionKeyStatus } from "../../../types"
import { ensureSession } from "../../session"

/**
 * Public key for a given session
 *
 * -> The key is generated by the DKG, and `NextPublicKeySubmitted` event is emitted
 * -> The key is signed by the DKG, and `NextPublicKeySignatureSubmitted` event is emitted
 * -> The key is in use in the session, and `PublicKeyChanged` event is emitted
 *
 * */
export async function ensurePublicKey(input: PublicKeyInput) {
  const blockData = await ensureBlock(input.blockNumber)

  const recordId = `${input.blockNumber}-${input.compressed.replace("0x", "")}`

  const data = new PublicKey(recordId)
  data.blockId = blockData.id

  await data.save()

  return data
}
export type PublicKeyInput = {
  blockNumber: string
  compressed: string
  uncompressed: string
}
export async function createPublicKey(data: PublicKeyInput) {
  const key = await ensurePublicKey(data)
  key.compressed = data.compressed
  key.uncompressed = data.uncompressed

  await key.save()

  return data
}
type PublicKeyGenerated = {
  composedPubKey: string
  uncompressedPubKey: string
  blockNumber: string
}
export async function ensureKey(data: PublicKeyGenerated) {
  const key = await PublicKey.getByUncompressed(data.uncompressedPubKey)
  if (key) {
    return key
  }
  const newKey = PublicKey.create({
    blockId: data.blockNumber,
    id: data.uncompressedPubKey,
    compressed: data.composedPubKey,
    uncompressed: data.uncompressedPubKey,
    history: [
      {
        stage: SessionKeyStatus.Generated,
        blockNumber: data.blockNumber,
        txHash: "",
      },
    ],
  })
  await newKey.save()
  return newKey
}
export async function keyGenerated(data: PublicKeyGenerated) {
  return ensureKey(data)
}
export type PublicKeyUpdate = {
  blockNumber: string
  uncompressedPubKey: string
  composedPubKey: string
  status: SessionKeyStatus
}
export async function updatePublicKeyStatus({
  status,
  ...data
}: PublicKeyUpdate) {
  const key = await ensureKey(data)
  key.history.push({
    stage: status.toString(),
    blockNumber: data.blockNumber,
    txHash: "",
  })
  await key.save()
  return key
}
