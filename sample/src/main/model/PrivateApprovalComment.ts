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

import { Object, Property } from 'fabric-contract-api';

/**
 * PrivateApprovalComment entity
 */

@Object()
export class PrivateApprovalComment {
    @Property()
    public approverId: string;
    @Property()
    public comments: string;

    static async create(approverId: string, comments: string) :
             Promise<PrivateApprovalComment> {

        const privateApprovalComment = new PrivateApprovalComment();
         privateApprovalComment.approverId = approverId;
        privateApprovalComment.comments = comments;

        return privateApprovalComment;
    }

    public static toBuffer(privateApprovalComment: PrivateApprovalComment): Buffer {
        privateApprovalComment['docType'] = 'PrivateApprovalComment';
        return Buffer.from(JSON.stringify(privateApprovalComment));
    }

}