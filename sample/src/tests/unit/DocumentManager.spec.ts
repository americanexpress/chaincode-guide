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

import { DocumentManager } from '../../main/DocumentManager';
import { TestContext } from './TestContext';
import { registrationPromise, approvalPromise } from './Samples';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { RegistrationHelper } from '../../main/model/RegistrationHelper';
import { Registration } from '../../main/model/Registration';
import { Approval } from '../../main/model/Approval';
import { RegistrationController } from '../../main/controllers/RegistrationController';
import { ApprovalController } from '../../main/controllers/ApprovalController';

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Test DocumentManager', () => {
    const ctx = new TestContext();
    const chaincode = new DocumentManager();

    const hash = 'c5b87e331fec6b4039f88a229ecff1ccd01833e1eb5795f476d10decf3e13829';
    const documentVersion = '1.01';

    let registrationSample: Registration;
    let registration: Registration;
    let approvalSample: Approval;

    before('Setting up', async () => {
        sinon.spy(ctx.stub.getState);
        sinon.spy(ctx.stub.putState);
        registrationSample = await registrationPromise;
        approvalSample = await approvalPromise;
    });

    it('Should be able to call createRegistration succesfully', async () => {
        await chaincode.loadDocument(ctx, 'john.doe', 'Letter of Recommendation', documentVersion, hash);

        const stored = await ctx.stub.getState(documentVersion + hash);
        registration = RegistrationHelper.fromBuffer(stored);

        chai.expect(registration.documentHash).eql(hash);
    });

    it('Should be able to call createRegistration succesfully', async () => {   
        chai.expect(chaincode.registrationExists(ctx, registrationSample.registrationId)).to.eventually.eql(true);
    });

    it('Should be able to call getRegistration succesfully', async () => {         
        chai.expect(chaincode.getRegistration(ctx, registrationSample.registrationId)).to.eventually.eql(registrationSample);
    });

    it('Should be able to call queryByDocumentHash succesfully', async () => { 
        sinon.stub(RegistrationController.prototype, 'queryByDocumentHash').resolves(JSON.stringify([registrationSample]));
        const reg = await chaincode.queryByDocumentHash(ctx,
            'c5b87e331fec6b4039f88a229ecff1ccd01833e1eb5795f476d10decf3e13829');

        chai.expect(JSON.parse(reg)[0]).to.eql(registrationSample);
    });

    it('Should be able to call notarize succesfully', async () => {   
        chai.expect(chaincode.notarize(ctx, approvalSample.approvalId, approvalSample.approverId,
            approvalSample.comments)).not.to.rejectedWith();
    });

    it('Should be able to call sign succesfully', async () => {   
        chai.expect(chaincode.sign(ctx, approvalSample.approvalId, 
            approvalSample.approverId, approvalSample.comments)).not.to.rejectedWith();
    });

    it('Should be able to call verifyAccuracy succesfully', async () => {  
        sinon.stub(ApprovalController.prototype, 'post').resolves(); 
        chai.expect(chaincode.verifyAccuracy(ctx, approvalSample.approvalId, 
            approvalSample.approverId, approvalSample.comments)).not.to.rejectedWith();
    });
   
    it('Should be able to call approvalExists succesfully', async () => {   
        sinon.stub(ApprovalController.prototype, 'approvalExists').resolves(true);
        chai.expect(chaincode.approvalExists(ctx, approvalSample.approvalId)).to.eventually.eql(true);
    });

    after(() => {
        sinon.restore();
    });
});