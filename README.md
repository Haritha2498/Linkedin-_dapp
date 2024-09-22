# LinkedIn Clone DApp :chart_with_upwards_trend:

# Overview #

This project is a decentralized LinkedIn-like platform built as a dApp (Decentralized Application) on a blockchain. 
It allows users to create profiles, add skills, projects, and work experience, apply for jobs, and even upload certificates.
This platform aims to provide a decentralized solution for professional networking and job searching, where users have more control over their personal data and professional records.

# Features  :label:

:black_medium_small_square:User Profiles: Create and update profiles with personal details, skills, projects, and experience. <br/>
:black_medium_small_square:Job Postings: Companies can post jobs, while users can apply for jobs via blockchain.<br/> 
:black_medium_small_square:Certificate Uploads: Users can upload their certificates to the blockchain, with an admin approval process for validation. <br/>
:black_medium_small_square:Admin Approval: Admins verify uploaded certificates for authenticity before they appear on the user's profile. <br/>
:black_medium_small_square:Token Integration: Users can earn tokens for their activities, and tokens are also used to interact with certain features like job applications and certificate verifications. <br/>

# 🛠 **Built With**

![NodeJS](https://img.icons8.com/color/48/000000/nodejs.png) 
![JavaScript](https://img.icons8.com/color/48/000000/javascript.png) 
![ReactJS](https://img.icons8.com/color/48/000000/react-native.png) 
![MongoDB](https://img.icons8.com/color/48/000000/mongodb.png)
![Vite](https://img.icons8.com/fluency/48/000000/vite.png) 
![Ethereum](https://img.icons8.com/ios-filled/50/000000/ethereum.png) 
![Solidity](https://img.icons8.com/ios-filled/50/000000/solidity.png)

# ⚙️ Run Locally #


### Prerequisites ###
:black_medium_small_square:Node.js<br/>
:black_medium_small_square:Hardhat (for smart contract deployment) <br/>
:black_medium_small_square:MongoDB  <br/>
:black_medium_small_square:MetaMask or similar wallet <br/>

    
   

 Clone the Project and change into the directory

 ```bash
git@github.com:Haritha2498/Linkedin-_dapp.git

```

open the folder in VScode<br>
In terminal ,Install dependencies

```bash
npm init
npm i -D hardhat
```
In [hardhat.config.js](https://github.com/Haritha2498/Linkedin-_dapp/blob/main/hardhat.config.js) file,add your private key across the accounts section in this code;

```bash
infura:{
      url:"https://sepolia.infura.io/v3/66d60f103eac4256995259d73ede2b51",
      accounts:[""]
    },
```
To install frontend and backend dependencies
```bash
cd UI
npm i

```
```bash
cd server
npm i
```
to start mongobd,in terminal,
```bash
 sudo systemctl start mongod
```
To run the project
In Server terminal
```bash
node app.js
```
In UI terminal,and follow the link
```bash
npm run dev
```
if needed for any changes in smart contract ,follow the setps after changes

To initailize hardhat nodes
```bash
npx hardhat node
```
To Deploy,in another terminal
```bash
npx hardhat compile
npx hardhat ignition deploy ignition/modules/Cert.js
```

## :video_camera: Demo ##
Watch demo vedio:<br>
<a href="https://drive.google.com/file/d/1Jszd-EyFJdOLACk4Y1F6vmSJj_KNTqV7/view?usp=sharing">
    <img src="https://github.com/Haritha2498/Linkedin-_dapp/blob/main/UI/src/assets/Thumbnail.png" alt="demo video" width="200" />
</a>




## :ribbon: Contributing ##
The open source community thrives on the contributions of its members, making it a remarkable space for learning, inspiration, and innovation. Every contribution you offer is deeply valued.

Should you have ideas to enhance this, kindly fork the repository and initiate a pull request. Alternatively, you can open an issue and tag it with enhancement. Remember to star the project! Many thanks!

Fork the Project
Create your Feature Branch (git checkout -b feature/<feature_name>)
Commit your Changes (git commit -m '<feature_name>_added')
Push to the Branch (git push origin feature/<feature_name>)
Open a Pull Request
## :page_with_curl: License ##
This project is licensed under the MIT license - see the [LICENSE.md](https://github.com/Haritha2498/Linkedin-_dapp/blob/main/LICENSE) file for details.

