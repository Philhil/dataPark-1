console.log("");
console.log("PARKING LOT CONTRACT DEPLOYMENT");
console.log("-------------------------------");

const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    console.log("(1/7) Web3 detected! "+ web3.currentProvider.constructor.name);
    var web3 = new Web3(web3.currentProvider);
} else {
    console.log("(1/7) Using HTTP Provider! (No Web3 detected!)");
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

const fs = require('fs');
const contractSource = fs.readFileSync("./contracts/ParKing.sol").toString('utf-8');
console.log("(2/7) Solidity file loaded!");

const contractParameters = {
    language: "Solidity",
    sources: {
        'ParKing.sol': {
            content: contractSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const solc = require('solc');
var compiledContract = JSON.parse(solc.compile(JSON.stringify(contractParameters)));
console.log("(3/7) Contract compiled!");

const bytecode = compiledContract.contracts['ParKing.sol']['ParKing'].evm.bytecode.object;
const abi = compiledContract.contracts['ParKing.sol']['ParKing'].abi;
var ContractInstance = new web3.eth.Contract(JSON.parse(JSON.stringify(abi)), null, { data: bytecode } );
console.log("(4/7) Contract object created");

web3.eth.getGasPrice().then((averageGasPrice) => {
    console.log("5/7) Average gas price: " + averageGasPrice);
    gasPrice = averageGasPrice;
}).catch(console.error);

ContractInstance.deploy().estimateGas().then((estimatedGas) => {
    console.log("(6/7) Estimated gas: " + estimatedGas);
    gas = estimatedGas;
}).catch(console.error);

