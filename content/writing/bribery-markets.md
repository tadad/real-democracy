---
title: Bribery Markets
date: '2025-02-23'
# description: by Dachus
tags: ['blockchain', 'prediction', 'bribery']
---

Traditionally, bribery exists in local markets with high trust relationships: both parties must come face to face in a smokey room to exchange cash for favors.
The backroom/shady nature of bribery is what requires immense investment into relationships and building reputation; everyone involved needs to be comfortable with their counterparties not just to deliver the favor, but to keep everything secret.
The addition of a proper legal/dispute system, psuedonymity, and an open marketplace would greatly reduce these costs.
Blockchains deliver each of these pieces today, allowing bribery to move from
- local => global
- high trust => psuedonymous
- 1 to 1 => N to M

## Mechanism:
Every bribe is an NFT which specifies
- the `bribe`
- the oracle that will determine whether the bribe was satisfied or not
- `maturity` - when the `bribe` can be released

The bribe can be one or more tokens, for example if Exxon is bribing a politican to approve a new pipeline they may want to include part cash and part Exxon-equity.
Anyone on Earth could add to the bounty if they wanted to.
For example, Chevron may want to add its own cash/equity to juice the rewards for the pipeline approval.

The oracle is modular.
Optimistic oracles like [UMA](https://uma.xyz) will likely be used for most offchain data.
If the conditions to release the bribe are purely financial, a price-feed could be used.
Trusted EOAs backed by a human or LLM could be used as a cheap (but insecure) option, where both parties load their evidence into the context, and it gives you a ruling.

Once the NFT is created and the funds are locked, it can be sold on a marketplace, transferred, burned, fractionalized, etc.
At maturity, the oracle responds either that the bribe was satisfied, in which case all the locked funds go to the holder of the NFT, or the bribe was not satisfied and the bribes go back to the original wallets.

## Discussion
Tokens, NFTs, and oracles are sufficient to build a bribery system for anyone to execute any real world action: streak the superbowl, assassinate someone, vote on a law, throw a game, etc.
The composable nature of these assets opens up interesting possibilities for using bribes:

### Airdropping bribes
If the bribe is meant for one wallet, you could airdrop the NFT to that wallet directly.
For example, if you know the president's wallet, you can airdrop a $100M bribe to sign an executive order.
Anyone could increase the bribe if it isn't enough, adding more and more tokens until he finally signs.

### Fractionalizing Bribes
Some bribes will require more than one person to effectively execute the favor.
In this case a DAO could acquire the NFT and decide how to split the bounty once completed.
For example bribing a board to fire a CEO would require splitting the bribe among everyone that votes to oust the CEO.

### Selling the Bribe
There is good reason to sell the bribe at a discount to the funds locked inside.
From the briber's perspective, they are potentially locking their funds until maturity for no reason if no one actually executes the bribe.
From the bribee's perspective, if they believe they can execute the favor, then they can afford to pay a small price to acquire the right to claim a much larger pot upon completion.
Forcing someone to buy the bribe is good incentive to make sure they don't just squat on it to waste the briber's opportunity cost.

### Agents
AI Agents have a very easy time interacting with bits, but they need something else for interacting with atoms.
Bribery markets allow the agent to contract humans (or other agents) to do ceratin tasks - opening up a gig-economy for *anyone* and any task - from random cab drivers to politicians.
These bribes can be thought of as intents where "solvers" execute things in the real world in order to manipulate an oracle output to the correct value.

## Conclusion
Every society decries bribery as a negative thing, and yet every one uses bribes to grease the wheels of bureaucracy.
Blockchains are the first governments to experiment with bribery as a positive way to align incentives across society.
The question is not about whether bribery is good or bad but how to make it more transparent and accessible to anyone.
