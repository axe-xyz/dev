import { Hop } from '@hop-protocol/sdk'
import { providers } from 'ethers'

export default async function EthArbBridge() {
  const provider = new providers.Web3Provider(window.ethereum, 'any')
  const signer = provider.getSigner()
  const hop = new Hop('mainnet', signer)
  const bridge = hop.bridge('ETH')
  const { totalFee, estimatedReceived } = await bridge.getSendData('0', 'ethereum', 'arbitrum')
  const needsApproval = await bridge.needsApproval('0', 'ethereum')
  if (needsApproval) {
    const tx = await bridge.sendApproval('0', 'ethereum', 'arbitrum')
    await tx.wait()
  }
  const tx = await bridge.send('0', 'ethereum', 'arbitrum', {
    relayerFee: totalFee
  })
  console.log(tx.hash)
}
