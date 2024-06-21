import fs from 'fs/promises'
import path from 'path'
import { myEncrypt, myDecrypt } from '../../src/utils/generalUtils'



export default async (req, res) => {
  try {
    const readFileDotConfig = await fs.readFile(process.cwd() + '/.config', 'utf8')
    const fileConfig = myEncrypt(JSON.stringify(readFileDotConfig.split(/\r?\n/)), 5)
    const fileEnv = myEncrypt(JSON.stringify(require('dotenv').config().parsed), 5)
    const config = {
      dotConfig: fileConfig,
      dotEnv: fileEnv,
    }

    res.status(200).json(config)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error reading file' })
  }
}

// const configFilePath = './.config'
// async function handler() {
//   try {
//     // Read the existing config file
//     const existingData = await fs.readFile(process.cwd() + '/.config', 'utf8')

//     console.log(existingData+"newvalue")
//     // const existingData = await fs.readFile(process.cwd() + '/.config', 'utf-8')

//     // await fs.writeFile(configFilePath, 'newValue')

//     return 'Config file updated successfully.'
//   } catch (error) {
//     console.error('Error updating config file:', error)
//     // res.status(500).json({ error: 'Internal Server Error' })
//   }
// }
