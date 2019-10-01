/**
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { RegistrationController } from '../../main/controllers/RegistrationController';
import { TestContext } from './TestContext';
import { registrationPromise } from './Samples';
import 'mocha';
import * as chai from 'chai';
import { RegistrationHelper } from '../../main/model/RegistrationHelper';
import { Registration } from '../../main/model/Registration';
import { TestStateQueryIterator } from './TestStateQueryIterator';
import { TestStub } from './TestStub';
import * as sinon from 'sinon';

describe('Test Registration', () => {
    let ctx: TestContext = new TestContext();
    const hash = 'c5b87e331fec6b4039f88a229ecff1ccd01833e1eb5795f476d10decf3e13829';
    const documentVersion = '1.01';
    const registrationController = new RegistrationController(ctx);
    let registrationSample: Registration;
    let bufferSample: Buffer;
    let registration: Registration;

    before(async () => {
        registrationSample = await registrationPromise;
        bufferSample = RegistrationHelper.toBuffer(registrationSample);
    });

    it('Should run registration.post without issues', async () => {
        await registrationController.post('john.doe', 'Letter of Recommendation', documentVersion, hash);
        const stored = await ctx.stub.getState(documentVersion + hash);
        registration = RegistrationHelper.fromBuffer(stored);

        chai.expect(registration.documentHash).eql(hash);
    });

    it('Should run registrationExists without issues', async () => {

        chai.expect(registrationController.registrationExists(registrationSample.registrationId)).to.eventually.equal(true);
    });

    it('Should run getSubmission without issues', async () => {
        const result = await registrationController.getRegistration(registrationSample.registrationId);
        chai.expect(result.documentName).to.equal(registrationSample.documentName);
    });

    it('Should throw error when re-posting same', async () => {    
        // same submission should not be inserted twice
        chai.expect(
            registrationController.post('john.doe',  'Letter of Recommendation', documentVersion, hash)
        ).to.be.rejectedWith();
    });

    it('test queryByDocumentHash', async () => {    
        const queryIterator = new TestStateQueryIterator(registrationSample);

        sinon.stub(TestStub.prototype, 'getQueryResult').resolves(queryIterator);

        const result = await registrationController.queryByDocumentHash(registrationSample.registrationId);

        const fetchedRegistration = JSON.parse(result);
        chai.expect(fetchedRegistration[0].Key).to.eql(registrationSample.registrationId);
    });
});