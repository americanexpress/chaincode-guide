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
import { RegistrationController } from './RegistrationController';
import { ApprovalHelper } from '../model/ApprovalHelper';
import { Approval } from '../model/Approval';
import { PrivateApprovalComment } from '../model/PrivateApprovalComment';

export class ApprovalController extends BaseController {

    static readonly COMMENTS_COLLECTION_NAME = 'commentsCollection';

    /**
     * Used by a designated approver, to provide approval for a specific
     * document
     * 
     * @param approvalId - ID of the registration entry to be approved
     * @param approvalType - styring, as defined by Approval class
     * @param submitterId - ID of the individual submitting the approval.  
     * @param comments - comments, as provided by approver
     * @param privateComments - private comments, as provided by approver; not visible to everyone
     */

    public async post(approvalEntryId: string,  approvalType: 
            string, submitterId: string, comments: string, privateComments?: string) {

        const approvalEntry = await ApprovalHelper.create(approvalEntryId, approvalType, 
            submitterId, comments);

        const registration = new RegistrationController(this.getContext());
        const result = await registration.queryByDocumentHash(approvalEntry.approverId);

        await this.getContext().stub.putState(approvalEntry.approvalId, ApprovalHelper.toBuffer(approvalEntry));

        if(privateComments !== undefined && privateComments !== null && privateComments !== '') {
            await this.postPrivateComment(approvalEntry.approvalId, submitterId, privateComments);
        }
    }

    /**
     * Get the approval associated with a specific approval ID
     * 
     * @param approvalId 
     */

    public async getApproval(approvalId: string): Promise<Approval> {
        const buffer = await this.getContext().stub.getState(approvalId);
        return ApprovalHelper.fromBuffer(buffer);
    }

    /**
     * Validate that an approval with given ID exists
     * 
     * @param approvalId - the ID of approval. It is assembled by concatenating the registration Id
     * and the approval-type, as defined in Approval class
     */
    public async approvalExists(approvalId: string): Promise<boolean> {
        const buffer = await this.getContext().stub.getState(approvalId);

         return (!!buffer && buffer.length > 0);
    }

    /**
     * Returns private approval comment. Only members of private collection have access to it
     * 
     * @param approvalId the ID of original approval
     */

    public async getApprovalPrivateComment(approvalId: string): Promise<PrivateApprovalComment> {
        const buffer = await this.getContext().stub.getPrivateData(
            ApprovalController.COMMENTS_COLLECTION_NAME ,approvalId
        );

        return JSON.parse(buffer.toString());
    }

    private async postPrivateComment(approvalId: string, submitterId: string, comments: string) {
        const privateComment = await PrivateApprovalComment.create(submitterId, comments);
        await this.getContext().stub.putPrivateData(
            ApprovalController.COMMENTS_COLLECTION_NAME, approvalId, 
            PrivateApprovalComment.toBuffer(privateComment)
        );
    }
}
