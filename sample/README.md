# Sample Chaincode

The sample project implements a simple document approval network. Please note that the code is solely for educational purposes.
The chaincode implementation allows for registration of documents by their authors and gives the ability for third partiers to provide feedback on these documents. For example, notarize them, digitally sign them, or confirm accuracy of contents.

## Project structure

Main class, `DocumentManager`, is the actual implementation of the chaincode. It implements functionalities,
such as registration, notarization, signing of documents, as well as querying of the state data based on 
various criteria.

Basic functionality is delegated to controller classes (`ApprovalController`, `RegistrationController`)
that implement `BaseController`. 

Model classes can be found in `./model` directory: `Registration` and `Approval`. Helper classes `RegistrationHelper`and `ApprovalHelper` are used for creation, serialization, and deserialization of model objects.

## Authors

* Andras L Ferenczi <andras.l.ferenczi@aexp.com> [andrasfe](https://github.com/andrasfe)
* Tajamul Fazili <tajamul.fazili@aexp.com> [TajamulFazili](https://github.com/tajamulfazili)
  
