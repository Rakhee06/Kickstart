import web3 from './web3';
import CampaignFactory from './build/CampaignFactory';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9AB8D9f08C769b2D3Ed822Ee60199aa028620828'
);

export default instance;