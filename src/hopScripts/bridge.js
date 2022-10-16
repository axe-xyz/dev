import { Hop, Chain } from '@hop-protocol/sdk'
import { providers } from 'ethers'


export default async function main() {
  const provider = new providers.Web3Provider(window.ethereum, 'any')
  const signer = provider.getSigner()
  const hop = new Hop('mainnet', signer)
  const bridge = hop.bridge('ETH')
  const { totalFee, estimatedReceived } = await bridge.getSendData('100000000000000', 'ethereum', 'polygon')
  const needsApproval = await bridge.needsApproval('100000000000000', 'ethereum')
  if (needsApproval) {
      const tx = await bridge.sendApproval('100000000000000', 'ethereum', 'polygon')
      await tx.wait()
    }
    const tx = await bridge.send('100000000000000', Chain.Ethereum, Chain.Arbitrum, {
        relayerFee: totalFee,
        recipient: '0xA9783975c88fF60fB6B3c7D50090d1d1fE989170'
    })
    console.log(tx.hash)
}
