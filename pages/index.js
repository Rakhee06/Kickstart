import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

export default class CampaignIndex extends Component {

    //static is used to directly get the function assigned to the class instead of an instance
    //eg: without static - we would do
    //const campaign = new CampaignIndex();
    //campaign.getInitialProps()
    //with static - we can do
    //CampaignIndex.getInitialProps()
    static async getInitialProps() {

        const campaigns = await factory.methods.getDeployedCampaigns().call();
        // return { campaigns: campaigns };
        //Can also be written as in ES-2015 code
        return { campaigns };

    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
        return {
            header: address,
            description: (
                <Link route={`/campaigns/${address}`}>
                    <a>View Campaign</a>
                </Link>
            ),
            fluid: true
        }
        });

        return <Card.Group items={items} />;
    };


    render() {
        return(
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link route='/campaigns/new'>
                        <a>
                            <Button
                                floated='right'
                                content='Create Campaign'
                                icon='add circle'
                                primary
                            />
                        </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}