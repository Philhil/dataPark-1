pragma solidity >=0.4.22 <0.6.0;

contract dataPark {

    struct date {
        address owner;
    }
    
    mapping(bytes32 => date) data;
    bytes32[] userAddresses;
    
    constructor() public payable{}

    function addParkingLotData(bytes32 _hash) public {
        data[_hash].owner = msg.sender;
        msg.sender.transfer(1);
    }
    
    function requestParkingLotData() public payable returns (bool) {
        require(msg.value==2, "Insufficient funds!");
        return true;
    }
 
    function getHashFromString(string memory _input) public pure returns (bytes32) {
        bytes32 hash = keccak256(abi.encode(_input));
        return hash;
    }
    
    function getContractBalance() public view returns (uint256) {
        address(this).balance;
    }
    
}