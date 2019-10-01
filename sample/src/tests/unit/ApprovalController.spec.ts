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

import { ApprovalController } from '../../main/controllers/ApprovalController';
import { TestContext } from './TestContext';
import { approvalPromise } from './Samples';
import { registrationPromise } from './Samples';
import 'mocha';
import * as chai from 'chai';
import { ApprovalHelper } from '../../main/model/ApprovalHelper';
import { RegistrationController } from '../../main/controllers/RegistrationController';
import * as sinon from 'sinon';
import { Approval } from '../../main/model/Approval';
import { Registration } from '../../main/model/Registration';
import { PrivateApprovalComment } from '../../main/model/PrivateApprovalComment';

describe('Test ApprovalController', () => {
    const ctx = new TestContext();
    let smpl: Approval;
    let sub: Registration;
    const comment = 'you may want to double check for accuracy';
    const approvalController = new ApprovalController(ctx);

    before(async () => {
        smpl = await approvalPromise;
        sub = await registrationPromise;
    });

    it('Should run approval.post without issues', async () => {
        sinon.stub(RegistrationController.prototype, 'queryByDocumentHash').resolves(JSON.stringify(sub));
        await approvalController.post(sub.documentHash, smpl.approvalType, smpl.approverId, smpl.comments);

        const stored = await ctx.stub.getState(smpl.approvalId);
        const storedApproval = ApprovalHelper.fromBuffer(stored);

        chai.expect(storedApproval.approvalId).eql(smpl.approvalId);
    });

    it('Should run approval.post with private comments without issues', async () => {
 
        await approvalController.post(sub.documentHash, smpl.approvalType, 
            smpl.approverId, smpl.comments, comment );

        const stored = await ctx.stub.getPrivateData(
            ApprovalController.COMMENTS_COLLECTION_NAME, smpl.approvalId);

        const privateComment = JSON.parse(stored.toString()) as PrivateApprovalComment;

        chai.expect(privateComment.comments).eql(comment);
    });

    it('Should run getApproval without issues', async () => {
        // sinon.stub(ApprovalController.prototype, 'getApproval').resolves(smpl);
        const result = await approvalController.getApproval(smpl.approvalId);
        chai.expect(result.approvalType).to.equal(smpl.approvalType);
        chai.expect(result.approverId).to.equal(smpl.approverId);
        chai.expect(result.comments).to.equal(smpl.comments);
    });

    it('Should run getApprovalPrivateComment without issues', async () => {
        // sinon.stub(ApprovalController.prototype, 'getApproval').resolves(smpl);
        const result = await approvalController.getApprovalPrivateComment(smpl.approvalId);
        chai.expect(result.approverId).to.equal(smpl.approverId);
        chai.expect(result.comments).to.equal(comment);
    });

    it('Should run approvalExists without issues', async () => {
        chai.expect(approvalController.approvalExists(smpl.approvalId)).to.eventually.equal(true);
    });

    after(() => {
        sinon.restore();
    });
});