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

import { RegistrationHelper } from '../../main/model/RegistrationHelper';
import * as chai from 'chai';

describe('Test DocumentManager', () => {
    it('Should create Registration without issues', async () => {
        const registration = await RegistrationHelper.create('john.doe', 'Letter of Recommendation', '1.01',
            'c5b87e331fec6b4039f88a229ecff1ccd01833e1eb5795f476d10decf3e13829');

        chai.expect(registration).to.haveOwnProperty('registrationId');
    });

    it('Should reject promise if invalid arguments', async () => {
        chai.expect(
            RegistrationHelper.create('john.doe', undefined, '1.01',
                'c5b87e331fec6b4039f88a229ecff1ccd01833e1eb5795f476d10decf3e13829')
        ).to.eventually.rejectedWith();
    });

    it('fromBuffer returns null if buffer null', async () => {
        chai.expect(RegistrationHelper.fromBuffer(null)).to.eql(null);
    });
});