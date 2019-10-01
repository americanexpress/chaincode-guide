# Hyperledger® Fabric Chaincode development guidelines

A fully-functioning sample "document management" contract is presented [here](./sample)

## Guidelines for designing Smart Contracts

There are several development guidelines available online, however, there is a lack of high-level
design documentation. This project's intent is to at least start the conversation, and provide
a sample project.

### Model your smart contract based on the "legal contract", if available

When the use case involves a legal contract, it is a good idea to model the smart contract 
functionality based on it. Even better, one should store the hash of the legal contract
along with the smat contract. This will address versioning concerns as well.

### Only include logic that pertains to the interaction between participants

Smart Contracts should not control internal processes, if these are not related
to the interaction between parties. Often, blockchain-based projects
require building new systems, and it may be convenient to co-locate all business logic. 
Unfortunately, this can lead to Smart contracts that are difficult to maintain
and expose sensitive information about parties.  

For example, a Purchase Order may implement the logic for applying penalties, in case 
parties are in breach of the contract. It should not control the supplier's pricing 
strategy, the fulfilment processor's logistics, or the buyer's procurement approval workflow.

### Only store data that pertains to the cross-org collaboration

A Smart Contract should not be used as a system of record (SOR) for organization's internal data. 
It should be the SOR for contract data, nevertheless. A timesheet Smart Contract may not contain 
a Vendor resource's home address, as this information belongs to the Vendor's
HR systems. The contract can store the time sheet information, as it's required 
to process the payment check. In this case, the distributed ledger (DLT) is the system of record 
(SOR) for the billable hours and is made available to both organizations.

### Avoid storing sensitive information, unless strictly necessary

Blockchain technology replicates data across all participants. This is a concern, as it is sufficient
for one of the organizations to be negligent to leak out sensitive data. For this reason, it is not
recommended to store such data (e.g. SSN) of the ledger directly. One approach is to use
a proxy opaque ID (e.g. GUID) for customer. This ID is shared by the participating parties, and maps
to internal systems (e.g. SSN). 

### Limit identity exposure

Even when using private collections, the identity of participant invoking a contract is made visible
on the blockchain. This is not acceptable. Unless a channel is between 2 parties, alternative solutions
should be used (e.g. Hyperledger Fabric ID Mixer or T-certs, if still available). 
ZKAT may be the preferred solution in future releases.

### Leave it up to the contract to perform the core business logic

A naive implementation may use the smart contract as a shared repository for common data, 
while performing all processing on internal systems. Such approach lacks the benefit of transparency 
and auditability. 

For example, given the rates and billable hours on a timesheet, the amount due is calculated as:

`checkAmount = noOfHours * regularRate + overtimeHours * overtimeRate`

Since the time worked and the rates are captured by the contract and are jointly agreed upon, it 
makes sense to perform this calculation within the contract as well. This will lead to better
transparency, fewer errors, and a complete, immutable audit trail. 

## Guidelines for Smart Contract development

* Smart contract deployed in github repo of its own. Contract is typically shared with organizations that 
need access to it for deployment. Development may also be a joint effort.
* Use TScript with [fabric-contract-api](https://www.npmjs.com/package/fabric-contract-api)
* Mock [Context](./sample/src/tests/unit/TestContext.ts) and [ChaincodeStub](./sample/src/tests/unit/TestStub.ts) 
to the extent possible, to avoid frequent local deployments during development
* Use design best practices, by encapsulating business logic in dedicated classes 
(e.g. [models](./sample/src/main/model), [controllers](./sample/src/main/controllers))
* All devops best practices will be followed (e.g. 100% code coverage, linting, etc). 
* Reuse common components

## Running the sample chaincode

Follow the istructions below:

```sh
cd ./sample
yarn install ## install all depencencies
yarn test ## run all unit/integration tests
```

## Authors

* Andras L Ferenczi <andras.l.ferenczi@aexp.com> [andrasfe](https://github.com/andrasfe)
* Tajamul Fazili <tajamul.fazili@aexp.com> [TajamulFazili](https://github.com/tajamulfazili)

## Contributing

We welcome Your interest in the American Express Open Source Community on Github. Any Contributor to any Open Source
Project managed by the American Express Open Source Community must accept and sign an Agreement indicating agreement to
the terms below. Except for the rights granted in this Agreement to American Express and to recipients of software
distributed by American Express, You reserve all right, title, and interest, if any, in and to Your Contributions.
Please [fill out the Agreement](https://cla-assistant.io/americanexpress/chaincode-guide).

Please feel free to open pull requests and see `CONTRIBUTING.md` for commit formatting details.

## License

Any contributions made under this project will be governed by the [Apache License 2.0](LICENSE).

## Code of Conduct

This project adheres to the [American Express Community Guidelines](CODE_OF_CONDUCT.md). By participating, you are
expected to honor these guidelines.