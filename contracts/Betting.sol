pragma solidity ^0.5.16;

contract Betting {
    uint public matchId;
    uint public bettingType;
    uint public oddForWinning;
    uint public minimumBet;
    address payable[] public players;
    struct Player {
      uint256 amountBet;
      uint16 teamSelected;
    }
}

mapping(address => Player) public playerInfo;
function() external payable {}
    constructor() public {
      owner = msg.sender;
      matchId = 1;
      bettingType = 1;
      oddForWinning = 2;
      minimumBet = 0.50000000000000;
    }

function kill() public {
      if(msg.sender == owner) selfdestruct(msg.sender);
    }

    function placeBet(uint8 _teamSelected) public payable {
      require(msg.value >= minimumBet);

      playerInfo[msg.sender].amountBet = msg.value;
      playerInfo[msg.sender].teamSelected = _teamSelected;