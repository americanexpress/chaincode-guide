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

import { Context } from 'fabric-contract-api';

/**
 * BaseController - all controllers inherit from it. Primarily to decouple controllers from the stub helper
 */
export class BaseController {
    private ctx: Context;

    /**
     * 
     * @param stubHelper - the helper passed in to all Controller type objects
     * @param privateCollection - optional. if private collection is used
     */
    constructor(ctx: Context, privateCollection?: string) {
        this.ctx = ctx;
    }

    /**
     * To fetch the helper; needed for interacting with the blockchain
     */
    getContext() : Context {
        return this.ctx;
    }
}