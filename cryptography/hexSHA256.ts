import { z } from 'zod'
import crypto from 'crypto'

const OutputSchema = z.coerce.string().length(64)

export default function hexSHA256(input: string): z.infer<typeof OutputSchema>{
  const hash = crypto.createHash("sha256")
  hash.update(input)
  const hashOutput = hash.digest("hex")
  return OutputSchema.parse(hashOutput)
}