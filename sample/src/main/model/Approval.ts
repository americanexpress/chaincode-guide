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
 * Approval entity
 */

@Object()
export class Approval {
    public static readonly NOTARIZE = 'NOTARIZE';    
    public static readonly SIGNATURE = 'SIGNATUR';
    public static readonly ACCURACY = 'ACCURACY';

    @Property()
    public approvalId: string;
    @Property()
    public approvalType: string;
    @Property()
    public approverId: string;
    @Property()
    public comments: string;
}