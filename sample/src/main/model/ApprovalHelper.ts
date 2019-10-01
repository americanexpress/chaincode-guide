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

import * as yup from 'yup';
import { Approval } from './Approval';

const schema = yup.object().shape({
    approvalEntryId: yup.string().required(),
    aprovalType: yup.mixed().oneOf([Approval.NOTARIZE, Approval.SIGNATURE, Approval.ACCURACY]),
    approverId: yup.string().required(),
    comments: yup.string().required(),
});

/**
 * Helper class for creating valid Approval classes
 */
export class ApprovalHelper {

    /**
     * Create Approval class
     * 
     * @param approvalEntryId - reference registrationId
     * @param approvalType - type of approval, as defined in Approval class
     * @param approverId - ID of approver
     * @param comments - approver comments
     */
    public static async create(approvalEntryId: string, approvalType: string, 
        approverId: string, comments: string): Promise<Approval> {

        const isValid = await schema.isValid({
            approvalEntryId, approvalType, approverId, comments
        });
        if (!isValid) {
            throw 'Incorrect arguments passed to constructor';
        }

        const approvalEntry = new Approval();
        approvalEntry.approvalId = approvalType + approvalEntryId;
        approvalEntry.approvalType = approvalType;
        approvalEntry.approverId = approverId;
        approvalEntry.comments = comments;
        return approvalEntry;
    }

    /**
     * Helper method for converting Approval to Buffer
     * 
     * @param approvalEntry 
     */
    public static toBuffer(approvalEntry: Approval): Buffer {
        approvalEntry['docType'] = 'ApprovalEntry';
        return Buffer.from(JSON.stringify(approvalEntry));
    }

    /**
     * Helper method for converting Buffer to Approval
     * @param buffer 
     */
    public static fromBuffer(buffer: Buffer): Approval {
        if (buffer === null || buffer === undefined) {
            return null;
        }
        return JSON.parse(buffer.toString()) as Approval;
    }
}