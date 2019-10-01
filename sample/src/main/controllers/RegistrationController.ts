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

import { BaseController } from './BaseController';
import { Registration } from '../model/Registration';
import { RegistrationHelper } from '../model/RegistrationHelper';

export class RegistrationController extends BaseController {

    /**
     * Use this method to register a document.
     * 
     * @param submitterId the Id of submitter
     * @param documentName unique name of document
     * @param documentVersion version of document
     * @param documentHash SHA256 of the document. Original document is
     * never stored on the ledger.
     */
    public async post(submitterId: string, documentName: string,
        documentVersion: string, documentHash: string) {

        const submission = await RegistrationHelper.create(submitterId,
            documentName, documentVersion, documentHash);

        const registrationExists = await this.registrationExists(submission.registrationId);

        if (registrationExists) {
            throw new Error('This submission already exists');
        }

        this.getContext().stub.putState(submission.registrationId, RegistrationHelper.toBuffer(submission));
    }

    /**
     * 
     * @param registrationId Verify that a specific submission exists.
     * registrationId = documentVersion + documentHash, as per RegistrationHelper
     */

    public async registrationExists(registrationId: string): Promise<boolean> {
        const buffer = await this.getContext().stub.getState(registrationId);

        return (!!buffer && buffer.length > 0);
    }

    /**
     * Get registration based on Id
     * 
     * @param registrationId - ID of registration
     */
    public async getRegistration(registrationId: string): Promise<Registration> {
        const buffer = await this.getContext().stub.getState(registrationId);

        return RegistrationHelper.fromBuffer(buffer);
    }

    /**
     * Fetch a registered document, based on its hash value. There could be multiple documents 
     * that are identical, but stored under different entries.
     * 
     * @param documentHash 
     */
    public async queryByDocumentHash(documentHash: string): Promise<string> {
        const query = {};
        query['selector'] = {};
        query['selector']['docType'] = 'Registration';
        query['selector']['documentHash'] = documentHash;

        const iterator = await this.getContext().stub.getQueryResult(JSON.stringify(query));

        const result = [];
        let done = false;

        while (!done) {
            const res = await iterator.next();
            const key = res.value.key;
            let record = JSON.parse(res.value.value.toString('utf8'));
            result.push({ Key: key, Record: record });
            done = res.done;
        }

        await iterator.close();
        return JSON.stringify(result);
    }
}
