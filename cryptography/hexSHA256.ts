/*
 * This file is part of Null Pass Manager.
 *
 * Null Pass Manager is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Null Pass Manager is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Null Pass Manager. If not, see <https://www.gnu.org/licenses/>.
 */

import { z } from 'zod'
import crypto from 'crypto'

const OutputSchema = z.coerce.string().length(64)

export default function hexSHA256(input: string): z.infer<typeof OutputSchema>{
  const hash = crypto.createHash("sha256")
  hash.update(input)
  const hashOutput = hash.digest("hex")
  return OutputSchema.parse(hashOutput)
}