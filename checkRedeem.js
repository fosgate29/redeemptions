const { InfuraProvider, Contract } = require('ethers');

const fs = require('fs');
const { getIssueNumber } = require('./getIssue.js');

const filePath = 'allTokens.json';
const contractABI = require('./huxley.json');

const network = 'mainnet';
const infuraKey = '';
const provider = new InfuraProvider(network, infuraKey);

const contractAddress123 = '0x9ca8887d13bc4591ae36972702fdf9de2c97957f';
const contractAddress4 = '0xc65eF668114A1d0446F960Ac4cAa8c080eFAB786';
const contractAddress56 = '0x42fe737749683595e4315b443eadcC9346a994D9';

// Call the contract's view function
async function checkRedeemed(issue, tokenId) {
	console.log(tokenId)
  let contract;
  if (issue == 1 || issue == 2 || issue == 3) {
    contract = new Contract(contractAddress123, contractABI, provider);
  } else if (issue == 4) {
    contract = new Contract(contractAddress4, contractABI, provider);
  } else if (issue == 5 || issue == 6) {
    contract = new Contract(contractAddress56, contractABI, provider);
  }

  try {
    const result = await contract.redemptions(tokenId);
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}

// JSON file path
const jsonFilePath = 'tokenIds.json';


function isRedeemedCache(tokenId) {
  return tokenList[tokenId] === true;
}

const checkAddress = async () => {
  const data = fs.readFileSync(filePath, 'utf8');
	// Read the existing JSON data (if any)
	let tokenIdList = {};

	if (fs.existsSync(jsonFilePath)) {
		tokenIdList = JSON.parse(fs.readFileSync(jsonFilePath));
	}

	console.log(tokenIdList)

	let cache = 0;
  try {
    const jsonObject = JSON.parse(data); // Parse the JSON string back to a JavaScript object
    //console.log('JSON data read from file:', jsonObject);
		

    for (const address in jsonObject) {
		  if(cache > 1050){
				throw new Error('Stopping execution after 200 tokens');

			}
      if (jsonObject.hasOwnProperty(address)) {
        const values = jsonObject[address];

        for (const tokenId of values) {
					
					//console.log(tokenId)
          const issue = getIssueNumber(tokenId).issue;

					// check if it is cache. if yes, don't need reprocess it
					if(tokenIdList[tokenId]===true || tokenIdList[tokenId]===false){
						console.log("achou no cache")
						
					}
					else {
						const redeemed = await checkRedeemed(issue, tokenId);
						console.log("nao achou no cache", tokenId)
						cache++;
						if (redeemed) {
							tokenIdList[tokenId] = true;
						} 
						else {
							tokenIdList[tokenId] = false;
						} 
					}
        }
      }
    }
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }

	// Convert the JSON object to a string
	const jsonContent = JSON.stringify(tokenIdList, null, 2);

	// Write the JSON string to a file
	fs.writeFileSync('tokenIds.json', jsonContent);

};

checkAddress();
