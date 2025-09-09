import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESSES, CONTRACT_ABI } from '@/lib/wallet-config'
import { useChainId } from 'wagmi'

export const useNeonSecretYield = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { writeContract } = useWriteContract()
  const { data: hash, isPending, error } = useWriteContract()

  // Get contract address for current chain
  const contractAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]

  // Read contract functions
  const { data: totalPools } = useReadContract({
    address: contractAddress,
    abi: CONTRACT_ABI,
    functionName: 'getGlobalStats',
  })

  const { data: poolInfo } = useReadContract({
    address: contractAddress,
    abi: CONTRACT_ABI,
    functionName: 'getPoolInfo',
    args: [0], // Pool ID 0
  })

  const { data: userPosition } = useReadContract({
    address: contractAddress,
    abi: CONTRACT_ABI,
    functionName: 'getUserPositionInfo',
    args: address ? [address, 0] : undefined, // User address and Pool ID 0
  })

  // Write contract functions
  const createPool = async (name: string, tokenPair: string, tokenAddress: string, apy: number) => {
    if (!contractAddress) throw new Error('Contract not deployed on this network')
    
    return writeContract({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: 'createPool',
      args: [name, tokenPair, tokenAddress, apy],
    })
  }

  const stake = async (poolId: number, amount: string) => {
    if (!contractAddress) throw new Error('Contract not deployed on this network')
    
    return writeContract({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: 'stake',
      args: [poolId, amount],
      value: BigInt(amount), // For ETH staking
    })
  }

  const unstake = async (poolId: number) => {
    if (!contractAddress) throw new Error('Contract not deployed on this network')
    
    return writeContract({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: 'unstake',
      args: [poolId],
    })
  }

  const claimRewards = async (poolId: number) => {
    if (!contractAddress) throw new Error('Contract not deployed on this network')
    
    return writeContract({
      address: contractAddress,
      abi: CONTRACT_ABI,
      functionName: 'claimRewards',
      args: [poolId],
    })
  }

  return {
    // Contract address
    contractAddress,
    
    // Read data
    totalPools,
    poolInfo,
    userPosition,
    
    // Write functions
    createPool,
    stake,
    unstake,
    claimRewards,
    
    // Transaction state
    hash,
    isPending,
    error,
    
    // User info
    address,
    isConnected: !!address,
  }
}
