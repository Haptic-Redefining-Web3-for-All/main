# Haptic

Haptic is a project aimed at fostering inclusivity and accessibility in the Web 3 and blockchain space. Our mission is to redefine the relationship between users and services, ensuring that individuals with disabilities and average users alike can easily access and benefit from decentralized finance (DeFi) and Web3 technologies.

## Features

Haptic offers a range of features designed to provide a user-friendly experience and empower users to actively participate in the blockchain ecosystem. Here are the key features of our project:

### Dashboard
- Retrieve wallet balance via voice command
- Request token prices fetched from Chainlink data feeds via voice command
- Non-visually impaired users can fetch Chainlink price feed data through text input

### DAO (Decentralized Autonomous Organization)
- Upvote or downvote feature proposals (persisted on chain)
- Add feature proposals (persisted on chain)
- Visually impaired users can select feature cards to hear dynamic audio playback

### Truflation
- Leverage Chainlink data provider Truflation
- Sync latest inflation data and listen to audio playback for each category
- Currently supports year-over-year inflation (yoyInflation), while other categories are under development

### DEX (Decentralized Exchange)
- Integrates Moralis OneInch plugin
- Allows for quotes and token swaps via voice command
- Includes Uniswap DEX on the UI for non-visually impaired users

## Technologies Used

Haptic has been developed using the following technologies and tools:

- Moralis
- OneInch
- Uniswap
- Chainlink
- Truflation
- React JS
- Solidity
- Django Python (for future development)
- Spline

## Getting Started

To run the application, follow these steps:

1. If any changes have been made to the frontend, navigate to the `hapticreact` directory and run the following command to build the frontend:

```
$ npm run build
```

2. To run the application itself, navigate to the `hapticdjango` directory and execute the following command:

```
$ python3 manage.py runserver
```

## Testing Vibrations on Mobile Device

To test vibrations on a mobile device, follow these steps:

1. Determine the IP address of the machine on which the application is running.

2. Grab the port on which the React app is running.

3. On your mobile browser, search for `<IP_ADDRESS>:<PORT>` to access the application.

## Challenges Faced

During the development process, we encountered several challenges, including timing constraints and availability issues. We also faced some library dependency challenges within React, which we were able to resolve through thorough troubleshooting. Additionally, as a team, it was our first time working with keepers, and we learned the importance of setting a higher gas limit and funding the registry with sufficient Link.

## Achievements

We are proud of the milestones we have achieved during the development of Haptic. Some notable accomplishments include:

- Enabling users to perform token swaps via voice command on Polygon, promoting inclusivity and accessibility.
- Allowing users to request their Metamask balances to be read aloud via voice command.
- Implementing strong haptic vibrations during swaps to ensure users are aware of transaction occurrences.
- Establishing a DAO governance model that reads choices aloud, allowing users to participate in the development direction of the project.
- Incorporating Truflation rates to provide up-to-date inflation data, enabling users to make informed decisions as consumers and investors.

## Learnings

Throughout the hackathon, we gained valuable knowledge and insights. We discovered Truflation, a concept we were not familiar with previously, which sparked our interest due to its relevance in today's world. We expanded our understanding of price feeds and data providers

 through the combination of Truflation and Chainlink. From a solidity standpoint, we learned how to properly flatten files to avoid issues on etherscan. Additionally, our experience with keepers provided a fresh perspective compared to traditional cron jobs in Web 2.

## Future Development

The blockchain space is characterized by constant innovation and brilliant minds. In line with this, our future plans for HapticDAO include:

- Expanding the project to include more use cases that enhance accessibility and inclusivity.
- Developing Python use cases to enable voice commands for IoT devices, thereby widening the range of applications.
- Creating a separate mobile application using React Native.

We believe that by building upon our current foundation and collaborating with the vibrant blockchain community, we can make significant strides in redefining the relationship between users and services in the Web 3 era.
