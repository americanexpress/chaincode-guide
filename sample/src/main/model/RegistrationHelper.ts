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
import { Registration } from './Registration';

const schema = yup.object().shape({
    submitterId: yup.string().required(),
    documentName: yup.string().required(),
    documentVersion: yup.string().required(),
    documentHash: yup.string().required(),
});

/**
 * Helper class for creating valid Registration objects
 * 
 */
export class RegistrationHelper {

    /**
     * Helper static method for creating Registration object
     * 
     * @param submitterId - Id of submitter. This is managed by client app of Org.
     * @param documentName - name of document
     * @param documentVersion - version of document
     * @param documentHash - SHA256 hash of document
     */

    public static async create(submitterId: string, documentName: string, 
        documentVersion: string, documentHash: string): Promise<Registration> {
        const isValid = await schema.isValid({
            submitterId, documentName, documentVersion, documentHash
        });
        if (!isValid) {
            throw 'Incorrect arguments passed to constructor';
        }

        const registration = new Registration();
        registration.registrationId = documentVersion + documentHash;
        registration.submitterId = submitterId;
         registration.documentName = documentName;
        registration.documentVersion = documentVersion;
        registration.documentHash = documentHash;
        return registration;
    }

    /**
     * Helper method for converting Registration to Buffer
     * 
     * @param registration - registration object 
     */
    public static toBuffer(registration: Registration): Buffer {
        return Buffer.from(JSON.stringify(registration));
    }

    /**
     * Helper method for converting buffer to Registration
     * 
     * @param buffer 
     */

    public static fromBuffer(buffer: Buffer): Registration {
        if (buffer === null || buffer === undefined) {
            return null;
        }
        return JSON.parse(buffer.toString()) as Registration;
    }
}