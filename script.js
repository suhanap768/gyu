window.addEventListener('load', async () => {
    if (window.ethereum) {
        // Initialize web3 and set up contract
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Contract ABI and Address
        const contractABI = [
            // Contract ABI goes here
            {
                "inputs": [
                    { "internalType": "string", "name": "_name", "type": "string" }
                ],
                "name": "addCandidate",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "bytes32", "name": "_messageHash", "type": "bytes32" },
                    { "internalType": "bytes", "name": "_signature", "type": "bytes" },
                    { "internalType": "uint256", "name": "_candidateId", "type": "uint256" }
                ],
                "name": "authenticateAndVote",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "address", "name": "_voterAddress", "type": "address" }
                ],
                "name": "registerVoter",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "tallyVotes",
                "outputs": [
                    { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    { "indexed": false, "internalType": "string", "name": "name", "type": "string" }
                ],
                "name": "CandidateAdded",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    { "indexed": false, "internalType": "uint256[]", "name": "results", "type": "uint256[]" }
                ],
                "name": "ResultsTallied",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    { "indexed": false, "internalType": "address", "name": "voter", "type": "address" }
                ],
                "name": "VoteCast",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    { "indexed": false, "internalType": "address", "name": "voter", "type": "address" }
                ],
                "name": "VoterRegistered",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "admin",
                "outputs": [
                    { "internalType": "address", "name": "", "type": "address" }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "uint256", "name": "", "type": "uint256" }
                ],
                "name": "candidates",
                "outputs": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "candidatesCount",
                "outputs": [
                    { "internalType": "uint256", "name": "", "type": "uint256" }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "bytes32", "name": "_ethSignedMessageHash", "type": "bytes32" },
                    { "internalType": "bytes", "name": "_signature", "type": "bytes" }
                ],
                "name": "recoverSigner",
                "outputs": [
                    { "internalType": "address", "name": "", "type": "address" }
                ],
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "bytes", "name": "_sig", "type": "bytes" }
                ],
                "name": "splitSignature",
                "outputs": [
                    { "internalType": "uint8", "name": "", "type": "uint8" },
                    { "internalType": "bytes32", "name": "", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "", "type": "bytes32" }
                ],
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "bytes32", "name": "_messageHash", "type": "bytes32" },
                    { "internalType": "bytes", "name": "_signature", "type": "bytes" },
                    { "internalType": "address", "name": "_voterAddress", "type": "address" }
                ],
                "name": "verifySignature",
                "outputs": [
                    { "internalType": "bool", "name": "", "type": "bool" }
                ],
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "address", "name": "", "type": "address" }
                ],
                "name": "voters",
                "outputs": [
                    { "internalType": "bool", "name": "isRegistered", "type": "bool" },
                    { "internalType": "bool", "name": "hasVoted", "type": "bool" },
                    { "internalType": "bytes32", "name": "encryptedVote", "type": "bytes32" }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        const contractAddress = '0x83d3FE497AaBcb8c065CFeC53691d5D5b431B0c0';
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Add Candidate
        document.getElementById('addCandidateButton').onclick = async () => {
            const candidateName = document.getElementById('candidateName').value;
            const accounts = await web3.eth.getAccounts();
            contract.methods.addCandidate(candidateName).send({ from: accounts[0] })
                .on('transactionHash', hash => console.log('Transaction Hash:', hash))
                .on('receipt', receipt => {
                    console.log('Transaction Receipt:', receipt);
                    alert('Candidate added successfully!');
                })
                .on('error', error => console.error('Error:', error));
        };

        // Register Voter
        document.getElementById('registerVoterButton').onclick = async () => {
            const voterAddress = document.getElementById('voterAddress').value;
            const accounts = await web3.eth.getAccounts();
            contract.methods.registerVoter(voterAddress).send({ from: accounts[0] })
                .on('transactionHash', hash => console.log('Transaction Hash:', hash))
                .on('receipt', receipt => {
                    console.log('Transaction Receipt:', receipt);
                    alert('Voter registered successfully!');
                })
                .on('error', error => console.error('Error:', error));
        };

        // Cast Vote
        document.getElementById('voteButton').onclick = async () => {
            const messageHash = document.getElementById('messageHash').value;
            const signature = document.getElementById('signature').value;
            const candidateId = parseInt(document.getElementById('candidateSelect').value);
            const accounts = await web3.eth.getAccounts();
            contract.methods.authenticateAndVote(messageHash, signature, candidateId).send({ from: accounts[0] })
                .on('transactionHash', hash => console.log('Transaction Hash:', hash))
                .on('receipt', receipt => {
                    console.log('Transaction Receipt:', receipt);
                    alert('Vote cast successfully!');
                })
                .on('error', error => console.error('Error:', error));
        };

        // Tally Votes
        document.getElementById('tallyVotesButton').onclick = async () => {
            contract.methods.tallyVotes().call()
                .then(results => {
                    console.log('Vote Results:', results);
                    const resultsDiv = document.getElementById('results');
                    resultsDiv.innerHTML = '<h3>Vote Results</h3><ul>' +
                        results.map((count, index) => <li>Candidate ${index + 1}: ${count} votes</li>).join('') +
                        '</ul>';
                })
                .catch(error => console.error('Error:', error));
        };

        // Populate Candidates
        const populateCandidates = async () => {
            const count = await contract.methods.candidatesCount().call();
            const select = document.getElementById('candidateSelect');
            select.innerHTML = '';
            for (let i = 1; i <= count; i++) {
                const candidate = await contract.methods.candidates(i).call();
                const option = document.createElement('option');
                option.value = candidate.id;
                option.textContent = candidate.name;
                select.appendChild(option);
            }
        };

        populateCandidates();
    } else {
        alert('Please install MetaMask to use this DApp.');
    }
});