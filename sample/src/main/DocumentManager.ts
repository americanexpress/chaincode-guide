/**
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Registration } from './model/Registration';
import { RegistrationController } from './controllers/RegistrationController';
import { ApprovalController } from './controllers/ApprovalController';
import { Approval } from './model/Approval';

/**
 * This is the main Chaincode class
 */

@Info({title: 'DocumentManager', description: 'Sample Smart Contract' })

export class DocumentManager extends Contract {

    /**
     * Fetch a registration based on its ID
     * 
     * @param ctx - context
     * @param id - ID of registration
     */

    @Transaction(false)
    @Returns('Registration')
    public async getRegistration(ctx: Context, id: string): Promise<Registration> {
        const registration = new RegistrationController(ctx);
        return await registration.getRegistration(id);
    }

    /**
     * Validate whether a registration with the given ID exists.
     * 
     * @param ctx - context
     * @param id - ID of registration
     */

    @Transaction(false)
    @Returns('boolean')
    public async registrationExists(ctx: Context, id: string): Promise<boolean> {
        const registration = new RegistrationController(ctx);
        return await registration.registrationExists(id);
    }

    /**
     * Fetch all registrations given the hash of the document (SHA256)
     * 
     * @param ctx - context
     * @param documentHash - SHA256 hash of document
     */

    @Transaction(false)
    public async queryByDocumentHash(ctx: Context, documentHash: string): Promise<string> {
        const registration = new RegistrationController(ctx);
        return await registration.queryByDocumentHash(documentHash);
    }

    /**
     * Load (register) document on the ledger
     * 
     * @param ctx - context
     * @param submitterId - ID of submitter
     * @param documentName - name of document
     * @param documentVersion - version of document 
     * @param documentHash - SHA256 hash of document
     */
    @Transaction()
    public async loadDocument(ctx: Context, submitterId: string,
        documentName: string, documentVersion: string, documentHash: string) {
            
        let registration = new RegistrationController(ctx);
        return await registration.post(submitterId,
            documentName, documentVersion, documentHash);
    }

    /**
     * Notarize a document that is already on the ledger (i.e. its hash)
     * 
     * @param ctx - context
     * @param documentId - ID, as present on the ledger
     * @param submitterId - ID of submitter (a registered user with respective Org)
     * @param comments - approval comments
     */

    @Transaction()
    public async notarize(ctx: Context, documentId: string, 
        submitterId: string, comments: string) {
            
        let approval = new ApprovalController(ctx);
        return await approval.post(documentId, Approval.NOTARIZE, submitterId, comments);
    }

    /**
     * Sign a document that is already on the ledger (i.e. its hash)
     * 
     * @param ctx - context
     * @param documentId - ID, as present on the ledger
     * @param submitterId - ID of submitter (a registered user with respective Org)
     * @param comments - approval comments
     */

    @Transaction()
    public async sign(ctx: Context, documentId: string, submitterId: string, comments: string) {
            
        let approval = new ApprovalController(ctx);
        return await approval.post(documentId, Approval.SIGNATURE, submitterId, comments);
    }

    /**
     * Verify for accuracy of a document that is already on the ledger (i.e. its hash).
     * For example, check that the data in a birth certificate is correct
     * 
     * @param ctx - context
     * @param documentId - ID, as present on the ledger
     * @param submitterId - ID of submitter (a registered user with respective Org)
     * @param comments - approval comments
     */

    @Transaction()
    public async verifyAccuracy(ctx: Context, documentId: string, 
        submitterId: string, comments: string) {            
        let approval = new ApprovalController(ctx);
        return await approval.post(documentId, Approval.ACCURACY, submitterId, comments);
    }

    /**
     * Verify that approval with given ID exists
     * @param ctx - context
     * @param id - ID of approval
     */

    @Transaction(false)
    @Returns('boolean')
    public async approvalExists(ctx: Context, id: string): Promise<boolean> {
        const approval = new ApprovalController(ctx);
        return await approval.approvalExists(id);
    }
}