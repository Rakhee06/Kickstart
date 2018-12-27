const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory');
const compiledCampaign = require('../ethereum/build/Campaign');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
   accounts = await web3.eth.getAccounts();
   factory = await web3.eth.Contract(JSON.parse(compiledFactory.interface))
       .deploy({ data: compiledFactory.bytecode, arguments: [] })
       .send({ from: accounts[0], gas: '1000000' });

   await factory.methods.createCampaign('100').send({
       from: accounts[0],
       gas: '1000000'
   });

   //this means that the function returns an array of deployed addresses and the first address is
    // assigned to campaignAddress.
   [campaignAddress] = await factory.methods.getDeployedCampaign().call();

   //second argument is the address where the campaign exists
   campaign = await web3.eth.Contract(
     JSON.parse(compiledCampaign.interface),
     campaignAddress
   );
});

