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

import { askQuestion, askPassword } from "./questions"

export default async function getProperty(property: "name" | "username" | "password"): Promise<string>{
  const question = `Login's new ${property}: (max 64 characters)`
  while(true){
    let newProperty = property === "password" ? await askPassword(question) : await askQuestion(question)
    if(newProperty.length > 64){
      console.log("The max length is 64 characters. Please try again.")
      continue
    }
    return newProperty
  }
}