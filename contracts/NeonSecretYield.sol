// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract NeonSecretYield is SepoliaConfig {
    using FHE for *;
    
    // Pool structure with FHE-encrypted data
    struct FarmPool {
        euint32 poolId;
        euint32 totalStaked;
        euint32 totalRewards;
        euint32 apy;
        euint32 participantCount;
        bool isActive;
        bool isVerified;
        string name;
        string tokenPair;
        address tokenAddress;
        uint256 createdAt;
        uint256 lastRewardUpdate;
    }
    
    // User position with FHE-encrypted data
    struct UserPosition {
        euint32 positionId;
        euint32 stakedAmount;
        euint32 pendingRewards;
        euint32 totalEarned;
        bool isActive;
        address user;
        uint256 poolId;
        uint256 stakedAt;
        uint256 lastClaimed;
    }
    
    // Reward calculation with FHE-encrypted data
    struct RewardCalculation {
        euint32 baseReward;
        euint32 bonusMultiplier;
        euint32 timeMultiplier;
        euint32 totalReward;
        bool isCalculated;
        uint256 calculatedAt;
    }
    
    // State variables
    mapping(uint256 => FarmPool) public pools;
    mapping(address => mapping(uint256 => UserPosition)) public userPositions;
    mapping(uint256 => RewardCalculation) public rewardCalculations;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public userTotalStaked;
    
    uint256 public poolCounter;
    uint256 public positionCounter;
    uint256 public totalValueLocked;
    uint256 public totalActiveFarmers;
    
    address public owner;
    address public verifier;
    address public treasury;
    
    // Events
    event PoolCreated(uint256 indexed poolId, address indexed creator, string name);
    event PositionStaked(uint256 indexed positionId, address indexed user, uint256 indexed poolId, uint32 amount);
    event PositionUnstaked(uint256 indexed positionId, address indexed user, uint256 indexed poolId);
    event RewardsClaimed(uint256 indexed positionId, address indexed user, uint32 amount);
    event PoolVerified(uint256 indexed poolId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event TreasuryUpdated(address indexed newTreasury);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    modifier poolExists(uint256 poolId) {
        require(pools[poolId].tokenAddress != address(0), "Pool does not exist");
        _;
    }
    
    modifier poolActive(uint256 poolId) {
        require(pools[poolId].isActive, "Pool is not active");
        _;
    }
    
    constructor(address _verifier, address _treasury) {
        owner = msg.sender;
        verifier = _verifier;
        treasury = _treasury;
    }
    
    // Create a new farm pool
    function createPool(
        string memory _name,
        string memory _tokenPair,
        address _tokenAddress,
        uint256 _apy
    ) public onlyOwner returns (uint256) {
        require(bytes(_name).length > 0, "Pool name cannot be empty");
        require(_tokenAddress != address(0), "Invalid token address");
        require(_apy > 0, "APY must be positive");
        
        uint256 poolId = poolCounter++;
        
        pools[poolId] = FarmPool({
            poolId: FHE.asEuint32(0), // Will be set properly later
            totalStaked: FHE.asEuint32(0),
            totalRewards: FHE.asEuint32(0),
            apy: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            participantCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            tokenPair: _tokenPair,
            tokenAddress: _tokenAddress,
            createdAt: block.timestamp,
            lastRewardUpdate: block.timestamp
        });
        
        emit PoolCreated(poolId, msg.sender, _name);
        return poolId;
    }
    
    // Stake tokens in a pool with FHE encryption
    function stake(
        uint256 poolId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable poolExists(poolId) poolActive(poolId) returns (uint256) {
        require(amount.length > 0, "Amount must be provided");
        
        uint256 positionId = positionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Create user position
        userPositions[msg.sender][poolId] = UserPosition({
            positionId: FHE.asEuint32(0), // Will be set properly later
            stakedAmount: internalAmount,
            pendingRewards: FHE.asEuint32(0),
            totalEarned: FHE.asEuint32(0),
            isActive: true,
            user: msg.sender,
            poolId: poolId,
            stakedAt: block.timestamp,
            lastClaimed: block.timestamp
        });
        
        // Update pool totals
        pools[poolId].totalStaked = FHE.add(pools[poolId].totalStaked, internalAmount);
        pools[poolId].participantCount = FHE.add(pools[poolId].participantCount, FHE.asEuint32(1));
        
        // Update user totals
        userTotalStaked[msg.sender] = FHE.add(userTotalStaked[msg.sender], internalAmount);
        
        // Update global stats
        totalActiveFarmers++;
        
        emit PositionStaked(positionId, msg.sender, poolId, 0); // Amount will be decrypted off-chain
        return positionId;
    }
    
    // Unstake tokens from a pool
    function unstake(
        uint256 poolId
    ) public poolExists(poolId) {
        UserPosition storage position = userPositions[msg.sender][poolId];
        require(position.isActive, "Position is not active");
        
        // Update pool totals
        pools[poolId].totalStaked = FHE.sub(pools[poolId].totalStaked, position.stakedAmount);
        pools[poolId].participantCount = FHE.sub(pools[poolId].participantCount, FHE.asEuint32(1));
        
        // Update user totals
        userTotalStaked[msg.sender] = FHE.sub(userTotalStaked[msg.sender], position.stakedAmount);
        
        // Deactivate position
        position.isActive = false;
        
        // Update global stats
        totalActiveFarmers--;
        
        emit PositionUnstaked(position.positionId, msg.sender, poolId);
    }
    
    // Claim rewards with FHE encryption
    function claimRewards(
        uint256 poolId
    ) public poolExists(poolId) {
        UserPosition storage position = userPositions[msg.sender][poolId];
        require(position.isActive, "Position is not active");
        
        // Calculate rewards (simplified - in real implementation, this would be more complex)
        euint32 timeElapsed = FHE.asEuint32(uint32(block.timestamp - position.lastClaimed));
        euint32 baseReward = FHE.mul(position.stakedAmount, pools[poolId].apy);
        euint32 timeAdjustedReward = FHE.div(FHE.mul(baseReward, timeElapsed), FHE.asEuint32(365 days));
        
        // Update position
        position.pendingRewards = FHE.add(position.pendingRewards, timeAdjustedReward);
        position.totalEarned = FHE.add(position.totalEarned, position.pendingRewards);
        position.lastClaimed = block.timestamp;
        
        // Reset pending rewards
        position.pendingRewards = FHE.asEuint32(0);
        
        emit RewardsClaimed(position.positionId, msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    // Verify a pool
    function verifyPool(uint256 poolId, bool isVerified) public onlyVerifier poolExists(poolId) {
        pools[poolId].isVerified = isVerified;
        emit PoolVerified(poolId, isVerified);
    }
    
    // Update user reputation
    function updateReputation(address user, euint32 reputation) public onlyVerifier {
        require(user != address(0), "Invalid user address");
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    // Update treasury address
    function updateTreasury(address newTreasury) public onlyOwner {
        require(newTreasury != address(0), "Invalid treasury address");
        treasury = newTreasury;
        emit TreasuryUpdated(newTreasury);
    }
    
    // Get pool information (public data only)
    function getPoolInfo(uint256 poolId) public view poolExists(poolId) returns (
        string memory name,
        string memory tokenPair,
        address tokenAddress,
        bool isActive,
        bool isVerified,
        uint256 createdAt
    ) {
        FarmPool storage pool = pools[poolId];
        return (
            pool.name,
            pool.tokenPair,
            pool.tokenAddress,
            pool.isActive,
            pool.isVerified,
            pool.createdAt
        );
    }
    
    // Get user position info (public data only)
    function getUserPositionInfo(address user, uint256 poolId) public view returns (
        bool isActive,
        address positionUser,
        uint256 positionPoolId,
        uint256 stakedAt,
        uint256 lastClaimed
    ) {
        UserPosition storage position = userPositions[user][poolId];
        return (
            position.isActive,
            position.user,
            position.poolId,
            position.stakedAt,
            position.lastClaimed
        );
    }
    
    // Get global statistics
    function getGlobalStats() public view returns (
        uint256 totalPools,
        uint256 totalFarmers,
        uint256 totalValue
    ) {
        return (
            poolCounter,
            totalActiveFarmers,
            totalValueLocked
        );
    }
    
    // Emergency functions
    function emergencyPause() public onlyOwner {
        // Pause all operations
        for (uint256 i = 0; i < poolCounter; i++) {
            pools[i].isActive = false;
        }
    }
    
    function emergencyUnpause() public onlyOwner {
        // Resume all operations
        for (uint256 i = 0; i < poolCounter; i++) {
            pools[i].isActive = true;
        }
    }
    
    // Withdraw funds (only owner)
    function withdrawFunds(uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract balance");
        payable(treasury).transfer(amount);
    }
    
    // Receive function for direct ETH deposits
    receive() external payable {
        totalValueLocked += msg.value;
    }
    
    // Fallback function
    fallback() external payable {
        totalValueLocked += msg.value;
    }
}
